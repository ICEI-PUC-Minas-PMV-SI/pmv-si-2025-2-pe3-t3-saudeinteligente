import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', cors());
app.use('*', logger(console.log));

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Initialize storage bucket
const bucketName = 'make-ad73f8aa-medical-files';
(async () => {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    if (!bucketExists) {
      await supabase.storage.createBucket(bucketName, { public: false });
      console.log(`Created private bucket: ${bucketName}`);
    }
  } catch (error) {
    console.log(`Error initializing storage bucket: ${error}`);
  }
})();

// ==================== AUTH ROUTES ====================

// Signup route
app.post('/make-server-ad73f8aa/signup', async (c) => {
  try {
    const { email, password, name, role, crm, specialization } = await c.req.json();
    
    if (!email || !password || !name || !role) {
      return c.json({ error: 'Missing required fields: email, password, name, role' }, 400);
    }

    if (!['patient', 'doctor', 'admin'].includes(role)) {
      return c.json({ error: 'Invalid role. Must be patient, doctor, or admin' }, 400);
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role, crm, specialization },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (authError) {
      console.log(`Error creating user during signup: ${authError.message}`);
      return c.json({ error: `Failed to create user: ${authError.message}` }, 400);
    }

    // Store user profile in KV store
    await kv.set(`user:${authData.user.id}`, {
      id: authData.user.id,
      email,
      name,
      role,
      crm: role === 'doctor' ? crm : undefined,
      specialization: role === 'doctor' ? specialization : undefined,
      createdAt: new Date().toISOString()
    });

    // If patient, create patient profile
    if (role === 'patient') {
      await kv.set(`patient:${authData.user.id}`, {
        userId: authData.user.id,
        medicalHistory: [],
        appointments: [],
        exams: [],
        diagnoses: []
      });
    }

    return c.json({ 
      success: true, 
      user: { 
        id: authData.user.id, 
        email, 
        name, 
        role 
      } 
    });
  } catch (error) {
    console.log(`Unexpected error during signup: ${error}`);
    return c.json({ error: 'Internal server error during signup' }, 500);
  }
});

// Get user profile
app.get('/make-server-ad73f8aa/profile', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized: No access token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      console.log(`Authorization error while getting user profile: ${error?.message}`);
      return c.json({ error: 'Unauthorized: Invalid token' }, 401);
    }

    const userProfile = await kv.get(`user:${user.id}`);
    if (!userProfile) {
      return c.json({ error: 'User profile not found' }, 404);
    }

    return c.json({ user: userProfile });
  } catch (error) {
    console.log(`Error getting user profile: ${error}`);
    return c.json({ error: 'Internal server error while getting profile' }, 500);
  }
});

// ==================== PATIENT ROUTES ====================

// Get patient data (own data only)
app.get('/make-server-ad73f8aa/patient/data', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized: No access token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      return c.json({ error: 'Unauthorized: Invalid token' }, 401);
    }

    const userProfile = await kv.get(`user:${user.id}`);
    if (userProfile.role !== 'patient') {
      return c.json({ error: 'Access denied: Not a patient' }, 403);
    }

    const patientData = await kv.get(`patient:${user.id}`);
    if (!patientData) {
      return c.json({ error: 'Patient data not found' }, 404);
    }

    return c.json({ patient: patientData });
  } catch (error) {
    console.log(`Error getting patient data: ${error}`);
    return c.json({ error: 'Internal server error while getting patient data' }, 500);
  }
});

// ==================== DOCTOR ROUTES ====================

// Get doctor's appointments
app.get('/make-server-ad73f8aa/doctor/appointments', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized: No access token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      return c.json({ error: 'Unauthorized: Invalid token' }, 401);
    }

    const userProfile = await kv.get(`user:${user.id}`);
    if (userProfile.role !== 'doctor') {
      return c.json({ error: 'Access denied: Not a doctor' }, 403);
    }

    const appointments = await kv.getByPrefix(`appointment:doctor:${user.id}:`);
    return c.json({ appointments });
  } catch (error) {
    console.log(`Error getting doctor appointments: ${error}`);
    return c.json({ error: 'Internal server error while getting appointments' }, 500);
  }
});

// Get patient data (for scheduled patients only)
app.get('/make-server-ad73f8aa/doctor/patient/:patientId', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized: No access token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      return c.json({ error: 'Unauthorized: Invalid token' }, 401);
    }

    const userProfile = await kv.get(`user:${user.id}`);
    if (userProfile.role !== 'doctor') {
      return c.json({ error: 'Access denied: Not a doctor' }, 403);
    }

    const patientId = c.req.param('patientId');
    
    // Check if doctor has appointment with this patient
    const appointments = await kv.getByPrefix(`appointment:doctor:${user.id}:patient:${patientId}`);
    if (!appointments || appointments.length === 0) {
      return c.json({ error: 'Access denied: No appointment with this patient' }, 403);
    }

    const patientData = await kv.get(`patient:${patientId}`);
    const patientProfile = await kv.get(`user:${patientId}`);
    
    if (!patientData || !patientProfile) {
      return c.json({ error: 'Patient not found' }, 404);
    }

    return c.json({ 
      patient: {
        ...patientData,
        name: patientProfile.name,
        email: patientProfile.email
      }
    });
  } catch (error) {
    console.log(`Error getting patient data for doctor: ${error}`);
    return c.json({ error: 'Internal server error while getting patient data' }, 500);
  }
});

// Add consultation record
app.post('/make-server-ad73f8aa/doctor/consultation', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized: No access token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      return c.json({ error: 'Unauthorized: Invalid token' }, 401);
    }

    const userProfile = await kv.get(`user:${user.id}`);
    if (userProfile.role !== 'doctor') {
      return c.json({ error: 'Access denied: Not a doctor' }, 403);
    }

    const { patientId, diagnosis, notes, prescription } = await c.req.json();
    
    if (!patientId || !diagnosis) {
      return c.json({ error: 'Missing required fields: patientId, diagnosis' }, 400);
    }

    // Verify doctor has appointment with patient
    const appointments = await kv.getByPrefix(`appointment:doctor:${user.id}:patient:${patientId}`);
    if (!appointments || appointments.length === 0) {
      return c.json({ error: 'Access denied: No appointment with this patient' }, 403);
    }

    const consultation = {
      id: crypto.randomUUID(),
      patientId,
      doctorId: user.id,
      doctorName: userProfile.name,
      date: new Date().toISOString(),
      diagnosis,
      notes,
      prescription
    };

    // Add to patient's medical history
    const patientData = await kv.get(`patient:${patientId}`);
    patientData.medicalHistory = patientData.medicalHistory || [];
    patientData.medicalHistory.push(consultation);
    await kv.set(`patient:${patientId}`, patientData);

    return c.json({ success: true, consultation });
  } catch (error) {
    console.log(`Error adding consultation: ${error}`);
    return c.json({ error: 'Internal server error while adding consultation' }, 500);
  }
});

// ==================== APPOINTMENT ROUTES ====================

// Create appointment
app.post('/make-server-ad73f8aa/appointments', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized: No access token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      return c.json({ error: 'Unauthorized: Invalid token' }, 401);
    }

    const { patientId, doctorId, date, time, reason } = await c.req.json();
    
    if (!patientId || !doctorId || !date || !time) {
      return c.json({ error: 'Missing required fields: patientId, doctorId, date, time' }, 400);
    }

    const appointment = {
      id: crypto.randomUUID(),
      patientId,
      doctorId,
      date,
      time,
      reason,
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };

    // Store appointment with composite key for easy doctor queries
    await kv.set(`appointment:doctor:${doctorId}:patient:${patientId}:${appointment.id}`, appointment);
    
    // Also store in patient's appointments
    const patientData = await kv.get(`patient:${patientId}`);
    patientData.appointments = patientData.appointments || [];
    patientData.appointments.push(appointment);
    await kv.set(`patient:${patientId}`, patientData);

    return c.json({ success: true, appointment });
  } catch (error) {
    console.log(`Error creating appointment: ${error}`);
    return c.json({ error: 'Internal server error while creating appointment' }, 500);
  }
});

// ==================== ADMIN ROUTES ====================

// Get all users (admin only)
app.get('/make-server-ad73f8aa/admin/users', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized: No access token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      return c.json({ error: 'Unauthorized: Invalid token' }, 401);
    }

    const userProfile = await kv.get(`user:${user.id}`);
    if (userProfile.role !== 'admin') {
      return c.json({ error: 'Access denied: Admin access required' }, 403);
    }

    const users = await kv.getByPrefix('user:');
    return c.json({ users });
  } catch (error) {
    console.log(`Error getting all users: ${error}`);
    return c.json({ error: 'Internal server error while getting users' }, 500);
  }
});

// Get all patients (admin only)
app.get('/make-server-ad73f8aa/admin/patients', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized: No access token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      return c.json({ error: 'Unauthorized: Invalid token' }, 401);
    }

    const userProfile = await kv.get(`user:${user.id}`);
    if (userProfile.role !== 'admin') {
      return c.json({ error: 'Access denied: Admin access required' }, 403);
    }

    const patients = await kv.getByPrefix('patient:');
    return c.json({ patients });
  } catch (error) {
    console.log(`Error getting all patients: ${error}`);
    return c.json({ error: 'Internal server error while getting patients' }, 500);
  }
});

// Get all appointments (admin only)
app.get('/make-server-ad73f8aa/admin/appointments', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized: No access token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      return c.json({ error: 'Unauthorized: Invalid token' }, 401);
    }

    const userProfile = await kv.get(`user:${user.id}`);
    if (userProfile.role !== 'admin') {
      return c.json({ error: 'Access denied: Admin access required' }, 403);
    }

    const appointments = await kv.getByPrefix('appointment:');
    return c.json({ appointments });
  } catch (error) {
    console.log(`Error getting all appointments: ${error}`);
    return c.json({ error: 'Internal server error while getting appointments' }, 500);
  }
});

// Get system statistics (admin only)
app.get('/make-server-ad73f8aa/admin/stats', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized: No access token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      return c.json({ error: 'Unauthorized: Invalid token' }, 401);
    }

    const userProfile = await kv.get(`user:${user.id}`);
    if (userProfile.role !== 'admin') {
      return c.json({ error: 'Access denied: Admin access required' }, 403);
    }

    const users = await kv.getByPrefix('user:');
    const patients = await kv.getByPrefix('patient:');
    const appointments = await kv.getByPrefix('appointment:');

    const stats = {
      totalUsers: users.length,
      totalPatients: patients.length,
      totalDoctors: users.filter(u => u.role === 'doctor').length,
      totalAppointments: appointments.length,
      scheduledAppointments: appointments.filter(a => a.status === 'scheduled').length
    };

    return c.json({ stats });
  } catch (error) {
    console.log(`Error getting system stats: ${error}`);
    return c.json({ error: 'Internal server error while getting stats' }, 500);
  }
});

// Get doctors list (for appointment scheduling)
app.get('/make-server-ad73f8aa/doctors', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized: No access token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      return c.json({ error: 'Unauthorized: Invalid token' }, 401);
    }

    const users = await kv.getByPrefix('user:');
    const doctors = users.filter(u => u.role === 'doctor');
    
    return c.json({ doctors });
  } catch (error) {
    console.log(`Error getting doctors list: ${error}`);
    return c.json({ error: 'Internal server error while getting doctors' }, 500);
  }
});

// ==================== FILE UPLOAD ROUTES ====================

// Upload file
app.post('/make-server-ad73f8aa/upload', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized: No access token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      return c.json({ error: 'Unauthorized: Invalid token' }, 401);
    }

    const userProfile = await kv.get(`user:${user.id}`);
    
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const patientId = formData.get('patientId') as string;
    const examType = formData.get('examType') as string;
    const description = formData.get('description') as string;

    if (!file || !patientId || !examType) {
      return c.json({ error: 'Missing required fields: file, patientId, examType' }, 400);
    }

    // Verify access to patient
    if (userProfile.role === 'patient') {
      // Patients can only upload to their own records
      if (user.id !== patientId) {
        return c.json({ error: 'Access denied: Cannot upload files to other patient records' }, 403);
      }
    } else if (userProfile.role === 'doctor') {
      // Doctors can only upload to patients they have appointments with
      const appointments = await kv.getByPrefix(`appointment:doctor:${user.id}:patient:${patientId}`);
      if (!appointments || appointments.length === 0) {
        return c.json({ error: 'Access denied: No appointment with this patient' }, 403);
      }
    } else if (userProfile.role !== 'admin') {
      // Only patients, doctors, and admins can upload files
      return c.json({ error: 'Access denied: Invalid role for file upload' }, 403);
    }

    // Generate unique file path
    const fileExt = file.name.split('.').pop();
    const fileName = `${patientId}/${crypto.randomUUID()}.${fileExt}`;

    // Upload to Supabase Storage
    const arrayBuffer = await file.arrayBuffer();
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, arrayBuffer, {
        contentType: file.type,
      });

    if (uploadError) {
      console.log(`Error uploading file to storage: ${uploadError.message}`);
      return c.json({ error: `Failed to upload file: ${uploadError.message}` }, 500);
    }

    // Create exam record
    const exam = {
      id: crypto.randomUUID(),
      patientId,
      doctorId: userProfile.role === 'patient' ? undefined : user.id,
      doctorName: userProfile.role === 'patient' ? undefined : userProfile.name,
      type: examType,
      description,
      fileName: file.name,
      filePath: fileName,
      fileType: file.type,
      fileSize: file.size,
      date: new Date().toISOString(),
    };

    // Add to patient's exams
    const patientData = await kv.get(`patient:${patientId}`);
    patientData.exams = patientData.exams || [];
    patientData.exams.push(exam);
    await kv.set(`patient:${patientId}`, patientData);

    return c.json({ success: true, exam });
  } catch (error) {
    console.log(`Error in file upload: ${error}`);
    return c.json({ error: 'Internal server error during file upload' }, 500);
  }
});

// Download file
app.get('/make-server-ad73f8aa/download/:patientId/:examId', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized: No access token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      return c.json({ error: 'Unauthorized: Invalid token' }, 401);
    }

    const userProfile = await kv.get(`user:${user.id}`);
    const patientId = c.req.param('patientId');
    const examId = c.req.param('examId');

    // Check access permissions
    if (userProfile.role === 'patient') {
      // Patients can only access their own files
      if (user.id !== patientId) {
        return c.json({ error: 'Access denied: Cannot access other patient files' }, 403);
      }
    } else if (userProfile.role === 'doctor') {
      // Doctors can only access files of their patients
      const appointments = await kv.getByPrefix(`appointment:doctor:${user.id}:patient:${patientId}`);
      if (!appointments || appointments.length === 0) {
        return c.json({ error: 'Access denied: No appointment with this patient' }, 403);
      }
    }
    // Admins have full access

    // Get exam record
    const patientData = await kv.get(`patient:${patientId}`);
    const exam = patientData.exams?.find((e: any) => e.id === examId);

    if (!exam) {
      return c.json({ error: 'Exam not found' }, 404);
    }

    // Create signed URL
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(exam.filePath, 3600); // Valid for 1 hour

    if (signedUrlError) {
      console.log(`Error creating signed URL: ${signedUrlError.message}`);
      return c.json({ error: 'Failed to generate download URL' }, 500);
    }

    return c.json({ 
      success: true, 
      downloadUrl: signedUrlData.signedUrl,
      fileName: exam.fileName,
      fileType: exam.fileType
    });
  } catch (error) {
    console.log(`Error in file download: ${error}`);
    return c.json({ error: 'Internal server error during file download' }, 500);
  }
});

// Get exam file info
app.get('/make-server-ad73f8aa/exams/:patientId', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized: No access token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      return c.json({ error: 'Unauthorized: Invalid token' }, 401);
    }

    const userProfile = await kv.get(`user:${user.id}`);
    const patientId = c.req.param('patientId');

    // Check access permissions
    if (userProfile.role === 'patient') {
      if (user.id !== patientId) {
        return c.json({ error: 'Access denied: Cannot access other patient files' }, 403);
      }
    } else if (userProfile.role === 'doctor') {
      const appointments = await kv.getByPrefix(`appointment:doctor:${user.id}:patient:${patientId}`);
      if (!appointments || appointments.length === 0) {
        return c.json({ error: 'Access denied: No appointment with this patient' }, 403);
      }
    }

    const patientData = await kv.get(`patient:${patientId}`);
    
    return c.json({ exams: patientData.exams || [] });
  } catch (error) {
    console.log(`Error getting exams: ${error}`);
    return c.json({ error: 'Internal server error while getting exams' }, 500);
  }
});

Deno.serve(app.fetch);
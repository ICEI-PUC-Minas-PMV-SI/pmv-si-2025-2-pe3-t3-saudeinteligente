export type UserRole = 'patient' | 'doctor' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  crm?: string;
  specialization?: string;
  createdAt: string;
}

export interface Patient {
  userId: string;
  medicalHistory: Consultation[];
  appointments: Appointment[];
  exams: Exam[];
  diagnoses: Diagnosis[];
}

export interface Consultation {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  date: string;
  diagnosis: string;
  notes?: string;
  prescription?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  reason?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Exam {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  type: string;
  description?: string;
  date: string;
  results?: string;
  attachments?: string[];
  fileName?: string;
  filePath?: string;
  fileType?: string;
  fileSize?: number;
}

export interface Diagnosis {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  condition: string;
  severity: 'low' | 'medium' | 'high';
  treatment?: string;
}
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar, FileText, Activity, AlertCircle, Loader2, Download, FileImage, File as FileIcon, Plus } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { projectId } from '../utils/supabase/info';
import { FileUpload } from './FileUpload';
import type { Patient, User } from '../types';

interface PatientDashboardProps {
  user: User;
  accessToken: string;
  onLogout: () => void;
}

export function PatientDashboard({ user, accessToken, onLogout }: PatientDashboardProps) {
  const [patientData, setPatientData] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);
  const [doctors, setDoctors] = useState<User[]>([]);
  const [appointmentForm, setAppointmentForm] = useState({
    doctorId: '',
    date: '',
    time: '',
    reason: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadPatientData();
    loadDoctors();
  }, []);

  const loadPatientData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ad73f8aa/patient/data`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao carregar dados');
      }

      setPatientData(data.patient);
    } catch (err: any) {
      console.error('Error loading patient data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadDoctors = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ad73f8aa/doctors`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao carregar médicos');
      }

      setDoctors(data.doctors || []);
    } catch (err: any) {
      console.error('Error loading doctors:', err);
    }
  };

  const handleCreateAppointment = async () => {
    if (!appointmentForm.doctorId || !appointmentForm.date || !appointmentForm.time) {
      setError('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ad73f8aa/appointments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            patientId: user.id,
            doctorId: appointmentForm.doctorId,
            date: appointmentForm.date,
            time: appointmentForm.time,
            reason: appointmentForm.reason,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar agendamento');
      }

      // Reset form and close dialog
      setAppointmentForm({ doctorId: '', date: '', time: '', reason: '' });
      setAppointmentDialogOpen(false);
      
      // Reload patient data
      await loadPatientData();
    } catch (err: any) {
      console.error('Error creating appointment:', err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownloadFile = async (examId: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ad73f8aa/download/${user.id}/${examId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao baixar arquivo');
      }

      // Open download URL in new tab
      window.open(data.downloadUrl, '_blank');
    } catch (err: any) {
      console.error('Error downloading file:', err);
      setError(err.message);
    }
  };

  const getFileIcon = (fileType?: string) => {
    if (!fileType) return <FileIcon className="h-5 w-5 text-gray-500" />;
    
    if (fileType.startsWith('image/')) {
      return <FileImage className="h-5 w-5 text-blue-500" />;
    } else if (fileType === 'application/pdf') {
      return <FileText className="h-5 w-5 text-red-500" />;
    } else {
      return <FileIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl">Prontuário Eletrônico</h1>
              <p className="text-gray-600">Bem-vindo(a), {user.name}</p>
            </div>
            <Button onClick={onLogout} variant="outline">
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Consultas</CardTitle>
              <Calendar className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{patientData?.medicalHistory?.length || 0}</div>
              <p className="text-xs text-gray-600">Total de consultas realizadas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Agendamentos</CardTitle>
              <FileText className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">
                {patientData?.appointments?.filter(a => a.status === 'scheduled').length || 0}
              </div>
              <p className="text-xs text-gray-600">Consultas agendadas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Exames</CardTitle>
              <Activity className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{patientData?.exams?.length || 0}</div>
              <p className="text-xs text-gray-600">Exames registrados</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="history" className="space-y-4">
          <TabsList>
            <TabsTrigger value="history">Histórico Médico</TabsTrigger>
            <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
            <TabsTrigger value="exams">Exames</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Consultas</CardTitle>
                <CardDescription>
                  Suas consultas e diagnósticos anteriores
                </CardDescription>
              </CardHeader>
              <CardContent>
                {patientData?.medicalHistory && patientData.medicalHistory.length > 0 ? (
                  <div className="space-y-4">
                    {patientData.medicalHistory.map((consultation) => (
                      <div
                        key={consultation.id}
                        className="border rounded-lg p-4 space-y-2"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-gray-600">
                              {new Date(consultation.date).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </p>
                            <p className="text-sm text-gray-600">
                              Dr(a). {consultation.doctorName}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">Diagnóstico:</span>{' '}
                            {consultation.diagnosis}
                          </p>
                          {consultation.notes && (
                            <p className="text-sm mt-2">
                              <span className="font-medium">Observações:</span>{' '}
                              {consultation.notes}
                            </p>
                          )}
                          {consultation.prescription && (
                            <p className="text-sm mt-2">
                              <span className="font-medium">Prescrição:</span>{' '}
                              {consultation.prescription}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Nenhuma consulta registrada ainda
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Próximos Agendamentos</CardTitle>
                    <CardDescription>Suas consultas agendadas</CardDescription>
                  </div>
                  <Button onClick={() => setAppointmentDialogOpen(true)} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Agendar Consulta
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {patientData?.appointments && patientData.appointments.length > 0 ? (
                  <div className="space-y-4">
                    {patientData.appointments
                      .filter((apt) => apt.status === 'scheduled')
                      .map((appointment) => (
                        <div
                          key={appointment.id}
                          className="border rounded-lg p-4 space-y-2"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm">
                                {new Date(appointment.date).toLocaleDateString('pt-BR')} às{' '}
                                {appointment.time}
                              </p>
                              {appointment.reason && (
                                <p className="text-sm text-gray-600 mt-1">
                                  Motivo: {appointment.reason}
                                </p>
                              )}
                            </div>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                              Agendado
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Nenhum agendamento no momento
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exams" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Exames</CardTitle>
                    <CardDescription>Seus exames e resultados</CardDescription>
                  </div>
                  <Button onClick={() => setUploadDialogOpen(true)} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Exame
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {patientData?.exams && patientData.exams.length > 0 ? (
                  <div className="space-y-4">
                    {patientData.exams.map((exam) => (
                      <div key={exam.id} className="border rounded-lg p-4 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{exam.type}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(exam.date).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          <div>
                            <Button
                              onClick={() => handleDownloadFile(exam.id)}
                              variant="outline"
                              className="text-sm"
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Baixar
                            </Button>
                          </div>
                        </div>
                        {exam.results && (
                          <p className="text-sm">
                            <span className="font-medium">Resultados:</span> {exam.results}
                          </p>
                        )}
                        {exam.fileType && (
                          <div className="flex items-center mt-2">
                            {getFileIcon(exam.fileType)}
                            <p className="text-sm text-gray-600 ml-2">
                              {exam.fileName} ({formatFileSize(exam.fileSize)})
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Nenhum exame registrado ainda
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <FileUpload
        patientId={user.id}
        accessToken={accessToken}
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        onUploadSuccess={loadPatientData}
      />

      <Dialog open={appointmentDialogOpen} onOpenChange={setAppointmentDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Agendar Consulta</DialogTitle>
            <DialogDescription>
              Escolha um médico e horário para sua consulta
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="doctor">Médico *</Label>
              <Select
                value={appointmentForm.doctorId}
                onValueChange={(value: string) => setAppointmentForm({ ...appointmentForm, doctorId: value })}
                disabled={submitting}
              >
                <SelectTrigger id="doctor">
                  <SelectValue placeholder="Selecione um médico" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      Dr(a). {doctor.name} {doctor.specialization ? `- ${doctor.specialization}` : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Data *</Label>
              <Input
                id="date"
                type="date"
                value={appointmentForm.date}
                onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                disabled={submitting}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Horário *</Label>
              <Input
                id="time"
                type="time"
                value={appointmentForm.time}
                onChange={(e) => setAppointmentForm({ ...appointmentForm, time: e.target.value })}
                disabled={submitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Motivo da Consulta</Label>
              <Input
                id="reason"
                type="text"
                placeholder="Ex: Consulta de rotina, dor de cabeça..."
                value={appointmentForm.reason}
                onChange={(e) => setAppointmentForm({ ...appointmentForm, reason: e.target.value })}
                disabled={submitting}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setAppointmentDialogOpen(false)}
                disabled={submitting}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCreateAppointment}
                disabled={submitting || !appointmentForm.doctorId || !appointmentForm.date || !appointmentForm.time}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Agendando...
                  </>
                ) : (
                  'Agendar'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
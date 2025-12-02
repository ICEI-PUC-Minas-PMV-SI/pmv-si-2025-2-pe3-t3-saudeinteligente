import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Calendar, Users, FileText, AlertCircle, Loader2, Plus, Upload, Download, FileImage, File as FileIcon } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { projectId } from '../utils/supabase/info';
import { FileUpload } from './FileUpload';
import type { Appointment, User, Patient } from '../types';

interface DoctorDashboardProps {
  user: User;
  accessToken: string;
  onLogout: () => void;
}

export function DoctorDashboard({ user, accessToken, onLogout }: DoctorDashboardProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<(Patient & { name: string; email: string }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [consultationDialogOpen, setConsultationDialogOpen] = useState(false);
  const [consultationForm, setConsultationForm] = useState({
    diagnosis: '',
    notes: '',
    prescription: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ad73f8aa/doctor/appointments`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao carregar agendamentos');
      }

      setAppointments(data.appointments || []);
    } catch (err: any) {
      console.error('Error loading appointments:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadPatientData = async (patientId: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ad73f8aa/doctor/patient/${patientId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao carregar dados do paciente');
      }

      setSelectedPatient(data.patient);
    } catch (err: any) {
      console.error('Error loading patient data:', err);
      setError(err.message);
    }
  };

  const handleAddConsultation = async () => {
    if (!selectedPatient) return;

    try {
      setSubmitting(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ad73f8aa/doctor/consultation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            patientId: selectedPatient.userId,
            ...consultationForm,
          }),
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao adicionar consulta');
      }

      // Reload patient data to show the new consultation
      await loadPatientData(selectedPatient.userId);
      
      setConsultationDialogOpen(false);
      setConsultationForm({ diagnosis: '', notes: '', prescription: '' });
    } catch (err: any) {
      console.error('Error adding consultation:', err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
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
              <h1 className="text-2xl">Painel do Médico</h1>
              <p className="text-gray-600">Dr(a). {user.name}</p>
              {user.specialization && (
                <p className="text-sm text-gray-500">{user.specialization}</p>
              )}
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
              <CardTitle className="text-sm">Agendamentos</CardTitle>
              <Calendar className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">
                {appointments.filter(a => a.status === 'scheduled').length}
              </div>
              <p className="text-xs text-gray-600">Consultas agendadas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Pacientes</CardTitle>
              <Users className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">
                {new Set(appointments.map(a => a.patientId)).size}
              </div>
              <p className="text-xs text-gray-600">Pacientes ativos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Total de Consultas</CardTitle>
              <FileText className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{appointments.length}</div>
              <p className="text-xs text-gray-600">Registros no sistema</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="appointments" className="space-y-4">
          <TabsList>
            <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
            <TabsTrigger value="patients">Pacientes</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Próximos Agendamentos</CardTitle>
                <CardDescription>Suas consultas agendadas</CardDescription>
              </CardHeader>
              <CardContent>
                {appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments
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
                            <div className="space-x-2">
                              <Button
                                size="sm"
                                onClick={() => loadPatientData(appointment.patientId)}
                              >
                                Ver Paciente
                              </Button>
                            </div>
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

          <TabsContent value="patients" className="space-y-4">
            {selectedPatient ? (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Prontuário do Paciente</CardTitle>
                      <CardDescription>
                        {selectedPatient.name} - {selectedPatient.email}
                      </CardDescription>
                    </div>
                    <div className="space-x-2">
                      <Dialog open={consultationDialogOpen} onOpenChange={setConsultationDialogOpen}>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Nova Consulta
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Adicionar Consulta</DialogTitle>
                            <DialogDescription>
                              Registre os detalhes da consulta
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="diagnosis">Diagnóstico *</Label>
                              <Input
                                id="diagnosis"
                                value={consultationForm.diagnosis}
                                onChange={(e) =>
                                  setConsultationForm({
                                    ...consultationForm,
                                    diagnosis: e.target.value,
                                  })
                                }
                                placeholder="Diagnóstico principal"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="notes">Observações</Label>
                              <Textarea
                                id="notes"
                                value={consultationForm.notes}
                                onChange={(e) =>
                                  setConsultationForm({
                                    ...consultationForm,
                                    notes: e.target.value,
                                  })
                                }
                                placeholder="Observações adicionais"
                                rows={3}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="prescription">Prescrição</Label>
                              <Textarea
                                id="prescription"
                                value={consultationForm.prescription}
                                onChange={(e) =>
                                  setConsultationForm({
                                    ...consultationForm,
                                    prescription: e.target.value,
                                  })
                                }
                                placeholder="Medicamentos e instruções"
                                rows={3}
                              />
                            </div>
                            <Button
                              onClick={handleAddConsultation}
                              disabled={!consultationForm.diagnosis || submitting}
                              className="w-full"
                            >
                              {submitting ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Salvando...
                                </>
                              ) : (
                                'Salvar Consulta'
                              )}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedPatient(null)}
                      >
                        Voltar
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Histórico de Consultas</h3>
                      {selectedPatient.medicalHistory && selectedPatient.medicalHistory.length > 0 ? (
                        <div className="space-y-4">
                          {selectedPatient.medicalHistory.map((consultation) => (
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
                        <p className="text-gray-500 text-sm">
                          Nenhuma consulta registrada
                        </p>
                      )}
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Agendamentos</h3>
                      {selectedPatient.appointments && selectedPatient.appointments.length > 0 ? (
                        <div className="space-y-2">
                          {selectedPatient.appointments.map((apt) => (
                            <div key={apt.id} className="border rounded p-3 text-sm">
                              <p>
                                {new Date(apt.date).toLocaleDateString('pt-BR')} às {apt.time}
                              </p>
                              {apt.reason && (
                                <p className="text-gray-600">Motivo: {apt.reason}</p>
                              )}
                              <span
                                className={`inline-block mt-1 px-2 py-1 rounded text-xs ${
                                  apt.status === 'scheduled'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {apt.status === 'scheduled' ? 'Agendado' : apt.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">Nenhum agendamento</p>
                      )}
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium">Exames e Documentos</h3>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setUploadDialogOpen(true)}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Adicionar Exame
                        </Button>
                      </div>
                      {selectedPatient.exams && selectedPatient.exams.length > 0 ? (
                        <div className="space-y-2">
                          {selectedPatient.exams.map((exam) => (
                            <div key={exam.id} className="border rounded p-3">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{exam.type}</p>
                                  <p className="text-xs text-gray-600">
                                    {new Date(exam.date).toLocaleDateString('pt-BR')} - Dr(a). {exam.doctorName}
                                  </p>
                                  {exam.description && (
                                    <p className="text-sm text-gray-600 mt-1">{exam.description}</p>
                                  )}
                                  {exam.fileName && (
                                    <div className="flex items-center mt-2 text-sm text-gray-500">
                                      {exam.fileType?.startsWith('image/') ? (
                                        <FileImage className="h-4 w-4 mr-1" />
                                      ) : (
                                        <FileIcon className="h-4 w-4 mr-1" />
                                      )}
                                      {exam.fileName}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">Nenhum exame registrado</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Pacientes</CardTitle>
                  <CardDescription>
                    Selecione um paciente da lista de agendamentos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 text-center py-8">
                    Clique em "Ver Paciente" em um agendamento para acessar o prontuário
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {selectedPatient && (
          <FileUpload
            patientId={selectedPatient.userId}
            accessToken={accessToken}
            open={uploadDialogOpen}
            onOpenChange={setUploadDialogOpen}
            onUploadSuccess={() => {
              loadPatientData(selectedPatient.userId);
            }}
          />
        )}
      </main>
    </div>
  );
}
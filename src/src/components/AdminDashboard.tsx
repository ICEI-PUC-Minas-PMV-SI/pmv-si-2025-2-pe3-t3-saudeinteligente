import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Users, Calendar, Activity, AlertCircle, Loader2, UserCheck, Stethoscope } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { projectId } from '../utils/supabase/info';
import type { User } from '../types';

interface AdminDashboardProps {
  user: User;
  accessToken: string;
  onLogout: () => void;
}

interface Stats {
  totalUsers: number;
  totalPatients: number;
  totalDoctors: number;
  totalAppointments: number;
  scheduledAppointments: number;
}

export function AdminDashboard({ user, accessToken, onLogout }: AdminDashboardProps) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      setLoading(true);
      
      // Load stats
      const statsResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ad73f8aa/admin/stats`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const statsData = await statsResponse.json();
      if (statsResponse.ok) {
        setStats(statsData.stats);
      }

      // Load users
      const usersResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ad73f8aa/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const usersData = await usersResponse.json();
      if (usersResponse.ok) {
        setUsers(usersData.users || []);
      }

      // Load patients
      const patientsResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ad73f8aa/admin/patients`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const patientsData = await patientsResponse.json();
      if (patientsResponse.ok) {
        setPatients(patientsData.patients || []);
      }

      // Load appointments
      const appointmentsResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ad73f8aa/admin/appointments`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const appointmentsData = await appointmentsResponse.json();
      if (appointmentsResponse.ok) {
        setAppointments(appointmentsData.appointments || []);
      }
    } catch (err: any) {
      console.error('Error loading admin data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
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
              <h1 className="text-2xl">Painel Administrativo</h1>
              <p className="text-gray-600">Administrador: {user.name}</p>
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Total de Usuários</CardTitle>
              <Users className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stats?.totalUsers || 0}</div>
              <p className="text-xs text-gray-600">Usuários registrados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Pacientes</CardTitle>
              <UserCheck className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stats?.totalPatients || 0}</div>
              <p className="text-xs text-gray-600">Pacientes cadastrados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Médicos</CardTitle>
              <Stethoscope className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stats?.totalDoctors || 0}</div>
              <p className="text-xs text-gray-600">Médicos no sistema</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Agendamentos</CardTitle>
              <Calendar className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stats?.scheduledAppointments || 0}</div>
              <p className="text-xs text-gray-600">Consultas agendadas</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Usuários do Sistema</CardTitle>
                <CardDescription>
                  Lista completa de usuários cadastrados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>CRM/Especialização</TableHead>
                        <TableHead>Data de Cadastro</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((u) => (
                        <TableRow key={u.id}>
                          <TableCell>{u.name}</TableCell>
                          <TableCell>{u.email}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                u.role === 'admin'
                                  ? 'bg-purple-100 text-purple-800'
                                  : u.role === 'doctor'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-green-100 text-green-800'
                              }`}
                            >
                              {u.role === 'admin'
                                ? 'Administrador'
                                : u.role === 'doctor'
                                ? 'Médico'
                                : 'Paciente'}
                            </span>
                          </TableCell>
                          <TableCell>
                            {u.role === 'doctor' && u.crm ? (
                              <div className="text-sm">
                                <p>CRM: {u.crm}</p>
                                {u.specialization && (
                                  <p className="text-gray-600">{u.specialization}</p>
                                )}
                              </div>
                            ) : (
                              '-'
                            )}
                          </TableCell>
                          <TableCell className="text-sm">
                            {new Date(u.createdAt).toLocaleDateString('pt-BR')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Agendamentos</CardTitle>
                <CardDescription>
                  Todas as consultas agendadas no sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Horário</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Motivo</TableHead>
                        <TableHead>Criado em</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {appointments.map((apt) => (
                        <TableRow key={apt.id}>
                          <TableCell>
                            {new Date(apt.date).toLocaleDateString('pt-BR')}
                          </TableCell>
                          <TableCell>{apt.time}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                apt.status === 'scheduled'
                                  ? 'bg-blue-100 text-blue-800'
                                  : apt.status === 'completed'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {apt.status === 'scheduled'
                                ? 'Agendado'
                                : apt.status === 'completed'
                                ? 'Concluído'
                                : 'Cancelado'}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm">
                            {apt.reason || '-'}
                          </TableCell>
                          <TableCell className="text-sm">
                            {new Date(apt.createdAt).toLocaleDateString('pt-BR')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição de Usuários</CardTitle>
                  <CardDescription>Por tipo de perfil</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pacientes</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{
                            width: `${
                              stats?.totalUsers
                                ? (stats.totalPatients / stats.totalUsers) * 100
                                : 0
                            }%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium">{stats?.totalPatients || 0}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Médicos</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{
                            width: `${
                              stats?.totalUsers
                                ? (stats.totalDoctors / stats.totalUsers) * 100
                                : 0
                            }%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium">{stats?.totalDoctors || 0}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Administradores</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500"
                          style={{
                            width: `${
                              stats?.totalUsers
                                ? ((stats.totalUsers - stats.totalPatients - stats.totalDoctors) /
                                    stats.totalUsers) *
                                  100
                                : 0
                            }%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {(stats?.totalUsers || 0) - (stats?.totalPatients || 0) - (stats?.totalDoctors || 0)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas de Agendamentos</CardTitle>
                  <CardDescription>Status dos agendamentos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total de agendamentos</span>
                    <span className="text-2xl">{stats?.totalAppointments || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Agendados</span>
                    <span className="text-2xl text-blue-600">
                      {stats?.scheduledAppointments || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Taxa de ocupação</span>
                    <span className="text-2xl text-green-600">
                      {stats?.totalAppointments
                        ? Math.round(
                            ((stats?.scheduledAppointments || 0) / stats.totalAppointments) * 100
                          )
                        : 0}
                      %
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Atividade do Sistema</CardTitle>
                  <CardDescription>
                    Resumo das atividades recentes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 pb-4 border-b">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Activity className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          Sistema operando normalmente com{' '}
                          <span className="font-medium">{stats?.totalUsers || 0}</span> usuários
                          ativos
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {stats?.scheduledAppointments || 0} consultas agendadas pendentes
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <UserCheck className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          Total de{' '}
                          <span className="font-medium">{patients.length}</span> prontuários
                          registrados
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Monitoramento contínuo de dados de saúde
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

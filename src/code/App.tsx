import { useState, useEffect } from 'react';
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';
import { PatientDashboard } from './components/PatientDashboard';
import { DoctorDashboard } from './components/DoctorDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { signIn, signOut, getSession, signUp, getUserProfile } from './utils/auth';
import { Loader2, Heart } from 'lucide-react';
import type { User } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'login' | 'signup'>('login');
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const session = await getSession();
      if (session) {
        setAccessToken(session.access_token);
        const userProfile = await getUserProfile(session.access_token);
        setUser(userProfile);
      }
    } catch (error) {
      console.error('Error checking session:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    const { session } = await signIn(email, password);
    setAccessToken(session.access_token);
    const userProfile = await getUserProfile(session.access_token);
    setUser(userProfile);
  };

  const handleSignup = async (
    email: string,
    password: string,
    name: string,
    role: string,
    crm?: string,
    specialization?: string
  ) => {
    await signUp(email, password, name, role, crm, specialization);
    // After signup, automatically login
    const { session } = await signIn(email, password);
    setAccessToken(session.access_token);
    const userProfile = await getUserProfile(session.access_token);
    setUser(userProfile);
  };

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    setAccessToken('');
    setCurrentView('login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Carregando sistema...</p>
        </div>
      </div>
    );
  }

  // If user is logged in, show appropriate dashboard
  if (user && accessToken) {
    if (user.role === 'patient') {
      return <PatientDashboard user={user} accessToken={accessToken} onLogout={handleLogout} />;
    } else if (user.role === 'doctor') {
      return <DoctorDashboard user={user} accessToken={accessToken} onLogout={handleLogout} />;
    } else if (user.role === 'admin') {
      return <AdminDashboard user={user} accessToken={accessToken} onLogout={handleLogout} />;
    }
  }

  // Show login/signup forms
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl text-gray-900 mb-2">Prontuário Eletrônico</h1>
          <p className="text-gray-600">
            Sistema seguro de gestão de registros médicos
          </p>
        </div>

        {currentView === 'login' ? (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToSignup={() => setCurrentView('signup')}
          />
        ) : (
          <SignupForm
            onSignup={handleSignup}
            onSwitchToLogin={() => setCurrentView('login')}
          />
        )}

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Sistema desenvolvido para gestão segura de prontuários médicos
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Acesso restrito por perfil de usuário
          </p>
        </div>
      </div>
    </div>
  );
}

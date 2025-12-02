import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './supabase/info';

export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw new Error(error.message);
  }
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  
  if (error) {
    throw new Error(error.message);
  }

  return data.session;
}

export async function signUp(
  email: string,
  password: string,
  name: string,
  role: string,
  crm?: string,
  specialization?: string
) {
  const response = await fetch(
    `https://${projectId}.supabase.co/functions/v1/make-server-ad73f8aa/signup`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({
        email,
        password,
        name,
        role,
        crm,
        specialization,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to sign up');
  }

  return data;
}

export async function getUserProfile(accessToken: string) {
  const response = await fetch(
    `https://${projectId}.supabase.co/functions/v1/make-server-ad73f8aa/profile`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to get profile');
  }

  return data.user;
}

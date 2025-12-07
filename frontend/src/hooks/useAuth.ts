'use client';

import { useEffect, useCallback } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { authState, tokenState } from '@/store';
import toast from 'react-hot-toast';

export function useAuth() {
  const [authStateValue, setAuth] = useRecoilState(authState);
  const setToken = useSetRecoilState(tokenState);
  const router = useRouter();

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // User is signed in
        const token = await firebaseUser.getIdToken();
        localStorage.setItem('token', token);
        setToken(token);
        
        setAuth({
          user: {
            _id: firebaseUser.uid,
            name: firebaseUser.displayName || '',
            email: firebaseUser.email || '',
            phone: firebaseUser.phoneNumber || '',
            addresses: [],
            createdAt: firebaseUser.metadata.creationTime || '',
            updatedAt: firebaseUser.metadata.lastSignInTime || '',
          },
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        // User is signed out
        localStorage.removeItem('token');
        setToken(null);
        setAuth({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    });

    return () => unsubscribe();
  }, [setAuth, setToken]);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setAuth((prev) => ({ ...prev, isLoading: true }));
        await signInWithEmailAndPassword(auth, email, password);
        
        toast.success('Login successful!');
        router.push('/');
        return { success: true };
      } catch (error: unknown) {
        setAuth((prev) => ({ ...prev, isLoading: false }));
        const err = error as { code?: string; message?: string };
        let message = 'Login failed';
        
        if (err.code === 'auth/user-not-found') {
          message = 'No account found with this email';
        } else if (err.code === 'auth/wrong-password') {
          message = 'Incorrect password';
        } else if (err.code === 'auth/invalid-email') {
          message = 'Invalid email address';
        } else if (err.code === 'auth/too-many-requests') {
          message = 'Too many failed attempts. Please try again later';
        }
        
        toast.error(message);
        return { success: false, message };
      }
    },
    [router, setAuth]
  );

  const register = useCallback(
    async (data: { name: string; email: string; password: string; phone: string }) => {
      try {
        setAuth((prev) => ({ ...prev, isLoading: true }));
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        
        // Update user profile with name
        await updateProfile(userCredential.user, {
          displayName: data.name,
        });

        toast.success('Registration successful!');
        router.push('/');
        return { success: true };
      } catch (error: unknown) {
        setAuth((prev) => ({ ...prev, isLoading: false }));
        const err = error as { code?: string; message?: string };
        let message = 'Registration failed';
        
        if (err.code === 'auth/email-already-in-use') {
          message = 'Email already registered';
        } else if (err.code === 'auth/invalid-email') {
          message = 'Invalid email address';
        } else if (err.code === 'auth/weak-password') {
          message = 'Password should be at least 6 characters';
        }
        
        toast.error(message);
        return { success: false, message };
      }
    },
    [router, setAuth]
  );

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      router.push('/login');
    } catch {
      toast.error('Failed to log out');
    }
  }, [router]);

  return {
    user: authStateValue.user,
    isAuthenticated: authStateValue.isAuthenticated,
    isLoading: authStateValue.isLoading,
    login,
    register,
    logout,
  };
}

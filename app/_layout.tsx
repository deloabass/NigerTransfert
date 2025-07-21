import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider } from '@/contexts/AuthContext';
import { CountryProvider } from '@/contexts/CountryContext';
import { AlertProvider } from '@/components/AlertProvider';
import { ToastProvider } from '@/components/ToastProvider';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <AuthProvider>
      <CountryProvider>
        <AlertProvider>
          <ToastProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="onboarding" />
              <Stack.Screen name="auth" />
              <Stack.Screen name="kyc" />
              <Stack.Screen name="faq" />
              <Stack.Screen name="profile" />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="dark" />
          </ToastProvider>
        </AlertProvider>
      </CountryProvider>
    </AuthProvider>
  );
}

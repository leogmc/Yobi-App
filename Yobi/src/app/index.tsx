import * as React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import AuthScreen from './auth/auth';

SplashScreen.preventAutoHideAsync(); 

export default function App() {
  return <AuthScreen />;
}
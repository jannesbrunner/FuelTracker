import React, { Component, createContext } from 'react';
import { ThemeProvider } from "react-native-rapi-ui";
import { View } from 'react-native';
import { useAuth, AuthProvider } from './js/helpers/auth'
import AppNavigator from './js/AppNavigator';
import AuthNavigator from './js/AuthNavigator';

export default function App() {

  return (
    <ThemeProvider theme="light">
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </ThemeProvider>
  );

}

import React, { Component, createContext } from 'react';
import { ThemeProvider } from "react-native-rapi-ui";
import { View } from 'react-native';
import { useAuth, AuthProvider } from './js/helpers/auth'
import AppNavigator from './js/AppNavigator';
import AuthNavigator from './js/AuthNavigator';

import 'react-native-url-polyfill/auto'; 
// ^- https://justinnoel.dev/2020/12/08/react-native-urlsearchparams-error-not-implemented/

export default function App() {

  return (
    <ThemeProvider theme="light">
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </ThemeProvider>
  );

}

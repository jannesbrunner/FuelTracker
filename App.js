import React, { Component, createContext } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { useAuth, AuthProvider } from './js/helpers/auth'
import AppNavigator from './js/AppNavigator';

import 'react-native-url-polyfill/auto'; 
// ^- https://justinnoel.dev/2020/12/08/react-native-urlsearchparams-error-not-implemented/

export default function App() {

  return (
    <PaperProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </PaperProvider>
  );

}

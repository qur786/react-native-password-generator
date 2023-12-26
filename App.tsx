import {ScrollView} from 'react-native';
import React from 'react';
import {PasswedGenerator} from './components/PasswordGenerator';

export default function App() {
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <PasswedGenerator />
    </ScrollView>
  );
}

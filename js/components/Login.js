import { useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { 
    Button, TextInput, Picker, Text, Section, SectionContent, Layout, TopNav 
} from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';

import { supabase } from '../helpers/database'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (email) => {
    try {
      setLoading(true)
      console.log(email)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text size='h1'>Fuel Tracker Login</Text>
      <Text>Sign in via magic link with your email below</Text>
      <TextInput
      style={styles.textInput}
      placeholder='yourmail@provider.com'
      onChangeText={(val => setEmail(val))}

      rightContent={
        <Ionicons name="mail" size={20} color={'grey'} />
    }
      ></TextInput >
      <Button text="Login" status="primary" onPress={() => handleLogin(email)} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    textInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
})
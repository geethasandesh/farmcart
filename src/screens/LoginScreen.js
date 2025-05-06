import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, Alert } from 'react-native';
import { TextInput, Button, Text, Surface } from 'react-native-paper';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Surface style={styles.headerContainer}>
          <Text style={styles.title}>Welcome to FarmCart</Text>
          <Text style={styles.subtitle}>Fresh from Farm to Your Door</Text>
        </Surface>

        <Surface style={styles.formContainer}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            theme={{ colors: { primary: '#2E7D32' } }}
          />
          
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            mode="outlined"
            secureTextEntry
            theme={{ colors: { primary: '#2E7D32' } }}
          />

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            style={styles.button}
            buttonColor="#4CAF50"
          >
            Login
          </Button>

          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Register')}
            style={styles.linkButton}
            textColor="#4CAF50"
          >
            Don't have an account? Register
          </Button>
        </Surface>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  headerContainer: {
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  formContainer: {
    padding: 20,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 16,
    padding: 8,
  },
  linkButton: {
    marginTop: 12,
    borderColor: '#4CAF50',
  },
});

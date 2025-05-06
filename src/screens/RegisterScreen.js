import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text, Surface } from 'react-native-paper';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !phone || !address) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        phone,
        address,
        createdAt: new Date().toISOString(),
      });

      Alert.alert('Success', 'Registration successful!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentContainer}>
          <Surface style={styles.headerContainer}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join FarmCart Today</Text>
          </Surface>

          <Surface style={styles.formContainer}>
            <TextInput
              label="Full Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
              mode="outlined"
              theme={{ colors: { primary: '#2E7D32' } }}
            />
            
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
            
            <TextInput
              label="Phone Number"
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
              mode="outlined"
              keyboardType="phone-pad"
              theme={{ colors: { primary: '#2E7D32' } }}
            />
            
            <TextInput
              label="Address"
              value={address}
              onChangeText={setAddress}
              style={styles.input}
              mode="outlined"
              multiline
              numberOfLines={3}
              theme={{ colors: { primary: '#2E7D32' } }}
            />

            <Button
              mode="contained"
              onPress={handleRegister}
              loading={loading}
              disabled={loading}
              style={styles.button}
              buttonColor="#4CAF50"
            >
              Register
            </Button>

            <Button
              mode="outlined"
              onPress={() => navigation.navigate('Login')}
              style={styles.linkButton}
              textColor="#4CAF50"
            >
              Already have an account? Login
            </Button>
          </Surface>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center', // Centers content vertically
    padding: 20,
    paddingTop: 40, // Add some padding at the top
    paddingBottom: 40, // Add some padding at the bottom
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
    marginBottom: 20,
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

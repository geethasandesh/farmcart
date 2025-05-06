import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.logoContainer}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>🌱</Text>
        </View>
        <Text style={styles.title}>FarmCart</Text>
        <Text style={styles.subtitle}>Farm Fresh. Direct to You.</Text>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.description}>
          Buy fresh vegetables, fruits, and organic products directly from farmers.
          No middlemen. Better prices. Fresher produce.
        </Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.loginButton]} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.registerButton]} 
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  logoContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
  },
  infoContainer: {
    flex: 0.2,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  button: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  loginButton: {
    backgroundColor: '#4CAF50',
  },
  registerButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4CAF50',
  },
});

export default WelcomeScreen; 
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Alert
} from 'react-native';
import { Button, Divider, List, Switch, Card, ActivityIndicator } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { auth, db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        navigation.replace('Login');
        return;
      }

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        Alert.alert('Error', 'User data not found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Error', 'Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <ScrollView>
        <View style={styles.profileHeader}>
          <Image 
            source={{ uri: userData?.image }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{userData?.name}</Text>
          <Text style={styles.profileEmail}>{userData?.email}</Text>
          
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        
        <Divider />
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Full Name</Text>
            <Text style={styles.infoValue}>{userData?.name}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{userData?.email}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoValue}>{userData?.phone}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Delivery Address</Text>
            <Text style={styles.infoValue}>{userData?.address}</Text>
          </View>
        </View>
        
        <Divider />
        
        <List.Section>
          <List.Subheader style={styles.sectionTitle}>Account Settings</List.Subheader>
          
          <List.Item
            title="My Orders"
            left={props => <List.Icon {...props} icon="package-variant" color="#4CAF50" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {/* Navigate to orders */}}
          />
          
          <List.Item
            title="Delivery Addresses"
            left={props => <List.Icon {...props} icon="map-marker" color="#4CAF50" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {/* Navigate to addresses */}}
          />
          
          <List.Item
            title="Payment Methods"
            left={props => <List.Icon {...props} icon="credit-card" color="#4CAF50" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {/* Navigate to payment methods */}}
          />
          
          <List.Item
            title="Notifications"
            left={props => <List.Icon {...props} icon="bell" color="#4CAF50" />}
            right={() => (
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                color="#4CAF50"
              />
            )}
          />
          
          <List.Item
            title="Location Services"
            left={props => <List.Icon {...props} icon="map-marker-radius" color="#4CAF50" />}
            right={() => (
              <Switch
                value={locationEnabled}
                onValueChange={setLocationEnabled}
                color="#4CAF50"
              />
            )}
          />
        </List.Section>
        
        <Divider />
        
        <List.Section>
          <List.Subheader style={styles.sectionTitle}>Support</List.Subheader>
          
          <List.Item
            title="Help Center"
            left={props => <List.Icon {...props} icon="help-circle" color="#4CAF50" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {/* Navigate to help center */}}
          />
          
          <List.Item
            title="Contact Us"
            left={props => <List.Icon {...props} icon="email" color="#4CAF50" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {/* Navigate to contact us */}}
          />
          
          <List.Item
            title="About FarmCart"
            left={props => <List.Icon {...props} icon="information" color="#4CAF50" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {/* Navigate to about */}}
          />
        </List.Section>
        
        <View style={styles.logoutButtonContainer}>
          <Button
            mode="outlined"
            style={styles.logoutButton}
            contentStyle={styles.logoutButtonContent}
            labelStyle={styles.logoutButtonLabel}
            icon="logout"
            onPress={handleLogout}
          >
            Logout
          </Button>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>FarmCart v1.0.0</Text>
          <Text style={styles.footerText}>© 2023 FarmCart. All rights reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  editProfileButton: {
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  editProfileText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoItem: {
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
  logoutButtonContainer: {
    padding: 20,
    alignItems: 'center',
  },
  logoutButton: {
    width: '100%',
    borderColor: '#FF5252',
    borderWidth: 1,
  },
  logoutButtonContent: {
    height: 50,
  },
  logoutButtonLabel: {
    fontSize: 16,
    color: '#FF5252',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen; 
import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import menu from '../assets/images/menu_icon.png';
import user_icon from '../assets/images/user_icon.png';
import email_icon from '../assets/images/email_icon.png';
import password_icon from '../assets/images/password_Icon1.png';
import name_icon from '../assets/images/name_icon.png';
import age_icon from '../assets/images/age_icon.png';
import birthday_icon from '../assets/images/birthday_icon.png';

// Define Drawer Navigator
const Drawer = createDrawerNavigator();

const HomeScreen = () => (
  <View style={styles.container}>
    <Text style={styles.welcomeText}>Welcome to the Dashboard!</Text>
  </View>
);

const ProfileScreen = ({ navigation, name, age, birthday, onProfileUpdate }) => {
  const [editName, setEditName] = useState(name);
  const [editAge, setEditAge] = useState(age);
  const [editBirthday, setEditBirthday] = useState(birthday);

  const handleSave = () => {
    onProfileUpdate(editName, editAge, editBirthday);
    Alert.alert("Profile Updated", "Your profile has been updated successfully.", [
      {
        text: "OK",
        onPress: () => navigation.navigate('Home'), // Navigate back to Home
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.profileHeader}>Profile</Text>
      <View style={styles.inputContainer}>
        <Image source={name_icon} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={editName}
          onChangeText={setEditName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image source={age_icon} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Age"
          keyboardType="numeric"
          value={editAge}
          onChangeText={setEditAge}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image source={birthday_icon} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Birthday"
          value={editBirthday}
          onChangeText={setEditBirthday}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
          <Text style={styles.submitButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SettingsScreen = ({ onLogout }) => (
  <View style={styles.container}>
    <Text style={styles.profileHeader}>Settings</Text>
    <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
      <Text style={styles.logoutButtonText}>Log Out</Text>
    </TouchableOpacity>
  </View>
);

// New Forgot Password Screen
const ForgotPasswordScreen = ({ onRequestReset, onBackToLogin }) => {
  const [email, setEmail] = useState('');

  const handleRequestReset = () => {
    if (email) {
      // Replace with your password reset logic
      Alert.alert("Password Reset Request", `Reset link sent to ${email}.`);
      setEmail(''); // Clear input field
      onBackToLogin(); // Navigate back to login after requesting reset
    } else {
      Alert.alert("Error", "Please enter your email.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.profileHeader}>Forgot Password</Text>
      <View style={styles.inputContainer}>
        <Image source={email_icon} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleRequestReset}>
        <Text style={styles.submitButtonText}>Send Reset Link</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onBackToLogin}>
        <Text style={styles.switchMode}>
          Back to Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Apps = () => {
  const [Name, setName] = useState('');
  const [Age, setAge] = useState('');
  const [Birthday, setBirthday] = useState('');
  const [StudentNo, setStudentNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setName('');
    setAge('');
    setBirthday('');
    setStudentNo('');
    setEmail('');
    setPassword('');
    Alert.alert("Logged Out", "You have been logged out successfully.");
  };

  const handleProfileUpdate = (updatedName, updatedAge, updatedBirthday) => {
    setName(updatedName);
    setAge(updatedAge);
    setBirthday(updatedBirthday);
  };

  const handleSubmit = () => {
    if (isRegistering) {
      Alert.alert("Registration", `Successfully registered as ${email}.`);
      setIsRegistering(false);
    } else {
      if (password === "123") {
        Alert.alert("Log in", `Welcome back, ${Name}!`);
        setIsLoggedIn(true);
      } else {
        Alert.alert("Error", "Invalid student number or password.");
      }
    }
  };

  if (isForgotPassword) {
    return (
      <ForgotPasswordScreen
        onRequestReset={() => setIsForgotPassword(false)} 
        onBackToLogin={() => setIsForgotPassword(false)} // Pass the function to navigate back
      />
    );
  }

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Appointment Management System</Text>
        </View>

        <View style={styles.inputContainer}>
          <Image source={user_icon} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Student No."
            value={StudentNo}
            onChangeText={setStudentNo}
          />
        </View>

        {isRegistering && (
          <View style={styles.inputContainer}>
            <Image source={name_icon} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Name"
              keyboardType="name"
              value={Name}
              onChangeText={setName}
            />
          </View>
        )}

        {isRegistering && (
          <View style={styles.inputContainer}>
            <Image source={email_icon} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        )}

        <View style={styles.inputContainer}>
          <Image source={password_icon} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {!isRegistering && (
          <TouchableOpacity onPress={() => setIsForgotPassword(true)}>
            <Text style={styles.forgotPassword}>
              Forgot Password? <Text style={styles.clickHere}>Click Here!</Text>
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>
            {isRegistering ? 'Register' : 'Log in'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
          <Text style={styles.switchMode}>
            {isRegistering ? 'Already have an account? Log in' : "Don't have an account? Register"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile">
          {({ navigation }) => (  // Access navigation prop here
            <ProfileScreen
              navigation={navigation}  // Pass navigation to ProfileScreen
              name={Name}
              age={Age}
              birthday={Birthday}
              onProfileUpdate={handleProfileUpdate}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="Settings">
          {() => <SettingsScreen onLogout={handleLogout} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  // Add your styles here
  container: {
    backgroundColor: '#C8A4D4',
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 100,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    justifyContent: 'space-between',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 0,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 20,
    margin: 10,
    color: '#007BFF',
  },
  switchMode: {
    marginTop: 10,
    color: '#007BFF',
  },
  clickHere: {
    fontWeight: 'bold',
  },
});

export default Apps;

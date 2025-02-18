import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#090C08');

  // Function to sign in anonymously
  const signInUser = () => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then((userCredential) => {
        const userId = userCredential.user.uid;
        navigation.navigate('Chat', { userId, name, color }); // Navigate after login
      })
      .catch(error => {
        console.error("Error signing in anonymously:", error);
      });
  };

  return (
    <ImageBackground 
      source={require('../assets/background-image.png')}
      style={styles.container}
    >
      <Text style={styles.title}>Co-Nekt</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        placeholderTextColor="#000000"
        onChangeText={setName}
        value={name}
      />
      
      <Text style={styles.label}>Choose Background Color</Text>

      <View style={styles.colorOptions}>
        {['#090C08', '#474056', '#8A95A5', '#B9C6AE'].map((bgColor) => (
          <TouchableOpacity
            key={bgColor}
            style={[styles.colorButton, { backgroundColor: bgColor }]}
            onPress={() => setColor(bgColor)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={signInUser}>
        <Text style={styles.buttonText}>Start Chatting</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 40,
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#000000',
  },
  label: {
    fontSize: 16,
    fontWeight: '300',
    color: '#000000',
    marginBottom: 10,
  },
  colorOptions: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  colorButton: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 25,
  },
  button: {
    backgroundColor: '#757083',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default Start;


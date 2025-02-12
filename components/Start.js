import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');  // Stores the user's name input
  const [color, setColor] = useState('#090C08'); // Default background color

  // Function to navigate to the Chat screen with the user's name and chosen color
  const handleStartChat = () => {
    if (name) {
      navigation.navigate('Chat', { name, color });
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/background-image.png')}  // Background image
      style={styles.container}
    >
      <Text style={styles.title}>Co-Nekt</Text>
      
      {/* Text input for the user to enter their name */}
      <TextInput
        style={styles.input}
        placeholder="Your Name"  // Placeholder text inside the input field
        placeholderTextColor="#000000"  // Darker placeholder color
        onChangeText={setName}  // Updates the name state when the user types
        value={name}  // Binds input value to the state
      />
      
      {/* Label for background color selection */}
      <Text style={styles.label}>Choose Background Color</Text>
      
      <View style={styles.colorOptions}>
        {/* Render color options for the user to choose */}
        {['#090C08', '#474056', '#8A95A5', '#B9C6AE'].map((bgColor) => (
          <TouchableOpacity
            key={bgColor}
            style={[styles.colorButton, { backgroundColor: bgColor }]}  // Dynamic button color
            onPress={() => setColor(bgColor)}  // Updates the selected background color
          />
        ))}
      </View>
      
      {/* Button to start the chat and navigate to the Chat screen */}
      <TouchableOpacity style={styles.button} onPress={handleStartChat}>
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
    padding: 20,  // Padding for the whole screen content
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',  // White title color
    marginBottom: 40,  // Spacing below the title
  },
  input: {
    height: 50,
    width: '80%',  // Input field width
    borderColor: '#000000',  // Black border for visibility
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,  // Spacing below the input
    color: '#000000',  // Black text inside the input field
  },
  label: {
    fontSize: 16,
    fontWeight: '300',
    color: '#000000',  // Dark text color for better visibility
    marginBottom: 10,  // Spacing below the label
  },
  colorOptions: {
    flexDirection: 'row',  // Align color buttons horizontally
    marginBottom: 20,  // Spacing below the color buttons
  },
  colorButton: {
    width: 50,
    height: 50,
    margin: 5,  // Margin between color buttons
    borderRadius: 25,  // Round shape for color buttons
  },
  button: {
    backgroundColor: '#757083',  // Button background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,  // Rounded corners for the button
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',  // White text color for the button
  },
});

export default Start;

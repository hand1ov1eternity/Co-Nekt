import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
  const { name, color } = route.params;

  // Set the navigation bar title dynamically based on the name
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, [name, navigation]);

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text style={styles.title}>Chat Room</Text>
      <Text style={styles.welcome}>Welcome, {name}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 40,
  },
  welcome: {
    fontSize: 20,
    fontWeight: '300',
    color: '#FFFFFF',
  },
});

export default Chat;

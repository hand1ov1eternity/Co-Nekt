import { useState, useEffect } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
  const [messages, setMessages] = useState([]);
  const { userId, name, color } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });

    // Create a query to fetch messages sorted by createdAt in descending order
    const messagesQuery = query(collection(db, "messages"), orderBy("createdAt", "desc"));

    // Set up Firestore real-time listener
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messagesList = snapshot.docs.map(doc => {
        const data = doc.data();
        
        // Check if createdAt is valid and use a fallback if it's null or undefined
        const createdAt = data.createdAt ? data.createdAt.toDate() : new Date();  // Default to current time if null

        return {
          _id: doc.id,
          ...data,
          createdAt: createdAt,  // Ensure createdAt is a valid Date
        };
      });
      setMessages(messagesList);
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, [db, name, navigation]);

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), {
      ...newMessages[0], 
      createdAt: serverTimestamp(), // Ensure Firestore stores a proper timestamp
      user: {
        _id: userId, // Attach the logged-in user ID
        name: name,  // Attach the user's name
      }
    });
  };

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: "#000" },
        left: { backgroundColor: "#FFF" },
      }}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{
          _id: userId, // The logged-in user's ID
          name: name,  // The user's chosen name
        }}
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;


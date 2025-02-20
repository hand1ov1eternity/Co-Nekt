import { useState, useEffect } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => {
  const [messages, setMessages] = useState([]);
  const { userId, name, color } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });

    let unsubscribe;

    const loadCachedMessages = async () => {
      try {
        const cachedMessages = await AsyncStorage.getItem("messages");
        if (cachedMessages) {
          setMessages(JSON.parse(cachedMessages));
        }
      } catch (error) {
        console.error("Failed to load messages from cache:", error);
      }
    };

    if (isConnected) {
      const messagesQuery = query(collection(db, "messages"), orderBy("createdAt", "desc"));

      unsubscribe = onSnapshot(messagesQuery, async (snapshot) => {
        const messagesList = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            _id: doc.id,
            ...data,
            createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
          };
        });

        setMessages(messagesList);

        try {
          await AsyncStorage.setItem("messages", JSON.stringify(messagesList));
        } catch (error) {
          console.error("Failed to cache messages:", error);
        }
      });
    } else {
      loadCachedMessages();
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [db, isConnected, name, navigation]);

  const onSend = (newMessages) => {
    if (isConnected) {
      addDoc(collection(db, "messages"), {
        ...newMessages[0], 
        createdAt: serverTimestamp(),
        user: {
          _id: userId,
          name: name,
        }
      });
    } else {
      alert("You're offline. Messages will be sent when you're back online.");
    }
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

  // Hide InputToolbar when offline
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar} // 👈 Prevents message input when offline
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userId,
          name: name,
        }}
      />
      {Platform.OS === "android" ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;

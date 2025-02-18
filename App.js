// Import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";

// Import React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACzESW9stcD12CWoUgAi-lrbWjnYSEYyE",
  authDomain: "co-nekt-618d6.firebaseapp.com",
  projectId: "co-nekt-618d6",
  storageBucket: "co-nekt-618d6.firebasestorage.app",
  messagingSenderId: "583309676491",
  appId: "1:583309676491:web:74c841a95c46e69a3a304e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat {...props} db={db} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

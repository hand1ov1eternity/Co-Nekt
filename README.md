# Co-Nekt

Co-Nekt is a React Native chat application built using Expo and Firebase. The app allows users to chat in real-time, share images, and send their location. It supports offline functionality by caching messages locally and reconnecting to Firebase when the network is restored.

## Features

- Anonymous authentication using Firebase Auth
- Real-time chat powered by Firestore
- Offline support with AsyncStorage
- Image sharing via Firebase Storage
- Location sharing with react-native-maps
- Customizable chat background colors
- Network status detection with @react-native-community/netinfo

## Tech Stack

- React Native (Expo)
- Firebase (Auth, Firestore, Storage)
- React Navigation
- Gifted Chat
- AsyncStorage

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/hand1ov1eternity/co-nekt.git
   cd co-nekt
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the Expo development server:
   ```
   npx expo start
   ```

## Firebase Setup

This project uses Firebase for authentication, database, and storage. To use it, follow these steps:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable Authentication (Anonymous Sign-in).
3. Set up Firestore Database in test mode.
4. Enable Firebase Storage for image uploads.
5. Replace the `firebaseConfig` in `App.js` with your Firebase credentials.

## Usage

1. Run the app using Expo on a physical device or emulator.
2. Enter your name and select a background color.
3. Click "Start Chatting" to navigate to the chat screen.
4. Send messages, share images, and send your location.


## Contributing

If you want to contribute:
- Fork the repository
- Create a new branch (`git checkout -b feature-branch`)
- Commit your changes (`git commit -m "Add new feature"`)
- Push to the branch (`git push origin feature-branch`)
- Open a pull request

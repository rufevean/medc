
"use client";

import React, { useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebaseui/dist/firebaseui.css'; // Import FirebaseUI CSS
import * as firebaseui from 'firebaseui'; // Import FirebaseUI correctly

import firebaseConfig from '../../../fb.js';

// Initialize Firebase app and authentication
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const ui = new firebaseui.auth.AuthUI(auth);

const AuthComponent = () => {
  useEffect(() => {
    // Ensure this code runs only on the client side
    if (typeof window !== 'undefined') {
      const uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: async (authResult, redirectUrl) => {
            const email = authResult.user.email;
            const userExists = await checkUserExists(email);
            if (userExists) {
              // Redirect to existing user component
              window.location.assign('/existingUserComponent');
            } else {
              // Continue with default sign-in success behavior
              return true;
            }
          },
          uiShown: () => {
            document.getElementById('loader').style.display = 'none';
          }
        },
        signInFlow: 'popup',
        signInSuccessUrl: '/dispenser',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        tosUrl: '<your-tos-url>',
        privacyPolicyUrl: '<your-privacy-policy-url>'
      };

      // Render FirebaseUI Auth interface
      ui.start('#firebaseui-auth-container', uiConfig);
    }
  }, []);

  return (
    <div>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
    </div>
  );
};

// Function to check if a user exists with the provided email
const checkUserExists = async (email) => {
  try {
    const signInMethods = await auth.fetchSignInMethodsForEmail(email);
    // If signInMethods is not empty, it means user exists
    return signInMethods.length > 0;
  } catch (error) {
    console.error('Error checking user existence:', error);
    // Handle error appropriately, e.g., show error message to user
    return false; // Assume user doesn't exist in case of error
  }
};

export default AuthComponent;

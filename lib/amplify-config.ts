"use client";

console.log("🔥🔥🔥 AMPLIFY CONFIG FILE IS RUNNING 🔥🔥🔥");

import { Amplify } from "aws-amplify";


console.log("Pool ID:", process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID);
console.log("Client ID:", process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID);

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
    },
  },
});
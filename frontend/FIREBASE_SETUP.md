# Firebase Authentication Setup Guide

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard to create your project

## Step 2: Enable Email/Password Authentication

1. In your Firebase project, go to **Authentication** in the left sidebar
2. Click on **Get Started** (if first time)
3. Go to the **Sign-in method** tab
4. Click on **Email/Password**
5. Enable the **Email/Password** provider
6. Click **Save**

## Step 3: Register Your Web App

1. In the Firebase Console, click the **gear icon** next to "Project Overview"
2. Select **Project settings**
3. Scroll down to **Your apps** section
4. Click the **Web icon** (</>)
5. Register your app with a nickname (e.g., "Pizza Ordering App")
6. **Copy the Firebase configuration object**

## Step 4: Update Environment Variables

1. Open `/frontend/.env.local` file
2. Replace the placeholder values with your actual Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

## Step 5: Restart Development Server

```bash
npm run dev
```

## Features Enabled

✅ **Email/Password Registration** - Users can sign up with email and password
✅ **Email/Password Login** - Users can log in with their credentials  
✅ **Auto Sign-in** - Users stay logged in across sessions
✅ **Logout** - Users can securely log out
✅ **Error Handling** - User-friendly error messages for common issues

## Optional: Enable Google Sign-In (Future Enhancement)

1. In Firebase Console > Authentication > Sign-in method
2. Click on **Google**
3. Enable the provider
4. Add your support email
5. Update the code to add Google sign-in button

## Security Rules (Optional)

For production, consider adding Firebase Security Rules for Firestore/Storage if you plan to use them.

## Testing

1. Go to `http://localhost:3000/register`
2. Create a new account with email and password
3. You should be automatically logged in and redirected to home page
4. Check Firebase Console > Authentication > Users to see the new user

## Troubleshooting

- **"Firebase: Error (auth/configuration-not-found)"** - Check that all environment variables are set correctly
- **"Firebase: Error (auth/invalid-api-key)"** - Verify your API key in .env.local
- **Build errors** - Make sure to restart the dev server after adding environment variables
- **Users not appearing in Firebase** - Check that Email/Password authentication is enabled in Firebase Console

## Important Notes

⚠️ Never commit `.env.local` to version control (it's in .gitignore)
⚠️ The environment variables must start with `NEXT_PUBLIC_` to be accessible in the browser
⚠️ Restart the dev server whenever you change environment variables

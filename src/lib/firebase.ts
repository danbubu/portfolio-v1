import { getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

// TODO(Daniel): confirm what the Firestore messages write is for.
// The public web config is read from Vite env at build time. Nothing new is hard-coded here.

function readConfig() {
	return {
		apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string | undefined,
		authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
		projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined,
		storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
		messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
		appId: import.meta.env.VITE_FIREBASE_APP_ID as string | undefined
	};
}

export function firebaseConfigured(): boolean {
	const config = readConfig();
	return Boolean(config.apiKey && config.projectId && config.appId);
}

export function getDb(): Firestore | null {
	if (!firebaseConfigured()) return null;
	const config = readConfig();
	const existing = getApps()[0] as FirebaseApp | undefined;
	const app = existing ?? initializeApp(config);
	return getFirestore(app);
}

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

/**
 * Configuration for the Angular application, including various providers for routing, Firebase services, and client-side hydration.
 *
 * This configuration is used to initialize Angular services, set up routing, and integrate Firebase services for authentication and Firestore.
 * 
 * @constant {ApplicationConfig} appConfig
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * Provides Zone.js change detection, which ensures automatic change detection in Angular when asynchronous events occur.
     * 
     * @param {object} options - Configuration options for zone change detection.
     * @param {boolean} options.eventCoalescing - Flag to enable or disable event coalescing.
     */
    provideZoneChangeDetection({ eventCoalescing: true }),

    /**
     * Provides routing configuration for the Angular application.
     * 
     * @see {@link routes} for the list of routes defined in the application.
     */
    provideRouter(routes),

    /**
     * Provides client-side hydration for better performance during initial page load.
     * It also enables event replaying for smooth user interaction on the client side.
     * 
     * @see {@link withEventReplay} for more details on how event replay works.
     */
    provideClientHydration(withEventReplay()),

    /**
     * Initializes Firebase with the specified configuration and provides Firebase services.
     * 
     * @param {Function} initializeApp - Function to initialize Firebase app with the provided configuration.
     * @param {object} config - Firebase configuration object.
     * @param {string} config.projectId - Firebase project ID.
     * @param {string} config.appId - Firebase app ID.
     * @param {string} config.storageBucket - Firebase storage bucket.
     * @param {string} config.apiKey - Firebase API key.
     * @param {string} config.authDomain - Firebase auth domain.
     * @param {string} config.messagingSenderId - Firebase messaging sender ID.
     */
    provideFirebaseApp(() => initializeApp({
      projectId: "join-52e31",
      appId: "1:290584592371:web:a52999eaaabf744119dc86",
      storageBucket: "join-52e31.firebasestorage.app",
      apiKey: "AIzaSyCQy7vwff4IXLJGmuVv8k_hgDdYTTx2tpE",
      authDomain: "join-52e31.firebaseapp.com",
      messagingSenderId: "290584592371"
    })),

    /**
     * Provides Firebase Authentication service for user authentication.
     * 
     * @see {@link getAuth} for Firebase Authentication methods.
     */
    provideAuth(() => getAuth()),

    /**
     * Provides Firebase Firestore service to interact with the Firestore database.
     * 
     * @see {@link getFirestore} for Firebase Firestore methods.
     */
    provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({ projectId: "join-77ccf", appId: "1:742793083923:web:34265575198c48ac3053e6", storageBucket: "join-77ccf.firebasestorage.app", apiKey: "AIzaSyAaPMKgXvIfY-aUFNYhyIWXWdZkmTk3coU", authDomain: "join-77ccf.firebaseapp.com", messagingSenderId: "742793083923" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
};

const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config();

// Firebase initialization
let firebaseApp = null;
let firestoreDb = null;

const initializeFirebase = () => {
  try {
    // Check if Firebase is already initialized
    if (admin.apps.length > 0) {
      firestoreDb = admin.firestore();
      console.log('✅ Firebase/Firestore already initialized');
      return firestoreDb;
    }

    // Initialize Firebase Admin SDK
    // Try to get credentials from multiple sources
    let serviceAccount;

    // First try environment variable
    if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
      try {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
      } catch (e) {
        console.error('⚠️  Could not parse FIREBASE_SERVICE_ACCOUNT_JSON from environment');
      }
    }

    // Then try to load from file
    if (!serviceAccount) {
      try {
        serviceAccount = require('./firebase-service-account.json');
      } catch (e) {
        console.error('⚠️  firebase-service-account.json not found');
      }
    }

    // If we have credentials, initialize
    if (serviceAccount) {
      firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: serviceAccount.project_id || process.env.FIREBASE_PROJECT_ID
      });

      firestoreDb = admin.firestore();
      console.log('✅ Firebase/Firestore initialized successfully');
      return firestoreDb;
    } else {
      console.warn('⚠️  Firebase credentials not found. Firebase features will be unavailable.');
      console.log('📝 To enable Firebase:');
      console.log('   1. Download service account JSON from Firebase Console');
      console.log('   2. Save as backend/firebase-service-account.json');
      console.log('   3. Or set FIREBASE_SERVICE_ACCOUNT_JSON environment variable');
      return null;
    }
  } catch (error) {
    console.error('⚠️  Firebase initialization error:', error.message);
    return null;
  }
};

// Get Firestore instance
const getFirestore = () => {
  if (!firestoreDb) {
    return initializeFirebase();
  }
  return firestoreDb;
};

// Save quote to Firestore
const saveQuoteToFirebase = async (quoteData) => {
  try {
    const db = getFirestore();
    
    if (!db) {
      console.warn('⚠️  Firestore not available, quote data prepared but not persisted');
      return { 
        firestoreId: null, 
        warning: 'Firebase not configured',
        dataPrepared: true
      };
    }

    // Add quote to 'quotes' collection with auto-generated ID
    const docRef = await db.collection('quotes').add({
      ...quoteData,
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now()
    });
    
    console.log(`✅ Quote saved to Firestore with ID: ${docRef.id}`);
    return { firestoreId: docRef.id };
  } catch (error) {
    console.error('❌ Error saving quote to Firestore:', error);
    throw error;
  }
};

// Retrieve quotes from Firestore (for admin dashboard)
const getQuotesFromFirebase = async (limit = 100) => {
  try {
    const db = getFirestore();
    
    if (!db) {
      throw new Error('Firestore not available');
    }

    const snapshot = await db.collection('quotes')
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get();

    const quotes = [];
    snapshot.forEach((doc) => {
      quotes.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return quotes;
  } catch (error) {
    console.error('❌ Error retrieving quotes from Firestore:', error);
    throw error;
  }
};

// Get single quote from Firestore
const getQuoteFromFirebase = async (quoteId) => {
  try {
    const db = getFirestore();
    
    if (!db) {
      throw new Error('Firestore not available');
    }

    const doc = await db.collection('quotes').doc(quoteId).get();
    
    if (!doc.exists) {
      return null;
    }

    return {
      id: doc.id,
      ...doc.data()
    };
  } catch (error) {
    console.error('❌ Error retrieving quote from Firestore:', error);
    throw error;
  }
};

// Update quote status in Firestore
const updateQuoteStatus = async (quoteId, status, notes = null) => {
  try {
    const db = getFirestore();
    
    if (!db) {
      throw new Error('Firestore not available');
    }

    const updateData = {
      status: status,
      updatedAt: admin.firestore.Timestamp.now()
    };

    if (notes) {
      updateData.notes = notes;
    }

    await db.collection('quotes').doc(quoteId).update(updateData);
    
    console.log(`✅ Quote ${quoteId} status updated to: ${status}`);
    return { success: true, status };
  } catch (error) {
    console.error('❌ Error updating quote status:', error);
    throw error;
  }
};

// Delete quote from Firestore (admin only)
const deleteQuoteFromFirebase = async (quoteId) => {
  try {
    const db = getFirestore();
    
    if (!db) {
      throw new Error('Firestore not available');
    }

    await db.collection('quotes').doc(quoteId).delete();
    
    console.log(`✅ Quote ${quoteId} deleted from Firestore`);
    return { success: true };
  } catch (error) {
    console.error('❌ Error deleting quote:', error);
    throw error;
  }
};

// Query quotes by email (for customer follow-up)
const getQuotesByEmail = async (email) => {
  try {
    const db = getFirestore();
    
    if (!db) {
      throw new Error('Firestore not available');
    }

    const snapshot = await db.collection('quotes')
      .where('email', '==', email)
      .orderBy('createdAt', 'desc')
      .get();

    const quotes = [];
    snapshot.forEach((doc) => {
      quotes.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return quotes;
  } catch (error) {
    console.error('❌ Error querying quotes by email:', error);
    throw error;
  }
};

module.exports = {
  initializeFirebase,
  getFirestore,
  saveQuoteToFirebase,
  getQuotesFromFirebase,
  getQuoteFromFirebase,
  updateQuoteStatus,
  deleteQuoteFromFirebase,
  getQuotesByEmail
};

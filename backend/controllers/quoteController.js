const { v4: uuidv4 } = require('uuid');
const { saveQuoteToFirebase, getQuoteFromFirebase, updateQuoteStatus, getQuotesByEmail } = require('../firebase-config');

// Submit a new quote request
const submitQuote = async (req, res) => {
  try {
    const { name, email, phone, company, message } = req.body;

    // Create quote object
    const quoteData = {
      localId: uuidv4(),
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : '',
      company: company.trim(),
      projectDetails: message.trim(),
      status: 'pending', // pending, reviewed, contacted, converted
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sourceIP: req.ip,
      userAgent: req.get('user-agent')
    };

    console.log(`📝 Processing quote for: ${quoteData.email}`);

    // Save to Firebase Firestore
    let firestoreId = null;
    try {
      const result = await saveQuoteToFirebase(quoteData);
      firestoreId = result.firestoreId;
      if (firestoreId) {
        console.log(`✅ Quote saved to Firestore with ID: ${firestoreId}`);
      }
    } catch (firebaseError) {
      console.error('⚠️  Firebase error:', firebaseError.message);
      // Continue anyway - we have the local data
    }

    // Return success response
    res.status(201).json({
      status: 'success',
      message: 'Quote request submitted successfully',
      data: {
        quoteId: firestoreId || quoteData.localId,
        email: quoteData.email,
        company: quoteData.company,
        submittedAt: quoteData.createdAt,
        firebaseId: firestoreId
      }
    });

    console.log(`✅ New quote submitted - Email: ${quoteData.email}, Status: pending`);
  } catch (error) {
    console.error('❌ Error submitting quote:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to submit quote request',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Get quote details by ID
const getQuote = async (req, res) => {
  try {
    const { quoteId } = req.params;

    if (!quoteId) {
      return res.status(400).json({
        status: 'error',
        message: 'Quote ID is required'
      });
    }

    // Try to get from Firestore
    let quote = null;
    try {
      quote = await getQuoteFromFirebase(quoteId);
    } catch (firebaseError) {
      console.warn('Firebase lookup warning:', firebaseError.message);
    }

    if (quote) {
      return res.status(200).json({
        status: 'success',
        message: 'Quote retrieved successfully',
        data: quote
      });
    }

    res.status(404).json({
      status: 'error',
      message: 'Quote not found'
    });
  } catch (error) {
    console.error('❌ Error retrieving quote:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve quote',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Get quotes by email
const getQuotesByEmailAddress = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        status: 'error',
        message: 'Email is required'
      });
    }

    try {
      const quotes = await getQuotesByEmail(email);
      
      return res.status(200).json({
        status: 'success',
        message: 'Quotes retrieved successfully',
        data: quotes,
        count: quotes.length
      });
    } catch (firebaseError) {
      console.warn('Firebase query warning:', firebaseError.message);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve quotes'
      });
    }
  } catch (error) {
    console.error('❌ Error retrieving quotes by email:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve quotes',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Update quote status (admin endpoint)
const updateQuote = async (req, res) => {
  try {
    const { quoteId } = req.params;
    const { status, notes } = req.body;

    const validStatuses = ['pending', 'reviewed', 'contacted', 'converted'];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    // Update in Firebase
    try {
      await updateQuoteStatus(quoteId, status, notes);
      
      res.status(200).json({
        status: 'success',
        message: 'Quote status updated successfully',
        data: {
          quoteId: quoteId,
          status: status,
          updatedAt: new Date().toISOString()
        }
      });

      console.log(`✅ Quote ${quoteId} status updated to: ${status}`);
    } catch (firebaseError) {
      return res.status(500).json({
        status: 'error',
        message: 'Failed to update quote in Firebase',
        error: process.env.NODE_ENV === 'development' ? firebaseError.message : 'Internal server error'
      });
    }
  } catch (error) {
    console.error('❌ Error updating quote:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update quote',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

module.exports = {
  submitQuote,
  getQuote,
  getQuotesByEmailAddress,
  updateQuote
};

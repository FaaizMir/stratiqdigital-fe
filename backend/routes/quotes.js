const express = require('express');
const router = express.Router();
const { submitQuote, getQuote, updateQuote, getQuotesByEmailAddress } = require('../controllers/quoteController');
const { validateQuoteSubmission, handleValidationErrors } = require('../middleware/validation');

/**
 * POST /api/quotes
 * Submit a new quote request
 * Body: { name, email, phone?, company, message }
 */
router.post('/', validateQuoteSubmission, handleValidationErrors, submitQuote);

/**
 * GET /api/quotes/search/email?email=user@example.com
 * Get all quotes by email address
 */
router.get('/search/email', getQuotesByEmailAddress);

/**
 * GET /api/quotes/:quoteId
 * Get details of a specific quote
 */
router.get('/:quoteId', getQuote);

/**
 * PUT /api/quotes/:quoteId
 * Update quote status
 * Body: { status, notes? }
 * Valid statuses: pending, reviewed, contacted, converted
 */
router.put('/:quoteId', updateQuote);

module.exports = router;

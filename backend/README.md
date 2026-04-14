# Stratiq Digital Backend API

Complete Node.js backend for handling quote submissions and form data from the Stratiq Digital landing page.

## Features

- ✅ Express.js REST API
- ✅ Form validation with express-validator
- ✅ Firebase Realtime Database integration (ready)
- ✅ CORS enabled for frontend communication
- ✅ Error handling middleware
- ✅ UUID-based quote tracking
- ✅ Comprehensive logging
- ✅ Environment-based configuration

## Project Structure

```
backend/
├── server.js                 # Main Express server
├── package.json             # Dependencies
├── .env.example             # Environment variables template
├── .gitignore              # Git ignore rules
├── firebase-config.js      # Firebase configuration
├── middleware/
│   └── validation.js       # Form validation rules
├── controllers/
│   └── quoteController.js  # Business logic
└── routes/
    └── quotes.js           # API routes
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
```

## Firebase Setup (When Ready)

1. Get your Firebase service account JSON from Firebase Console
2. Either:
   - Save it as `firebase-service-account.json` in the root of the backend folder, OR
   - Set the `FIREBASE_SERVICE_ACCOUNT_JSON` environment variable

The backend will work without Firebase initially and will persist data once Firebase is configured.

## Running the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### 1. Submit Quote Request
**POST** `/api/quotes`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Example Corp",
  "message": "We need to source 1000 units of custom widgets"
}
```

**Response (Success):**
```json
{
  "status": "success",
  "message": "Quote request submitted successfully",
  "data": {
    "quoteId": "uuid-here",
    "firestoreId": "firebase-id",
    "email": "john@example.com",
    "company": "Example Corp",
    "submittedAt": "2024-04-14T10:30:00.000Z"
  }
}
```

**Response (Error - Validation):**
```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

### 2. Get Quote Details
**GET** `/api/quotes/:quoteId`

### 3. Update Quote Status
**PUT** `/api/quotes/:quoteId`

**Request Body:**
```json
{
  "status": "reviewed"
}
```

**Valid Statuses:** `pending`, `reviewed`, `contacted`, `converted`

### 4. Health Check
**GET** `/api/health`

**Response:**
```json
{
  "status": "success",
  "message": "Backend is running",
  "timestamp": "2024-04-14T10:30:00.000Z"
}
```

## Frontend Integration

Update your frontend API calls to hit the backend:

```javascript
// Example with fetch
const submitQuote = async (formData) => {
  const response = await fetch('http://localhost:5000/api/quotes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  });
  
  return response.json();
};
```

## Validation Rules

- **name**: Required, 2-100 characters, letters/spaces/hyphens/apostrophes only
- **email**: Required, valid email format
- **phone**: Optional, valid phone number format
- **company**: Required, 2-150 characters
- **message**: Required, 10-2000 characters

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 5000 | Server port |
| NODE_ENV | development | Environment mode |
| FRONTEND_URL | http://localhost:3000 | Frontend URL for CORS |
| FIREBASE_PROJECT_ID | - | Firebase project ID |
| FIREBASE_PRIVATE_KEY | - | Firebase private key |
| FIREBASE_CLIENT_EMAIL | - | Firebase client email |
| FIREBASE_DATABASE_URL | - | Firebase Realtime DB URL |

## Error Handling

All endpoints return structured error responses:

```json
{
  "status": "error",
  "message": "Error description",
  "errors": [] // If validation errors
}
```

## Development Tips

- Check backend logs for debugging
- Use tools like Postman or Thunder Client to test endpoints
- CORS is configured to accept requests from the frontend
- All timestamps are in ISO 8601 format

## Next Steps

1. ✅ Backend structure complete
2. ⏳ Update frontend to call `http://localhost:5000/api/quotes`
3. ⏳ Configure Firebase credentials
4. ⏳ Add email notifications (optional)
5. ⏳ Build admin dashboard for quote management

## Notes

- The backend works without Firebase initially
- All submitted quotes will be prepared for Firebase integration
- Security headers and rate limiting can be added later
- Add authentication for admin endpoints when building dashboard

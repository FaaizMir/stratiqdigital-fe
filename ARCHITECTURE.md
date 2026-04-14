# System Architecture & Data Flow

## Complete System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    STRATIQ DIGITAL SYSTEM OVERVIEW                       │
└─────────────────────────────────────────────────────────────────────────┘

                          INTERNET / USERS
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │ NEXT.JS FRONTEND (3000)  │
                    │ ─────────────────────── │
                    │ • Landing Page          │
                    │ • Quote Modal           │
                    │ • Form Validation       │
                    │ • Success/Error UI      │
                    └──────────────┬───────────┘
                                  │
                    ┌─────────────▼──────────────┐ CORS Enabled
                    │ Network Request            │ (Cross-origin)
                    │ POST /api/quotes           │
                    └─────────────┬──────────────┘
                                  │
                    ┌─────────────▼───────────────────┐
                    │ NODE.JS BACKEND (PORT 5000)     │
                    │ ────────────────────────────    │
                    │                                 │
                    │ ┌────────────────────────────┐ │
                    │ │ Express Server             │ │
                    │ │ • CORS Middleware          │ │
                    │ │ • JSON Parser              │ │
                    │ │ • Error Handler            │ │
                    │ └────────────────────────────┘ │
                    │           │                    │
                    │ ┌─────────▼──────────────────┐  │
                    │ │ Route Handler              │  │
                    │ │ POST /api/quotes           │  │
                    │ └────────┬───────────────────┘  │
                    │          │                     │
                    │ ┌────────▼──────────────────┐  │
                    │ │ Validation Middleware      │  │
                    │ │ • Name validation          │  │
                    │ │ • Email validation         │  │
                    │ │ • Phone validation         │  │
                    │ │ • Company validation       │  │
                    │ │ • Message validation       │  │
                    │ └────────┬───────────────────┘  │
                    │          │                     │
                    │ ┌────────▼──────────────────┐  │
                    │ │ Quote Controller           │  │
                    │ │ • Generate UUID            │  │
                    │ │ • Create quote object      │  │
                    │ │ • Prepare for Firebase     │  │
                    │ └────────┬───────────────────┘  │
                    │          │                     │
                    │          │ (Optional: Firebase) │
                    │          │                     │
                    │ ┌────────▼──────────────────┐  │
                    │ │ Firebase Config            │  │
                    │ │ • Check if configured      │  │
                    │ │ • Save to database         │  │
                    │ │ • Return Firebase ID       │  │
                    │ └────────┬───────────────────┘  │
                    │          │                     │
                    │ ┌────────▼──────────────────┐  │
                    │ │ Response Builder           │  │
                    │ │ • Status: success/error    │  │
                    │ │ • Quote ID                 │  │
                    │ │ • Timestamp                │  │
                    │ └────────┬───────────────────┘  │
                    │          │                     │
                    └─────────┬┴──────────────────────┘
                              │
                    ┌─────────▼──────────────┐
                    │ HTTP Response (JSON)   │
                    │ {                      │
                    │   status: "success",   │
                    │   data: {              │
                    │     quoteId: "...",    │
                    │     email: "...",      │
                    │     submittedAt: "..." │
                    │   }                    │
                    │ }                      │
                    └─────────┬──────────────┘
                              │
                    ┌─────────▼──────────────────┐
                    │ Frontend Handler           │
                    │ • Show success message     │
                    │ • Auto-close modal         │
                    │ • Clear form               │
                    └────────────────────────────┘
```

---

## Request-Response Flow

### Quote Submission Journey

```
Step 1: User Interaction
├─ User opens landing page
├─ User clicks "Get Free Sourcing Quotation"
└─ Modal opens with form (Form ID: name, email, phone, company, message)

Step 2: Frontend Validation
├─ User fills all fields
├─ User clicks "Submit Request"
├─ Browser validates:
│  ├─ Required fields check
│  ├─ Email format check
│  └─ Message length check
└─ If valid, proceed to Step 3

Step 3: Network Request
├─ Frontend builds request body
├─ Frontend shows "Submitting..." state
├─ POST request to http://localhost:5000/api/quotes
├─ Headers: Content-Type: application/json
└─ Body: { name, email, phone, company, message }

Step 4: Backend Processing
├─ Express server receives request
├─ CORS middleware checks origin
├─ JSON parser processes body
├─ Route handler calls validation middleware
│
├─ Validation Middleware:
│  ├─ Name: trim, length check, character validation
│  ├─ Email: format validation, normalization
│  ├─ Phone: optional phone validation
│  ├─ Company: trim, length check
│  ├─ Message: trim, length check
│  └─ If errors, return 400 with validation messages
│
└─ If validation passes, proceed to Step 5

Step 5: Quote Controller
├─ Create quote object with:
│  ├─ UUID (unique quote ID)
│  ├─ All form data (trimmed)
│  ├─ Status: "pending"
│  ├─ Timestamp
│  ├─ Source IP
│  └─ User agent
├─ Call Firebase save (if configured)
│  ├─ Firebase saves quote
│  ├─ Returns Firebase ID (optional)
│  └─ Returns success/warning
└─ Build response object

Step 6: Response Sent
├─ HTTP 201 (Created) status
├─ Response body:
│  ├─ status: "success"
│  ├─ message: "Quote request submitted successfully"
│  └─ data:
│     ├─ quoteId: UUID
│     ├─ firestoreId: Firebase ID (if saved)
│     ├─ email: user@example.com
│     ├─ company: Company Name
│     └─ submittedAt: ISO timestamp
└─ Send response to frontend

Step 7: Frontend Update
├─ Receive 201 response
├─ Show green success message
├─ Stop loading animation
├─ Clear form fields
├─ After 2 seconds:
│  ├─ Close modal
│  └─ Reset to initial state
└─ User can submit another quote

Success! Quote stored and ready for Firebase/Admin review.
```

---

## File Processing Flow

```
┌─────────────────────────────────────────┐
│ Frontend Request                         │
│ POST to /api/quotes                      │
└────────────────┬────────────────────────┘
                 │
         ┌───────▼────────┐
         │ server.js      │
         │ (Express App)  │
         └───────┬────────┘
                 │
      ┌──────────┴──────────┐
      │                     │
      ▼                     ▼
 ┌─────────┐         ┌─────────────┐
 │ routes/ │         │ middleware/ │
 │quotes.js│         │validation.js│
 └────┬────┘         └─────────────┘
      │
      ▼
 ┌──────────────────┐
 │ controllers/     │
 │quoteController.js│
 └────────┬─────────┘
          │
      ┌───┴────────────┐
      │                │
      ▼                ▼
  ┌────────────┐  ┌──────────────┐
  │ config.js  │  │firebase-     │
  │            │  │config.js     │
  └────────────┘  └──────────────┘
      │                │
      └────────┬───────┘
               │
         ┌─────▼──────┐
         │ Response   │
         │ to Client  │
         └────────────┘
```

---

## API Contract

### Request Structure

```
POST /api/quotes HTTP/1.1
Host: localhost:5000
Content-Type: application/json
Origin: http://localhost:3000

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 123-4567",
  "company": "Acme Corporation",
  "message": "We need to source 5000 units of custom widgets. Specifications attached. Timeline: 6 months."
}
```

### Success Response

```
HTTP/1.1 201 Created
Content-Type: application/json
Access-Control-Allow-Origin: http://localhost:3000

{
  "status": "success",
  "message": "Quote request submitted successfully",
  "data": {
    "quoteId": "550e8400-e29b-41d4-a716-446655440000",
    "firestoreId": "firebase-document-id",
    "email": "john@example.com",
    "company": "Acme Corporation",
    "submittedAt": "2024-04-14T10:30:00.000Z"
  }
}
```

### Error Response - Validation

```
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    },
    {
      "field": "message",
      "message": "Please provide at least 10 characters for project details"
    }
  ]
}
```

---

## Component Interaction

```
┌──────────────────────────────────────────────────────────────────┐
│                    FRONTEND COMPONENTS                            │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ HeroSection.js                                              │ │
│  │ ┌──────────────────────────────────────────────────────────┐│ │
│  │ │ Desktop Navbar                    Mobile Navbar          ││ │
│  │ │ [About] [Services] [Logo]         [Logo] [Menu Button]  ││ │
│  │ │         [Projects]               [Get Sourcing Quote]   ││ │
│  │ │ [Get Sourcing Quotation Button]                          ││ │
│  │ └──────────────────────────────────────────────────────────┘│ │
│  │                           │                                 │ │
│  │                    ┌──────▼──────┐                          │ │
│  │ ┌─────────────────▼─────────────┐                          │ │
│  │ │  QuoteButtonModal.jsx          │                         │ │
│  │ │  ┌── Form Component ────────┐ │                          │ │
│  │ │  │ [Name Input]              │ │                         │ │
│  │ │  │ [Email Input]             │ │                         │ │
│  │ │  │ [Phone Input]             │ │                         │ │
│  │ │  │ [Company Input]           │ │                         │ │
│  │ │  │ [Message TextArea]        │ │                         │ │
│  │ │  │ [Submit Button]           │ │                         │ │
│  │ │  └───────────────────────────┘ │                         │ │
│  │ │         │                       │                         │ │
│  │ │    onSubmit()                   │                         │ │
│  │ │         │                       │                         │ │
│  │ │         ▼                       │                         │ │
│  │ │  fetch('/api/quotes', {         │                         │ │
│  │ │    method: 'POST',              │                         │ │
│  │ │    body: formData                │                         │ │
│  │ │  })                              │                         │ │
│  │ │         │                       │                         │ │
│  │ │    Handle Response:              │                         │ │
│  │ │    ├─ Success → Show message    │                         │ │
│  │ │    ├─ Auto-close modal           │                         │ │
│  │ │    └─ Error → Display error      │                         │ │
│  │ │                                 │                         │ │
│  │ └─────────────────────────────────┘                         │ │
│  │                                                             │ │
│  └─────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
                            │
                  Network Request (HTTP)
                            │
         ┌──────────────────▼───────────────────┐
         │    BACKEND SERVER (Port 5000)       │
         │  ┌──────────────────────────────┐   │
         │  │ Express App (server.js)       │   │
         │  │ • CORS Middleware             │   │
         │  │ • Body Parser                 │   │
         │  │ • Error Handler               │   │
         │  └──────────┬────────────────────┘   │
         │             │                        │
         │  ┌──────────▼────────────────────┐   │
         │  │ Route: /api/quotes (quotes.js) │   │
         │  │ validateQuoteSubmission        │   │
         │  │ handleValidationErrors         │   │
         │  │ submitQuote                    │   │
         │  └──────────┬────────────────────┘   │
         │             │                        │
         │  ┌──────────▼────────────────────┐   │
         │  │ Validation Middleware         │   │
         │  │ (middleware/validation.js)    │   │
         │  └──────────┬────────────────────┘   │
         │             │                        │
         │  ┌──────────▼────────────────────┐   │
         │  │ Controller Function            │   │
         │  │ (controllers/quoteController)  │   │
         │  └──────────┬────────────────────┘   │
         │             │                        │
         │  ┌──────────▼────────────────────┐   │
         │  │ Firebase Config                │   │
         │  │ (Optional - if configured)     │   │
         │  └──────────┬────────────────────┘   │
         │             │                        │
         │  ┌──────────▼────────────────────┐   │
         │  │ Return JSON Response           │   │
         │  │ 201 Created with quoteId       │   │
         │  └────────────────────────────────┘   │
         │                                      │
         └──────────────────┬───────────────────┘
                            │
                  Network Response (HTTP)
                            │
┌───────────────────────────▼──────────────────────┐
│ Frontend Receives Response                        │
│ ├─ Parse JSON                                    │
│ ├─ Check status code (201)                       │
│ ├─ Show "Success!" message                       │
│ ├─ Display Quote ID                              │
│ ├─ Clear form fields                             │
│ ├─ Disable submit button                         │
│ └─ Auto-close modal after 2 seconds              │
└────────────────────────────────────────────────────┘
```

---

## Data Persistence Flow

```
Quote Submission → Local Storage → Optional: Firebase Realtime DB

Step 1: Create Quote Object
{
  id: UUID (550e8400-...),
  name: "John Doe",
  email: "john@example.com",
  phone: "+1 (555) 123-4567",
  company: "Acme Corp",
  projectDetails: "Need 5000 units...",
  status: "pending",
  createdAt: "2024-04-14T10:30:00.000Z",
  updatedAt: "2024-04-14T10:30:00.000Z",
  sourceIP: "127.0.0.1",
  userAgent: "Mozilla/5.0..."
}

Step 2: Save Locally (Always)
✓ Quote object created
✓ Timestamp recorded
✓ All info stored in memory/local object
✓ Ready for Firebase

Step 3: Save to Firebase (When Configured)
If FIREBASE_CREDENTIALS exist:
├─ Connect to Firebase Realtime DB
├─ Create quotes/{quoteId}/
├─ Save complete quote object
├─ Return Firebase document ID
└─ Include ID in response

Step 4: Future Access
Via Backend Routes:
├─ GET /api/quotes/:quoteId → Retrieve quote
├─ PUT /api/quotes/:quoteId → Update status
└─ Admin dashboard → View all quotes
```

---

## Error Handling Flow

```
Request arrives → Validation → Processing → Response

Validation Errors (400)
├─ Invalid email format
├─ Missing required field
├─ Text too short/long
└─ Bad phone format
→ Return 400 with error details

Processing Errors (500)
├─ Firebase connection error
├─ Unexpected exception
├─ Server issue
└─ System error
→ Return 500 with generic error message

CORS Errors (No request sent)
├─ Wrong origin
├─ Missing headers
└─ Invalid method
→ Browser blocks request

Success (201)
├─ All validation passed
├─ Quote saved successfully
├─ Firebase saved (if configured)
└─ Return quote data
→ Return 201 with success data
```

---

## Deployment Architecture (Future)

```
┌─────────────────────────────────────────────────┐
│              PRODUCTION SETUP                    │
├─────────────────────────────────────────────────┤
│                                                 │
│  Frontend (Vercel)                              │
│  ├─ Next.js build deployed                      │
│  ├─ https://yourdomain.com                      │
│  ├─ NEXT_PUBLIC_BACKEND_URL=api.yourdomain.com  │
│  └─ CDN served globally                         │
│           │                                     │
│           │ HTTPS/API Request                   │
│           ▼                                     │
│  Backend (Railway/Heroku/VPS)                   │
│  ├─ Node.js app deployed                        │
│  ├─ https://api.yourdomain.com                  │
│  ├─ Database connection configured              │
│  ├─ Firebase credentials loaded                 │
│  └─ Security headers enabled                    │
│           │                                     │
│           ▼                                     │
│  Firebase Realtime Database                     │
│  ├─ All quotes stored                           │
│  ├─ Indexed by date                             │
│  ├─ Status tracking                             │
│  └─ Admin access                                │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

This architecture provides:
- ✅ Clear separation of concerns
- ✅ Scalable structure
- ✅ Easy to understand flow
- ✅ Production-ready design
- ✅ Firebase integration ready

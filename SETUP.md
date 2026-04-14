# Stratiq Digital - Complete Setup Guide

Complete landing page system with Next.js frontend and Node.js backend.

## Project Structure

```
landing page stratiq/
├── my-app/              # Next.js Frontend
│   ├── src/
│   ├── package.json
│   └── .env.example
│
└── backend/             # Node.js API Server
    ├── server.js
    ├── package.json
    ├── .env.example
    └── README.md
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

## Frontend Setup (Next.js)

### 1. Navigate to frontend directory
```bash
cd my-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create environment file
```bash
cp .env.example .env.local
```

### 4. Update .env.local (if backend is on different port)
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

### 5. Start development server
```bash
npm run dev
```

Frontend will be available at: `http://localhost:3000`

## Backend Setup (Node.js)

### 1. Navigate to backend directory
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create environment file
```bash
cp .env.example .env
```

### 4. Update .env with your configuration
```
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 5. Start development server
```bash
npm run dev
```

Backend will be available at: `http://localhost:5000`

## Running Both Together

### Option 1: Two Terminal Windows (Recommended for Development)

**Terminal 1 - Frontend:**
```bash
cd my-app
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```

### Option 2: Using concurrently (in root directory)

1. Install concurrently globally (optional):
```bash
npm install -g concurrently
```

2. From root directory:
```bash
concurrently "cd my-app && npm run dev" "cd backend && npm run dev"
```

## Form Submission Flow

1. User fills out the quote form in the modal
2. Frontend validates the form
3. Frontend sends POST request to `http://localhost:5000/api/quotes`
4. Backend validates the data
5. Backend saves to local storage + Firebase (when configured)
6. Frontend shows success/error message
7. Modal auto-closes after success

## Testing the Backend

### Using Postman or curl

```bash
curl -X POST http://localhost:5000/api/quotes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "company": "Example Corp",
    "message": "We need to source 1000 units of custom widgets"
  }'
```

### Health Check
```bash
curl http://localhost:5000/api/health
```

## Firebase Integration

When ready to add Firebase:

1. Create Firebase project at https://console.firebase.google.com
2. Download service account JSON from Firebase Console
3. Save as `backend/firebase-service-account.json`
4. Update `backend/.env`:
```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
```
5. Backend will automatically start persisting quotes to Firebase

## Common Issues

### Backend not connecting to frontend
- Check CORS configuration in `backend/server.js`
- Ensure `FRONTEND_URL` in backend `.env` matches frontend URL
- Check that both servers are running on correct ports

### Form submission failing
- Check browser console for errors
- Check backend logs for validation errors
- Verify `NEXT_PUBLIC_BACKEND_URL` in frontend `.env.local`

### Database errors
- Ensure Firebase credentials are correct (if using Firebase)
- Check that `.env` files are properly configured
- Backend works without Firebase initially

## Production Deployment

### Frontend (Vercel recommended)
```bash
cd my-app
npm run build
```

### Backend (Heroku, Railway, or VPS)
```bash
cd backend
npm start
```

Update `NEXT_PUBLIC_BACKEND_URL` in frontend to production API URL.

## Next Steps

1. ✅ Frontend and backend are set up
2. ⏳ Test quote form submission
3. ⏳ Configure Firebase when ready
4. ⏳ Set up email notifications
5. ⏳ Create admin dashboard for quote management
6. ⏳ Deploy to production

## Documentation

- **Frontend**: See `my-app/README.md`
- **Backend**: See `backend/README.md`
- **API Docs**: See `backend/README.md` for endpoint details

## Support

For issues or questions, refer to the respective README files in:
- `my-app/` - Frontend documentation
- `backend/` - Backend documentation

## Quick Command Reference

```bash
# Development
npm run dev        # Frontend only
npm run dev        # Backend only (from backend directory)

# Build
npm run build      # Frontend only

# Production
npm start          # Backend only (from backend directory)
npm run build && npm start  # Frontend (Next.js)
```

## Environment Configuration Summary

### Frontend (.env.local)
| Variable | Required | Example |
|----------|----------|---------|
| NEXT_PUBLIC_BACKEND_URL | Yes | http://localhost:5000 |

### Backend (.env)
| Variable | Required | Example |
|----------|----------|---------|
| PORT | No | 5000 |
| NODE_ENV | No | development |
| FRONTEND_URL | Yes | http://localhost:3000 |
| FIREBASE_PROJECT_ID | No* | your-project |

*Firebase is optional but recommended for production

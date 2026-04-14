# ⚡ Quick Start Commands

## One-Time Setup

### Step 1: Install Frontend Dependencies
```bash
cd my-app
npm install
```

### Step 2: Create Frontend Environment File
```bash
cp .env.example .env.local
```

### Step 3: Install Backend Dependencies
```bash
cd ../backend
npm install
```

### Step 4: Create Backend Environment File
```bash
cp .env.example .env
```

## Running the Application

### Terminal 1 - Start Frontend
```bash
cd my-app
npm run dev
```

### Terminal 2 - Start Backend (in a new terminal)
```bash
cd backend
npm run dev
```

### Result
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- API: http://localhost:5000/api/quotes

## Test the Form

1. Open http://localhost:3000 in your browser
2. Click "Get Free Sourcing Quotation" button (in hero or navbar)
3. Fill out the form
4. Click "Submit Request"
5. See success message

## Verify Setup

Run this to check everything is installed:
```bash
node setup.js
```

## API Test (Using curl)

Test the endpoint directly:
```bash
curl -X POST http://localhost:5000/api/quotes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Company",
    "message": "Test message for sourcing products"
  }'
```

Expected response:
```json
{
  "status": "success",
  "message": "Quote request submitted successfully",
  "data": {
    "quoteId": "...",
    "email": "test@example.com",
    "company": "Test Company",
    "submittedAt": "..."
  }
}
```

## Troubleshooting

### Backend won't start
- Check port 5000 is not in use
- Run: `lsof -i :5000` (Mac/Linux) or `netstat -ano | findstr :5000` (Windows)

### Frontend can't connect to backend
- Check NEXT_PUBLIC_BACKEND_URL in my-app/.env.local
- Both servers must be running

### Form submission fails
- Check browser console (F12)
- Check backend terminal for errors
- Verify .env and .env.local files exist

### Port already in use
Change port in backend/.env:
```
PORT=5001
```
Then update frontend .env.local:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5001
```

## What's Working Now

✅ Quote form validation (frontend)
✅ Quote submission to backend
✅ Form data storage
✅ Success/error messages
✅ API endpoints ready
✅ Firebase ready for integration

## What's Next

When ready to add Firebase:

1. Create Firebase project at https://console.firebase.google.com
2. Download service account JSON
3. Save to backend/firebase-service-account.json
4. Update backend/.env with Firebase credentials
5. Backend will automatically start persisting to Firebase

---

**Everything is ready to go!** Start the two servers in separate terminals and test the form. 🚀

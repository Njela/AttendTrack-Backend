# AttendTrack — Backend API

Node.js + Express REST API for the AttendTrack GPS Student Attendance System.

## Features
- JWT authentication (register/login)
- GPS geofence verification (server-side)
- Attendance logging with location data
- 14-week semester report generation
- Proxy sign-in prevention

## Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcryptjs (password hashing)
- dotenv

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register student |
| POST | /api/auth/login | Login + get token |
| GET | /api/auth/profile | Get student profile |
| POST | /api/attendance/mark | Mark GPS attendance |
| GET | /api/attendance/my | Get my attendance |
| GET | /api/reports/my | Get semester report |

## Setup

```bash
npm install
```

Create a `.env` file in the root:
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
GEOFENCE_RADIUS=50
Then run:

```bash
npm run dev
```

## Project Structure
attendtrack-backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── attendanceController.js
│   │   └── reportsController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Student.js
│   │   ├── Class.js
│   │   └── Attendance.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── attendance.js
│   │   └── reports.js
│   └── utils/
│       └── gpsUtils.js
├── .env
├── package.json
└── server.js

## Frontend Repository
https://github.com/Njela/ATTENDANCE-APP

## Course
Mobile Computing — SMA2418

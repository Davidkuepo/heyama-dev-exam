# Heyama Dev Exam - Full Stack Application

A modern, production-ready full-stack application for managing objects with image uploads, real-time synchronization, and beautiful UI.

## 🚀 Tech Stack

### Backend
- **Framework**: NestJS (Node.js)
- **Database**: MongoDB
- **File Storage**: AWS S3
- **Real-time**: Socket.io
- **Validation**: class-validator, class-transformer

### Frontend
- **Framework**: Next.js 14 (React 18)
- **UI**: Tailwind CSS + shadcn/ui
- **State Management**: TanStack Query (React Query)
- **Real-time**: Socket.io Client
- **Form Handling**: React Hook Form + Zod
- **HTTP Client**: Axios

## 📋 Features

- ✅ Create objects with title, description, and image
- ✅ Upload images to AWS S3
- ✅ List all objects with real-time updates
- ✅ View individual object details
- ✅ Delete objects (with image cleanup from S3)
- ✅ Real-time synchronization between browser tabs
- ✅ Beautiful, responsive UI with dark mode support
- ✅ Drag & drop image upload
- ✅ Professional error handling and validation

## 🔧 Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)
- AWS S3 account (or compatible service)

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
npm install
cp .env.example .env
```

2. **Configure environment variables** in `.env`:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/heyama-dev
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=eu-west-3
AWS_S3_BUCKET_NAME=your-bucket
CORS_ORIGIN=http://localhost:3001
```

3. **Start the backend**
```bash
npm run start:dev
```

Backend runs on `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3001`

## 📚 API Endpoints

- `POST /objects` - Create object (multipart form-data with title, description, image)
- `GET /objects` - List all objects
- `GET /objects/:id` - Get single object
- `DELETE /objects/:id` - Delete object

## 🔄 Real-time WebSocket Events

- `objectCreated` - New object created
- `objectDeleted` - Object deleted
- Changes instantly sync across all connected browsers

## 🎨 Design Highlights

✨ **Premium UI Components**
- Modern gradient backgrounds
- Smooth animations and transitions
- Dark mode support
- Responsive mobile-first design
- Accessible form controls

## 📦 Key Features

- Drag & drop image upload
- Image preview before upload
- Confirmation dialogs for destructive actions
- Loading states and error handling
- Real-time object gallery updates
- Detailed object view page

## 🚀 Ready for Production

This is production-quality code following:
- REST API best practices
- Clean architecture patterns
- TypeScript strict mode
- Secure file handling
- CORS and validation
- Professional error handling

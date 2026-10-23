# Quick Chat

A full-stack real-time chat application built using the **MERN Stack** and **Socket.IO**. Quick Chat enables users to communicate instantly through a modern and responsive interface with secure authentication and persistent message storage.

## Repository

**GitHub:** [https://github.com/princekumar22205/chat-application](https://github.com/princekumar22205/chat-application?utm_source=chatgpt.com)

---

## Features

* 🔐 JWT-based User Authentication
* 💬 Real-Time Messaging with Socket.IO
* 🟢 Online/Offline User Status
* 💾 Persistent Chat Storage using MongoDB
* 📱 Responsive User Interface
* ⚡ Fast Frontend powered by React + Vite
* 🔒 Protected Routes
* 🔄 Automatic Authentication Check
* 👥 User-to-User Conversations

---

## Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* React Router
* Axios
* Socket.IO Client

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* JWT
* bcrypt

---

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/princekumar22205/chat-application.git
cd chat-application
```

---

## Run the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the **backend** folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
node server.js
```

Backend runs at:

```
http://localhost:5000
```

---

## Run the Frontend

Open another terminal.

```bash
cd frontend
npm install
```

Create a `.env` file inside the **frontend** folder.

```env
VITE_BACKEND_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## Environment Variables

### Backend

| Variable   | Description                       |
| ---------- | --------------------------------- |
| PORT       | Backend server port               |
| MONGO_URI  | MongoDB Atlas connection string   |
| JWT_SECRET | Secret key for JWT authentication |
| CLIENT_URL | Frontend application URL          |

### Frontend

| Variable         | Description     |
| ---------------- | --------------- |
| VITE_BACKEND_URL | Backend API URL |

---

## Design Decisions

* Used **React + Vite** for a fast development experience and optimized production builds.
* Chose **Socket.IO** for low-latency, bidirectional real-time communication.
* Used **MongoDB** to persist users and chat messages.
* Implemented **JWT Authentication** to secure protected routes.
* Used **React Context API** to manage authentication, socket connections, and chat state globally.
* Combined **REST APIs** for authentication and message history with **Socket.IO** for live messaging.

---

## Assumptions

* Users register before accessing the chat application.
* MongoDB is available and configured correctly.
* Frontend and backend URLs are updated appropriately for local or production environments.
* A stable internet connection is available for real-time messaging.

---

## Bonus Features

* ✅ Username-based login
* ✅ Online/Offline user status
* ✅ Messages stored in MongoDB
* ✅ Real-time messaging using Socket.IO

**Not Implemented**

* ❌ Typing indicator
* ❌ Read/Delivered message status

---

## Deployment

### Frontend

* Vercel

### Backend

* Render

---

## Future Improvements

* Typing indicator
* Read receipts
* Group chats
* Emoji reactions
* Voice and video calling

---

## License

This project is developed for learning purposes and portfolio demonstration.

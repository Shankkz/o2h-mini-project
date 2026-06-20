# TaskFlow 🚀

A premium full-stack Project Management Portal built with the MERN stack. TaskFlow is designed with a gorgeous "Warm Tones" custom dark mode UI and allows users to manage their daily tasks efficiently with real-time stats and debounced search functionality.

## ✨ Features

- **Secure Authentication**: JWT-based login and registration with Bcrypt password hashing.
- **Dynamic Dashboard**: Live statistics showing Total, Pending, In Progress, and Completed tasks.
- **"Elastic" Search**: Debounced live search implementation—type to instantly filter tasks without pressing enter.
- **Full CRUD Support**: Create, Read, Update (Status), and Delete tasks.
- **Premium UI**: Built with React, Vite, and Tailwind CSS v4, featuring a completely custom "Warm Tones" color palette, glassmorphism components, smooth hover animations, and a Light/Dark Mode toggle.
- **Security**: Strict username and password client/server validations.

---

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- Tailwind CSS v4
- React Router DOM
- Axios
- Lucide React (Icons)

**Backend:**
- Node.js & Express
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- Bcrypt.js

---

## 💻 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (Local installation or MongoDB Atlas URI)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Shankkz/o2h-mini-project.git
cd o2h-mini-project
```

### 2. Backend Setup

Open a terminal and navigate to the backend directory:

```bash
cd backend
```

Install backend dependencies:

```bash
npm install
```

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_jwt_key
```
*(Note: A `sample.env` is provided in the folder as a reference).*

Start the backend server:

```bash
npm run dev
# or
node server.js
```
*The server will start running on `http://localhost:8080`.*

### 3. Frontend Setup

Open a **new** terminal window and navigate to the frontend directory:

```bash
cd frontend
```

Install frontend dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

*The frontend application will start running on `http://localhost:5173`.*

---

## 🚀 Usage

1. Open your browser and navigate to `http://localhost:5173`.
2. Click **Create an account** to register a new user. 
   *(Note: Username must be alphanumeric. Password must contain both letters and numbers).*
3. Once logged in, you will be redirected to your personal dashboard.
4. Use the **Create New Task** button to add items to your board.
5. Use the top search bar to instantly filter tasks, or click the Status Tabs to sort them!

---

## 👨‍💻 Author

Developed by **Shankz**

# MCA Student Portal

A web-based portal designed for the MCA department to manage and share academic resources between students and lecturers.

## 🌐 Live Demo

- **Frontend:** https://department-d3659.web.app
- **Backend:** https://mca-student-portal.onrender.com

## 📌 About the Project

The MCA Student Portal provides a centralized platform for students and lecturers to access and manage departmental academic resources. It helps organize notes, projects, and research materials in one place.

The application uses Firebase Authentication for user authentication, a Node.js and Express backend for API operations, MongoDB Atlas for database storage, and Cloudinary for file uploads.

## ✨ Features

### Student Features
- Student login and authentication.
- View and download academic notes.
- Access project resources.
- Browse research materials.

### Lecturer Features
- Lecturer login and authentication.
- Upload academic notes.
- Upload project resources.
- Upload research materials.

### General Features
- Separate student and lecturer interfaces.
- Centralized academic resource management.
- File upload and download functionality.
- Cloud-based database and file storage.
- Deployed frontend and backend.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML | Page structure |
| CSS | Styling and layout |
| JavaScript | Frontend functionality |
| Node.js | Backend runtime |
| Express.js | REST API and server |
| MongoDB Atlas | Database |
| Firebase Authentication | User authentication |
| Firebase Hosting | Frontend deployment |
| Render | Backend deployment |
| Cloudinary | File storage |

## 🏗️ Project Structure

```text
MCA_STUDENT_PORTAL/
├── backend/
│   ├── routes/
│   │   ├── notes.js
│   │   ├── projects.js
│   │   └── research.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── welcome.html
│   ├── home.html
│   ├── studentlogin.html
│   ├── lecturerlogin.html
│   ├── studentnotes.html
│   ├── lecturernotes.html
│   ├── notes.html
│   ├── upload.html
│   ├── project.html
│   ├── uploadproject.html
│   ├── research.html
│   └── researchupload.html
├── firebase.json
├── .firebaserc
├── .gitignore
└── README.md
```

## ⚙️ Run the Project Locally

### Prerequisites

- Node.js and npm
- A MongoDB Atlas account
- Firebase project and Authentication configuration
- Cloudinary account

### 1. Clone the repository

```bash
git clone https://github.com/Sinchanam13/MCA_STUDENT_PORTAL.git
cd MCA_STUDENT_PORTAL
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory and configure the environment variables required by your application, including your MongoDB connection string and any Firebase or Cloudinary credentials used by the backend.

Use the exact variable names expected by your backend source code. Never commit real credentials or secret keys to GitHub.

### 3. Start the backend

```bash
npm start
```

The backend runs on the port configured by the application. For local development, verify the configured port and environment variables before testing.

### 4. Run the frontend

Open `frontend/welcome.html` in your browser, or serve the frontend through a local web server.

To use the local backend, configure the frontend API URLs for your local development environment. For the deployed website, the frontend uses the Render backend URL.

## 🚀 Deployment

### Frontend — Firebase Hosting

The frontend is deployed using Firebase Hosting.

Live URL: https://department-d3659.web.app

To deploy frontend updates:

```bash
firebase deploy --only hosting
```

### Backend — Render

The backend is deployed on Render.

Live URL: https://mca-student-portal.onrender.com

The backend requires the appropriate environment variables to connect to MongoDB Atlas and any external services it uses.

## 🔐 Security Notes

- Keep `.env` files and private credentials out of version control.
- Configure Firebase Authentication rules and authorized users appropriately.
- Restrict database and file-storage access according to the application's requirements.
- Validate uploaded files and enforce appropriate access controls.
- Configure CORS for the intended frontend origins in production.

## 🎯 Project Objective

The objective of this project is to simplify academic resource sharing within the MCA department through a centralized web application with separate student and lecturer interfaces.

## 👩‍💻 Author

**Sinchana M**

MCA Student | RNS Institute of Technology, Bengaluru

GitHub: https://github.com/Sinchanam13

---

*This project was developed to improve access to academic resources and make departmental resource management more convenient.*

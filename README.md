# Academic Resource Management System

A full-stack web application that provides a centralized platform for managing academic resources such as lecture notes, student projects, and research papers. The system offers separate portals for lecturers and students with secure authentication and role-based access.

---

## Features

### Authentication

* Secure login using Firebase Authentication
* Email & Password authentication
* Google Sign-In with institutional email accounts
* Separate login portals for Lecturers and Students

### Lecturer Module

* Upload lecture notes
* Add subject details, subject code, semester, description, and lecturer name
* Upload project resources
* Review available projects
* Upload research papers
* View and download shared academic resources

### Student Module

* Secure student login
* Browse lecture notes
* Filter notes by semester, subject, and lecturer
* Download lecture notes
* Upload projects
* Upload research papers
* View and download shared resources

### File Management

* Upload PDF and other academic documents
* Cloud-based file storage using Cloudinary
* Easy download functionality

---

## Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Authentication

* Firebase Authentication

### File Storage

* Cloudinary

---

## Project Structure

```text
mcaproject/
│
├── frontend/
│   ├── 404.html
│   ├── demo.html
│   ├── home.html
│   ├── lecturerlogin.html
│   ├── lecturernotes.html
│   ├── notes.html
│   ├── notesupload.html
│   ├── project.html
│   ├── research.html
│   ├── researchupload.html
│   ├── studentlogin.html
│   ├── studentnotes.html
│   ├── upload.html
│   ├── uploadproject.html
│   ├── welcome.html
│   └── Assets (Images)
│
└── backend/
    ├── config/
    ├── models/
    ├── routes/
    ├── server.js
    ├── package.json
    ├── package-lock.json
    └── .env
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/<your-username>/<repository-name>.git
```

### Navigate to the backend

```bash
cd backend
```

### Install dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file inside the **backend** directory and add your credentials.

Example:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

FIREBASE_API_KEY=your_firebase_api_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_name

CLOUDINARY_API_KEY=your_cloudinary_api_key

CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Start the server

```bash
node server.js
```

Open the frontend by launching the HTML files in your browser or using a local server.

---

## Future Enhancements

* Admin dashboard
* Advanced search functionality
* Resource approval workflow
* Notifications for new uploads
* Comments and feedback on projects
* Bookmark and favorites
* Responsive mobile interface
* Analytics dashboard

---

## Author

**Sinchana M**

MCA Student | Full Stack Developer


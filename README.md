


# EduVerse

**EduVerse** is an advanced E-Learning Platform designed to connect instructors and students in an interactive and optimized environment. It enables instructors to manage courses effortlessly while providing students with engaging learning experiences.



## Project Structure
```
/frontend      - React.js app (Client side)
/backend       - Node.js with Express and MongoDB (Server side)
```

---

## Project Description
EduVerse offers an intuitive platform for online learning. It features user authentication, progress tracking, responsive design, course recommendations powered by AI, and analytics dashboards. The system facilitates secure communication, payments, and content management for both learners and instructors.

### Key Features
- **User Authentication**: Secure login and registration with role-based access.
- **Dashboards**: Separate views for students and instructors.
- **Course Management**: Creation, editing, and progress tracking.
- **AI Recommendations**: Personalized course suggestions.
- **Third-Party Integrations**: Payment gateways and tools like Zoom.
- **Responsive Design**: Accessible from desktop, tablet, and mobile.

---

## Getting Started

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (running locally or hosted)

---

## Setup Instructions

### Frontend
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The React.js app will run on [http://localhost:3000](http://localhost:3000).

### Backend
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the `backend` directory and add the following:
     ```
     MONGO_URI=<Your MongoDB Connection String>
     PORT=5000
     JWT_SECRET=<Your JWT Secret>
     ```
4. Start the backend server:
   ```bash
   npm start
   ```
   The Node.js server will run on [http://localhost:5000](http://localhost:5000).

---

## Running the Full Application
1. Start the **backend** server as described above.
2. Start the **frontend** server.
3. Access the platform at [http://localhost:3000](http://localhost:3000).

---

## Features Overview
### Frontend
- Built with **React.js** for a seamless user experience.
- Mobile-first responsive design.
- Implements React Router for navigation.
- Integrates AI for personalized course recommendations.

### Backend
- Built with **Node.js** and **Express**.
- **MongoDB** for data storage.
- Secure authentication with JWT.
- RESTful API for communication with the frontend.

---

Feel free to contribute to the project! 🎓  
For questions, contact the development team.


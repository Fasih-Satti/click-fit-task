# Click Fit - Fitness Web Application

## Overview
Click Fit is a premium, single page fitness web application developed as a technical task for **On Wave Group**. It features a modern, high-contrast light theme, smooth CSS animations, and full responsiveness across all devices.

## Features & Requirements Met
- **Premium UI & Animations:** Built with HTML, CSS, Bootstrap 5, and jQuery, featuring glassmorphism, advanced navigation, and micro-animations.
- **Live API Integration:** Dynamically fetches data from a public REST API (`https://api.restful-api.dev/objects`) on page load and elegantly formats the response into UI cards. Includes robust network fallbacks.
- **Node.js Image Uploads:** Contains a functional drag and drop/click-to-browse upload area. Images are processed by a Node.js (Express & Multer) backend and stored securely in the local `upload_images` folder without relying on cloud services.
- **MySQL Integration Ready:** Includes a visual signup flow on the frontend, which conceptually ties into the provided `database/clickfit_users.sql` script (containing the `users` table and `addUser` stored procedure).
- **Comprehensive Documentation:** A programmatically generated Word Document detailing the project steps is included in the `docs` folder.

## Technologies Used
- **Frontend:** HTML5, CSS3 (Custom Light Theme), Bootstrap 5, jQuery, FontAwesome
- **Backend:** Node.js, Express.js, Multer (for file handling)
- **Database Scripting:** MySQL

## How to Run Locally
1. **Clone the repository:**
   `git clone https://github.com/Fasih-Satti/click-fit-task.git`

2. **Navigate to the directory:**
   `cd click-fit-task`

3. **Install dependencies:**
   `npm install`

4. **Start the server:**
   `npm start`

5. **View the application:**
   Open your browser and navigate to `http://localhost:3000`

## Author
Designed and Developed by **Fasih Ur Rehman**

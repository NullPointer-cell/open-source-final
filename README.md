# open-source-final
🌍 Accessibility Map for Public Spaces (Social Good)

A web application that maps and rates public places based on accessibility features such as ramps, lifts, wheelchair access, and parking.
This project uses open mapping APIs to fetch real-time accessibility data and visually represents it using an interactive map.

✨ Objective

Build an accessibility-focused map that empowers users to:

Find accessible places easily.

Contribute accessibility information for public spaces.

Increase awareness and promote inclusive infrastructure.

🚀 Key Features

 Interactive Map (Leaflet.js)
Zoom, pan, explore, and visualize accessibility information instantly.

🧭 OpenStreetMap (Overpass API) Integration
Fetch public locations (POIs) dynamically.

♿ Wheelmap API Support
Get wheelchair accessibility status (yes / no / limited / unknown).

🎯 Colored Markers Based on Accessibility

Green → Accessible

Red → Not accessible

Yellow → Partially accessible

Gray → Unknown

➕ User Submitted Data (Bonus)
Add new accessibility info with live map updates.

📱 Responsive UI
Designed for both desktop and mobile.

🧰 Tech Stack
Frontend

React.js

Leaflet.js

HTML / CSS

JavaScript

Backend

Node.js (optional, if you use server-side APIs)

Express.js

APIs Used

Overpass API (OpenStreetMap)
https://overpass-api.de/api/interpreter

Wheelmap API
https://wheelmap.org/api/docs

Tools

Postman (API testing)

Git + GitHub (version control)

📂 Project Structure
/src
  /components
  /pages
  /hooks
  /utils
  App.jsx
  main.jsx

/public
  index.html

server/ (optional if backend is used)
README.md
package.json

⚙️ Installation & Running Locally

Follow these steps to run the project on your system.

1️⃣ Clone the Repository
git clone https://github.com/your-username/accessibility-map.git
cd accessibility-map

2️⃣ Install Dependencies
npm install

3️⃣ Set Environment Variables (If Required)

Create a .env file in the root:

VITE_OVERPASS_URL=https://overpass-api.de/api/interpreter
VITE_WHEELMAP_API_KEY=your-api-key-here


(Wheelmap read access may not require a key — only needed for authenticated writes.)

4️⃣ Start the Development Server
npm run dev


Now open http://localhost:5173/
 in your browser.

▶️ Running Backend 

If you have a Node.js backend:

Install backend dependencies
cd server
npm install

Start backend server
npm run start

📸 Screenshots (Add Later)

Add screenshots or screen recordings once your UI is finalized.

🙋 Contributing

Fork the repo

Create a feature branch

Commit with a clear message

Push & create a Pull Request

🧩 Future Enhancements

AI-powered accessibility score prediction

User authentication

Offline map support

Admin dashboard for data moderation


💛 Credits

Data from OpenStreetMap contributors

Wheelchair data via Wheelmap API

Built using React + Leaflet

Individual contribution 
jayant saxena= linking, structuring and framing
archi tyagi= UI/UX
adil= pages
aneek das= components

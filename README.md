🚀 CYBER DUST ⚛️
===========================
**Cyber Dust** - A mesmerizing interactive web experience that brings particles to life with your hand gestures 🌟

## 🔗 Live Demo
### [Click here to View Live Demo](https://cyberdust.netlify.app/)
*(Note: Please allow camera access to interact with the particles)*

📖 Description
================
Cyber Dust is a cutting-edge web application that leverages the power of HTML, CSS, JavaScript, and AI to create an immersive and interactive experience. This project showcases a stunning particle engine that responds to real-time hand gestures using computer vision, providing a unique and captivating visual experience. With its mobile-friendly design and optimized performance, this project demonstrates the future of web interactivity.

At its core, Cyber Dust utilizes the **Three.js** library to generate and manipulate 15,000+ particles in 3D space, while **Google MediaPipe** handles precise hand tracking. The project's configuration is optimized for both mobile and desktop devices, automatically adjusting particle counts to ensure a seamless experience across various platforms.

Cyber Dust is not only a visually stunning project but also a testament to the capabilities of modern web technologies. Its interactive nature allows users to attract, repel, and transform shapes using simple hand signs like an open palm, a fist, or a victory sign.

✨ Features
================
Cyber Dust boasts an impressive array of features, including:

1. **AI-Powered Interaction**: Responds to real-time hand gestures (Open Palm, Fist, Victory Sign) using MediaPipe.
2. **3D Particle Physics**: Simulates thousands of particles reacting to magnetic forces and shape transitions.
3. **Mobile-Friendly Design**: Automatically detects mobile devices and optimizes particle count (6000 particles) for lag-free performance.
4. **Multiple Shapes**: Switch between 5 unique formations: **Sphere, Heart, Saturn, Flower, and Torus**.
5. **Glassmorphism UI**: Features a modern, responsive user interface with blur effects and sleek controls.
6. **Privacy Focused**: All camera processing happens client-side; no video data is sent to any server.
7. **Responsive Design**: Adapts the UI layout (Bottom-Left for Desktop, Bottom-Center for Mobile) for best usability.
8. **High-Performance Rendering**: Utilizes WebGL via Three.js for fast and efficient rendering.

🧰 Tech Stack Table
====================
| Category | Technology |
| --- | --- |
| Frontend | HTML5, CSS3, JavaScript (ES6+) |
| 3D Library | Three.js |
| AI / Computer Vision | Google MediaPipe Hands |
| Backend | None (Static Website) |
| Icons | FontAwesome 6.4.2 |

📁 Project Structure
======================
The project is organized into the following folders and files:

* **favicon.png**: The project's icon asset.
* **index.html**: The main entry point of the project, containing the HTML structure, canvas container, and UI elements.
* **script.js**: The main JavaScript file, containing logic for Three.js rendering, MediaPipe hand tracking, and gesture recognition.
* **style.css**: The main CSS file, defining the glassmorphism UI, responsive layouts, and visual styling.

⚙️ How to Run
================
To run Cyber Dust, follow these steps:

1. **Setup**: Clone the repository to your local machine using Git.
2. **Environment**: Ensure you have a modern web browser installed (Chrome/Edge/Firefox).
3. **Important**: Because this project uses the Camera API, it requires a secure context (**HTTPS** or **Localhost**). You cannot run it by simply double-clicking `index.html`.
4. **Run**:
   * **VS Code**: Install "Live Server" extension -> Right-click `index.html` -> "Open with Live Server".
   * **Python**: Run `python -m http.server` in the terminal and open `localhost:8000`.

🧪 Testing Instructions
========================
To test Cyber Dust, follow these steps:

1. **Open the Project**: Launch the local server link in your browser.
2. **Grant Permissions**: Allow camera access when prompted.
3. **Interact with Gestures**:
    * **🖐 Open Palm**: Attracts particles towards your hand.
    * **✊ Closed Fist**: Repels particles away from your hand.
    * **✌️ Victory Sign**: Switches the particle shape (e.g., Sphere to Heart).
4. **Test Performance**: Try resizing the window or opening it on a mobile device to see the responsive layout adaptation.

📸 Screenshots
================
### Desktop View
<img src="https://iili.io/fama62p.png" alt="Desktop View" width="100%">

### Action View
<img src="https://iili.io/famclFR.png" alt="Action View" width="100%">

### Mobile View
<img src="https://iili.io/fapnInI.png" alt="Mobile Screenshot" width="300">

📦 API Reference
==================
As this is a static website, there is no external API reference available. However, the project's configuration (Particle Count, Colors, Sensitivity) can be modified directly in the **script.js** file variables.

👤 Author
================
Cyber Dust was created by **Rahul Kumar**.

* **GitHub**: [@Rahul-Kumar-404](https://github.com/Rahul-Kumar-404)
* **LinkedIn**: [Rahul Kumar](https://www.linkedin.com/in/rahul-kumar404/)
* **X**: [@Rahul_Kumar_404](https://x.com/Rahul_Kumar_404)
* **Instagram**: [@marcus_the_darcus](https://www.instagram.com/marcus_the_darcus)

📝 License
================
Cyber Dust is licensed under the **MIT License**.

Copyright (c) 2024 Rahul Kumar

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so.

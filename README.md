# Uvelio | Full-Stack Jewelry E-Commerce Platform

> A modern, fully responsive jewelry e-commerce platform built with React, and Vite.
>
> Developed from scratch with a custom Node.js backend, database integration, user authentication, and a focus on maintainable architecture and user experience.

---

## Live Application

**[Explore Live Demo](https://uvelio.onrender.com)**

---

## Architecture & Engineering Highlights

Uvelio is a full-stack e-commerce project designed to demonstrate practical frontend and backend development skills through a complete online shopping experience.

Key architectural pillars include:

- **Modern Frontend Architecture:** Component-based application built with React, Vite, and Redux for centralized state management.
- **Custom Backend Development:** Independently developed REST API using Node.js and Express to handle application logic and client-server communication.
- **Database Integration:** Structured database with dedicated tables for products and users, supporting data retrieval and user-related operations.
- **Authentication & Security:** Password hashing with bcrypt and token-based authentication using JSON Web Tokens (JWT).
- **Internationalization:** Multilingual interface powered by i18next and react-i18next.
- **Responsive UI:** SCSS and Tailwind CSS combined to create a consistent, responsive shopping experience across devices.

---

## Tech Stack

### Frontend

- **Core:** React / Vite
- **State Management:** Redux
- **Routing:** React Router
- **Styling:** SCSS / Tailwind CSS
- **Internationalization:** i18next / react-i18next
- **HTTP Client:** Axios
- **Interactive UI:** Swiper

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Authentication:** JSON Web Tokens (JWT)
- **Password Security:** bcrypt

### Database

- **Data Models:** Products and users
- **Structure:** Two database tables supporting product data management and user-related operations

### Deployment & Development

- **Hosting & Deployment:** Render
- **Package Management:** npm
- **Development Servers:** Vite / Node.js

---

## Key Features

- **E-Commerce Experience:** Dedicated online store for browsing and interacting with jewelry products.
- **Product Data Management:** Backend integration for retrieving and working with product information stored in the database.
- **User Authentication:** Secure password hashing and JWT-based authentication infrastructure.
- **Centralized State Management:** Redux integration for managing shared application state.
- **Client-Side Routing:** React Router for navigation between application pages.
- **Multilingual Interface:** Internationalization support with i18next and react-i18next.
- **Responsive Design:** Layouts adapted to different screen sizes using SCSS and Tailwind CSS.
- **Interactive Product Presentation:** Swiper-powered sliders and carousels.
- **API Communication:** Axios for making HTTP requests between the frontend and backend.
- **Full-Stack Integration:** Custom frontend and backend working together as a single deployed application.

---

## Project Structure

```text
Uvelio/
├── client/
├── server/
│
└── README.md
```
---

## Getting Started

### Prerequisites

- Node.js
- npm

### 1. Start the Client

```bash
cd client/
npm install
npm run dev
```

The Vite development server will start and provide a local URL in the terminal.

### 2. Start the Server

Open a separate terminal:

```bash
cd server/
npm install
npm run dev
```

The backend development server will start according to the project's configuration.

---

## Deployment

The application is deployed on **Render**, providing hosting for the live project.

**[Visit Uvelio](https://uvelio.onrender.com)**
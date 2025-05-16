# Shipboard - Ship Maintenance Dashboard

## Overview
Shipboard is a React-based frontend application for managing ships, components, and maintenance jobs. It offers role-based access, CRUD operations, job tracking, and an in-app notification system to help streamline ship maintenance processes.

---

## Setup and Installation

### Prerequisites

- npm 

### Steps to run locally

1. Clone the repo:
   ```bash
   git clone https://github.com/meetchauhan1/shipboard.git
   cd shipboard

2. Install dependencies:

   ```bash
   npm install

3. Start the development server:

   ```bash
      npm start
4.Open your browser and go to:
Open your browser and go to:
         ```arduino

            http://localhost:5173

## Application Architecture

- **Framework:** React (functional components + hooks)

- **Routing:** React Router v6 with protected routes

- **State Management:** React Context API for global states (`AuthContext`, `ShipsContext`, `ComponentsContext`, `JobsContext`, `NotificationContext`)

- **Persistence:** Browser `localStorage` for demo data and state persistence

- **Notifications:** In-app notification center for Job events (Created, Updated, Completed)

- **UI:** Simple CSS with Flexbox layouts; can be extended with Material-UI or other libraries

---

## Features

- User authentication (mock)

- Manage Ships (Create, Read, Update, Delete)

- Manage Components linked to ships

- Manage Maintenance Jobs with status tracking

- Calendar view for scheduled jobs

- Real-time in-app notifications for job events

- LocalStorage based persistence for demo and testing

---

## Known Issues and Limitations

- No backend server or API integration; all data lives in localStorage

- Authentication is simulated; no real security or user management

- Notifications are session-based and need manual dismissal

- Basic UI/UX without responsiveness or accessibility optimizations

- Minimal input validation and error handling

---

## Technical Decisions

- **React Context API:** For straightforward global state without Redux complexity

- **localStorage:** Quick prototype persistence, no backend dependencies

- **React Router v6:** Modern routing with support for protected routes

- **Functional Components & Hooks:** Aligns with current React best practices

- **Modular structure:** Organized by feature for scalability and maintenance

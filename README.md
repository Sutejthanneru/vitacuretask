# Vitacure – Role-Based Healthcare Booking Portal 🏥

A frontend-only mini-application built using React to simulate the core service flow of Vitacure — a patient-caretaker booking system. This project demonstrates role-based login, booking features, dashboards, and local state/session management.

## 🌟 Features Implemented

### ✅ Role-Based Login
- **Patient Login**
  - Email: `patient@vitacure.in`
  - Password: `patient123`
- **Caretaker Login**
  - Email: `nurse@vitacure.in`
  - Password: `nurse123`
- Redirects based on role:
  - Patient → `/patient/dashboard`
  - Caretaker → `/caretaker/dashboard`

### 🧑‍⚕️ Patient Dashboard
- Displays 3–4 dummy caretaker profiles as cards.
- Each card includes:
  - Caretaker details
  - "Book Now" button → opens booking form/modal
- Allows selection of date and time.
- Booking data is stored in **localStorage**.
- **My Bookings** tab to view patient’s previous bookings.

### 👩‍⚕️ Caretaker Dashboard
- Displays all bookings submitted by patients.
- Each booking displays:
  - Patient’s name
  - Chosen date and time
  - Buttons: `Accept` / `Reject`
- Booking status is updated and saved in **localStorage**.

### 🔐 Logout
- Clears session from **localStorage**
- Redirects user to login screen

### 🗺️ Bonus Feature (Optional)
- After booking is accepted, a **static map** is shown.
- Uses Leaflet.js to simulate locations of patient and caretaker.
- (Only enabled for accepted bookings)

---

## 🛠️ Tech Stack

- **React JS** with Hooks
- **React Router DOM** for routing
- **Tailwind CSS** for UI styling
- **LocalStorage** for data persistence
- **Leaflet.js** (optional map feature)

---

## 📂 Folder Structure

```bash
src/
│
├── components/        # Reusable components like Header, BookingCard, etc.
├── pages/             # Login, PatientDashboard, CaretakerDashboard, etc.
├── context/           # (if Context API used for session)
├── assets/            # Images, icons, etc.
└── App.jsx            # Main routes and layout

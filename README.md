# 🚖 RapidRide

RapidRide is a smart corporate ride-sharing platform designed to make daily employee commuting safer, more economical, and environmentally sustainable.

The platform allows users to create rides, join existing rides, verify trips using OTP, communicate with drivers, and earn reward points for choosing sustainable transportation.

> Developed as a prototype MVP using Next.js, Supabase, and Vercel.

---

# 🌐 Live Demo

https://rapidride-eta.vercel.app/

---

# 📌 Problem Statement

Daily commuting in metropolitan cities is expensive, inefficient, and contributes significantly to traffic congestion and carbon emissions.

RapidRide aims to provide a secure ride-sharing ecosystem for corporate employees by enabling verified users to share rides with colleagues while promoting sustainable transportation.

---

# 🎯 Objectives

- Reduce commuting costs
- Encourage sustainable transportation
- Reduce traffic congestion
- Improve employee convenience
- Provide secure ride verification
- Reward eco-friendly travel

---

# ✨ Features

## Authentication

- Google Authentication
- Secure login using Supabase Auth

## Ride Management

- Create Ride
- View Available Rides
- Join Existing Ride
- Ride Details

## Driver Features

- Driver Information
- Driver Contact
- WhatsApp Integration
- Call Driver

## Security

- OTP Based Ride Verification
- Secure Authentication
- Database-backed Ride Management

## Sustainability

- Reward Points
- CO₂ Saved Counter
- Green Mobility Concept

## User Experience

- Responsive Design
- Mobile Friendly
- Modern UI
- Dark Theme
- Live Ride Tracking Simulation
- Ride Status Indicators

---

# 🛠 Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

## Backend

- Supabase

## Authentication

- Supabase Auth
- Google OAuth

## Database

- PostgreSQL (Supabase)

## Deployment

- Vercel

---

# 🗄 Database

Tables used:

### users

Stores authenticated users.

### rides

Stores ride information.

### ride_participants

Stores ride participants.

---

# 🔄 Workflow

1. User logs in using Google
2. User creates a ride
3. Other users browse available rides
4. Passenger joins ride
5. Driver receives request
6. Ride details are displayed
7. Driver and passenger communicate
8. OTP verifies ride
9. Reward points are awarded

---

# 🔐 Security Features

- Google OAuth Authentication
- OTP Verification
- Secure Backend using Supabase
- Protected User Data
- Authenticated Ride Participation

---

# 🌱 Sustainability

RapidRide encourages sustainable commuting by

- reducing vehicle usage
- lowering carbon emissions
- rewarding eco-friendly travel
- promoting corporate ride sharing

---

# 📱 Responsive Design

Supports

- Desktop
- Laptop
- Tablet
- Mobile Devices

---

# 📊 Current Prototype Scope

Implemented Features

- Google Login
- Ride Creation
- Ride Joining
- Driver Details
- Ride Tracking Simulation
- OTP Verification
- Reward Points
- CO₂ Savings Display
- Mobile Responsive Interface
- Vercel Deployment

---

# 🚀 Future Enhancements

- Live GPS Tracking
- Google Maps Integration
- AI Ride Matching
- Route Optimization
- Push Notifications
- In-app Chat
- Ride Rating System
- Fare Estimation
- Payment Gateway
- Emergency SOS
- Live Location Sharing
- Analytics Dashboard

---

# ⚙ Architecture

```
Client (Next.js)
        │
        ▼
Supabase Authentication
        │
        ▼
PostgreSQL Database
        │
        ▼
Vercel Deployment
```

---

# 📈 Scalability

RapidRide has been developed with a scalable architecture.

The current prototype is suitable for demonstration and small-scale deployments. Since it uses:

- Next.js
- Supabase
- PostgreSQL
- Vercel

the application can be scaled by upgrading hosting resources, optimizing database queries, implementing caching, and introducing load balancing.

Production-scale capacity depends on the selected Supabase and Vercel plans as well as infrastructure configuration rather than the application architecture alone.

---

# 📂 Project Structure

```
app/
│
├── dashboard/
├── login/
├── create-ride/
├── components/
├── lib/
└── styles/
```

---

# 🧪 Testing

The prototype has been tested for:

- Authentication
- Ride Creation
- Ride Joining
- OTP Verification
- Mobile Responsiveness
- Database Operations
- Deployment

---

# 👥 Team Contribution

This project was developed collaboratively as part of a group prototype.

Primary contributions included:

- Frontend Development
- Backend Integration
- Database Design
- Authentication Setup
- UI/UX Development
- Deployment
- Testing and Debugging

---

# 📷 Screenshots

Add screenshots of

- Landing Page
- Dashboard
- Create Ride
- Ride Details
- OTP Verification
- Mobile View

---

# 📄 License

This project is intended for academic and educational purposes.

---

# ❤️ Acknowledgements

- Next.js
- React
- Tailwind CSS
- Supabase
- PostgreSQL
- Vercel

---

# 📧 Contact

For queries or collaboration:

**RapidRide Development Team**

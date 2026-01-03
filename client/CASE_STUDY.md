# Reso Bridge - Case Study

## Problem Statement
The goal is to develop "Reso Bridge," a secure and efficient registration and assessment portal to streamline the onboarding process for the internal Learning Management System (LMS). This system needs to handle user registration, email verification, and secure authentication to allow students to access preliminary course content and assessments.

## Architecture & Tech Stack

### Architecture
The application follows a modern **Client-Server** architecture (Serverless/Managed Backend):
- **Frontend**: A Single Page Application (SPA) built with React and Vite, utilizing client-side routing.
- **Backend/Database**: Utilizes Supabase as a Backend-as-a-Service (BaaS) for PostgreSQL database, Authentication, and Row Level Security (RLS).

### Tech Stack
- **Frontend**:
    - **Framework**: React 19 (via Vite)
    - **Language**: TypeScript
    - **Styling**: Tailwind CSS v3 (Responsive Design, Dark Mode support)
    - **Routing**: React Router v7
    - **Icons**: Lucide React
    - **Animations**: Framer Motion
- **Backend**:
    - **Platform**: Supabase
    - **Database**: PostgreSQL
    - **Authentication**: JWT-based Auth (Supabase GoTrue)
- **Deployment**:
    - **Client**: Vercel (recommended) or Netlify
    - **Backend**: Supabase Managed Cloud

## Registration & Verification Flow

1.  **User Initiation**: The user navigates to the Registration page (`/register`).
2.  **Data Entry**: The user fills in the form with:
    -   Full Name
    -   Email Address
    -   Password (validated for complexity: min 8 chars, uppercase, lowercase, number, special char)
    -   Confirm Password
3.  **Pre-Registration Check**: The application queries the `profiles` table to ensure the email is not already associated with an existing profile.
4.  **Account Creation**:
    -   If valid, the systems calls `supabase.auth.signUp()`.
    -   User metadata (Full Name) is stored.
    -   A verification email is triggered to the provided address.
5.  **Email Verification**:
    -   The user is redirected to the `/verify-email` page, instructing them to check their inbox.
    -   Upon clicking the link in the email, the user's email is marked as verified in Supabase Auth.
6.  **Access**:
    -   The user can now log in via `/login`.
    -   Upon successful authentication, they are granted access to the protected Dashboard (`/dashboard`) to view available courses.

## Assumptions and Limitations

-   **Assumptions**:
    -   Users must have a valid, accessible email address for verification.
    -   Modern browser support (due to React 19/Vite).
    -   The `profiles` table is synchronized with `auth.users` (likely via database triggers) or handled manually to ensure data consistency.
-   **Limitations**:
    -   **Single Role**: Currently assumes a single "Student" role with read-only access to courses. Admin features are not exposed in the client.
    -   **Offline Access**: The application requires an active internet connection to authenticate and fetch data from Supabase.

## Deployment Details

-   **Prerequisites**:
    -   Node.js & npm installed locally.
    -   Supabase project created with `courses` table and Auth enabled.
    -   Environment variables configured (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_APP_URL`).
-   **Build Process**:
    -   Run `npm run build` to generate the production bundle in the `dist` directory.
    -   The build uses `tsc` for type verification and `vite build` for bundling and minification.
-   **Hosting**:
    -   The `dist` folder is deployed to a static hosting provider (e.g., Vercel).
    -   Redirect rules must be configured for the SPA (Single Page Application) to handle client-side routing (e.g., rewriting all requests to `index.html`).

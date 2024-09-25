# QuickIncorp

QuickIncorp is a web application designed to simplify the business incorporation process in Canada. This platform enables users to submit legal forms, consult with advisors, and manage compliance digitally, making the entire incorporation process more streamlined and accessible.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Contributing](#contributing)

## Project Overview

QuickIncorp is built to assist entrepreneurs and businesses in incorporating their companies online. It provides tools for document submissions, advisory services, and compliance management, all under one platform. The goal is to make the process easier and more efficient for business owners by automating many of the legal and administrative steps.

## Features

- **User Authentication**: Secure login and registration for users.
- **Form Submissions**: Digital forms for incorporation documents.
- **Advisory Consultation**: Schedule and consult with business advisors.
- **Compliance Tracking**: Manage and monitor compliance requirements.
- **Multi-User Support**: Admins, business owners, and advisors can interact via different roles.
- **Real-Time Notifications**: Keep track of form submissions, approvals, and consultations.
  
## Technologies

- **Frontend**: 
  - [Next.js](https://nextjs.org/)
  - [React](https://reactjs.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  
- **Backend**: 
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)

- **Database**:
  - [Firebase](https://firebase.google.com/)
  - [MongoDB](https://www.mongodb.com/)

- **Deployment**: 
  - [Vercel](https://vercel.com/)

## Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- NPM or Yarn
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/quickincorp.git
   cd quickincorp
   ```
2. **Install dependencies**

  ```bash
  npm install
  ```
3. **Create an .env.local file and add the following environment variables**
   ```bash
  *Firebase environment variables*
  NEXT_PUBLIC_FIREBASE_API_KEY=""
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
  NEXT_PUBLIC_FIREBASE_APP_ID=""
  
  *Mailgun environment variables*
  MAILGUN_API_KEY=""
  MAILGUN_DOMAIN=""
  
  *OpenAI environment variable*
  OPENAI_API_KEY=""
    
  *Stripe*
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
  STRIPE_SECRET_KEY=""
  ```

5. **Run the development server**
  ```bash
  npm run dev
  ```
Open http://localhost:3000 in your browser to see the app.

## Contributing

We welcome contributions from the community! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch:

    ```bash
    git checkout -b feature/your-feature-name
    ```

3. Make your changes.
4. Commit your changes:

    ```bash
    git commit -m 'Add some feature'
    ```

5. Push to the branch:

    ```bash
    git push origin feature/your-feature-name
    ```

6. Open a pull request.

Please ensure that your code adheres to our coding standards and passes all tests.



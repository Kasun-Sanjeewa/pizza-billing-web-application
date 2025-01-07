# Pizza Billing Web Application

This is a full-stack pizza billing web application developed using **React.js** for the frontend and **Go** for the backend. The application includes features such as secure login, item management, POS functionality, real-time filtering, invoice generation, and admin controls for menu management.

---

## Features
- User authentication with secure login.
- POS screen with category filtering and real-time item selection.
- Invoice generation with tax calculations.
- Admin interface for adding, editing, and deleting items.
- Seamless integration between the React frontend and Go backend.

---

## Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (v16 or later)
- **npm** or **yarn**
- **Go** (v1.19 or later)
- **Git**

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Setting Up the Backend (Go)
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   go mod tidy
   ```
3. Run the backend server:
   ```bash
   go run main.go
   ```
4. By default, the backend will run on `http://localhost:8080`. You can change the port in the `main.go` file if needed.

### 3. Setting Up the Frontend (React)
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   # OR
   yarn install
   ```
3. Start the React development server:
   ```bash
   npm start
   # OR
   yarn start
   ```
4. The frontend will run on `http://localhost:3000` by default.

---

## Configuration

### API URL
Ensure the frontend is configured to communicate with the backend:
1. Open the `frontend/src/config.js` file (or equivalent configuration file).
2. Set the API base URL to match the backend server (e.g., `http://localhost:8080`).

---

## Usage

1. Access the application by visiting `http://localhost:3000` in your browser.
2. Login with your credentials.
3. Use the POS screen to manage orders and generate invoices.
4. Use the admin panel to manage menu items.

---

## Project Structure

### Frontend (React)
```
frontend/
├── public/
├── src/
│   ├── components/   # Reusable components
│   ├── pages/        # Application screens
│   ├── utils/        # Utility functions
│   └── App.js        # Main application file
```

### Backend (Go)
```
backend/
├── main.go           # Entry point of the backend server
├── routes/           # API routes
├── models/           # Data models
└── controllers/      # Request handlers
```

---

## Technologies Used

### Frontend
- React.js
- HTML5, CSS3
- Axios (for API requests)

### Backend
- Go
- Gorilla Mux (for routing)

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments
Special thanks to all the open-source contributors whose tools and libraries made this project possible.

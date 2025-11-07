# Nairobi Booking (Full-Stack Project)

This is a **full-stack booking application** built with a **React + TypeScript frontend** and a **Python Flask backend**.  
It allows users to browse and book stays, cars, airport taxis, and attractions in Nairobi.

## Project Structure

project-root/
├─ frontend/ # React + TypeScript
├─ backend/ # Python Flask
├─ README.md
└─ .gitignore


## Features

- Full-stack architecture (frontend + backend)
- User authentication and protected routes
- Browse and book stays, cars, airport taxis, and attractions
- Shopping cart functionality for multiple bookings
- Responsive and modern UI using Tailwind CSS
- REST API endpoints in Flask backend

## Getting Started

### Prerequisites

- Node.js & npm (for frontend)
- Python 3.x (for backend)
- Virtual environment recommended for Python backend

### Running the Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py

Running the Frontend
cd frontend
npm install
npm run dev
The frontend will run on http://localhost:5173 by default.

.gitignore

node_modules/, dist/ (frontend)

__pycache__/, .db (backend)

.env files

Contributing

Contributions are welcome! Feel free to open issues or pull requests.

License

MIT License


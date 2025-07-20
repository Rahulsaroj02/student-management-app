# 🎓 Student Management Web App

A full-stack CRUD (Create, Read, Update, Delete) application for managing student records using **Node.js**, **Express**, **HTML**, **CSS**, and **vanilla JavaScript**.

## 🚀 Features

- Add a student with custom `id` and `name`
- Display all students
- Edit a student's name by ID
- Delete a student by ID
- Responsive and user-friendly interface
- Live DOM updates without page reloads

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript (Fetch API)
- **Backend:** Node.js, Express.js
- **Data Storage:** In-memory array (no database)

---

## 📸 Screenshots

> Add screenshots of your UI here for better presentation  
> *(e.g., form inputs, student list display)*

---

## 📂 Project Structure
student-management-app/

│

├── backend/

│ └── server.js # Express backend with API routes

│

├── frontend/

│ ├── index.html # UI interface

│ └── styles.css # (optional) extracted CSS

│

└── README.md

## 📦 API Endpoints

| Method | Endpoint             | Description              |
|--------|----------------------|--------------------------|
| GET    | `/students`          | Get all students         |
| POST   | `/students`          | Add a new student        |
| PUT    | `/students/:id`      | Update a student's name  |
| DELETE | `/students/:id`      | Delete a student by ID   |

## 📝 Example `POST /students` body:
```
json
{
  "id": "101",
  "name": "John Doe"
}
```


---


## How to Run Locally

1. **Clone the repository**:

```
git clone https://github.com/yourusername/student-management-app.git
```
&& cd student-management-app

2. **Install dependencies**:

```
npm install
```

3. **Start the server**:

```
node server.js
```

The server will be running at: http://localhost:5000

4. **Open the frontend**:
Open `index.html` directly in your web browser.

---

## Features

- Add, edit, and delete students
- RESTful API with Express
- Simple, clean UI

---

## Technologies Used

- Node.js
- Express.js
- Vanilla JavaScript, HTML, and CSS
- CORS

---

## API Endpoints

- **GET** `/students` - Get all students
- **POST** `/students` - Add a student (requires JSON with id and name)
- **PUT** `/students/:id` - Update student name by ID
- **DELETE** `/students/:id` - Delete student by ID

---

## Author

- Rahul Saroj
- [GitHub Profile](https://github.com/Rahulsaroj02)



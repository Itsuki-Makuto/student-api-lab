const express = require("express");
const students = require("./data/students.json");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve CSS
app.use(express.static(path.join(__dirname, "public")));

// Home page
app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
    <html>
      <head>
        <title>Student API</title>
        <link rel="stylesheet" href="/style.css">
      </head>

      <body>
        <div class="container">
          <div class="card">
            <h1>Student API</h1>
            <p>Welcome to the Student API Server.</p>

            <ul>
              <li>
                <a href="/api/students">GET /api/students</a>
              </li>

              <li>
                <a href="/api/count">GET /api/count</a>
              </li>

              <li>
                <a href="/api/students/random">
                  GET /api/students/random
                </a>
              </li>
            </ul>
          </div>
        </div>
      </body>
    </html>
  `);
});

//student count
app.get("/api/count", (req, res) => {
  res.json({
    count: students.length
  });
});

//random student
app.get("/api/students/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * students.length);
  const randomStudent = students[randomIndex];

  res.json(randomStudent);
});

//all students
app.get("/api/students", (req, res) => {
  res.json(students);
});

//student by ID
app.get("/api/students/:id", (req, res) => {
  const id = req.params.id;

  const student = students.find((s) => s.id === Number(id));

  if (!student) {
    return res.status(404).json({
      error: "Student not found"
    });
  }

  res.json(student);
});

// 404
app.use((req, res) => {
  res.status(404).json({
    error: "Not found"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

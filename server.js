const http = require("http");
const path = require("path");
const fs = require("fs/promises");

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  console.log(req.method, req.url);

  try {
    const dataFile = path.join(__dirname, "data", "students.json");
    const text = await fs.readFile(dataFile, "utf-8");
    const students = JSON.parse(text);

    if (req.url === "/") {
      res.writeHead(200, {
        "Content-Type": "text/html"
      });

      res.end(`
        <!DOCTYPE html>
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

    } else if (req.url === "/style.css") {
        const css = await fs.readFile(
        path.join(__dirname, "public", "style.css"),
        "utf-8"
        );

        res.writeHead(200, {
            "Content-Type": "text/css"
        });

  res.end(css);

    } else if (req.url === "/api/students") {
      res.writeHead(200, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify(students));

    } else if (req.url === "/api/count") {
      res.writeHead(200, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify({
        count: students.length
      }));

    } else if (req.url === "/api/students/random") {
        const randomIndex = Math.floor(Math.random() * students.length);
        const randomStudent = students[randomIndex];

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(randomStudent));

    } else {
      res.writeHead(404, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify({
        error: "Not found"
      }));
    }
    } catch (err) {
    res.writeHead(500, {
      "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
      error: "Server error",
      message: err.message
    }));
  }
});

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

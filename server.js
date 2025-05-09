const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Handle form submission
app.post("/submit-form", (req, res) => {
  const { name, email, message } = req.body;
  console.log("Form submission:", { name, email, message });
  // Here you would typically save this data to a database
  // For now, we'll just send a success response
  res.json({ success: true, message: "Form submitted successfully" });
});

// Catch-all route to serve the main HTML file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/login", (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
  const password = req.body.password;

  const query = "SELECT * FROM employee WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (results.length === 0)
      return res.status(401).json({ message: "Email not found" });

    const user = results[0];
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email },
    });
  });
});


// POST /HR/leave-application
router.post("/leave-application", (req, res) => {
  const { employee_id, from_date, to_date, reason } = req.body;

  const query = `
    INSERT INTO leave_applications (employee_id, from_date, to_date, reason)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [employee_id, from_date, to_date, reason], (err, result) => {
    if (err) {
      console.error("Error posting leave:", err);
      return res.status(500).json({ message: "Failed to apply for leave" });
    }

    res.status(200).json({ message: "Leave request submitted successfully" });
  });
});

router.get("/employee-leaves/:employeeId", (req, res) => {
  const { employeeId } = req.params;

  const query = `
    SELECT id, from_date, to_date, reason, status 
    FROM leave_applications 
    WHERE employee_id = ?
  `;

  db.query(query, [employeeId], (err, results) => {
    if (err) {
      console.error("Error fetching leaves:", err);
      return res.status(500).json({ message: "Failed to fetch leaves" });
    }
    res.status(200).json(results);
  });
});

router.post("/change-password", async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  const query = "SELECT * FROM employee WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];

    if (user.password !== oldPassword) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    const updateQuery = "UPDATE employee SET password = ? WHERE email = ?";
    db.query(updateQuery, [newPassword, email], (updateErr) => {
      if (updateErr) {
        return res.status(500).json({ message: "Failed to change password" });
      }
      res.json({ message: "Password changed successfully" });
    });
  });
});
// GET /get-employee/:id — Get single employee
router.get("/get-employee/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM employee WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching employee:", err);
      return res.status(500).json({ message: "Failed to fetch employee" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(results[0]);
  });
});

module.exports = router;

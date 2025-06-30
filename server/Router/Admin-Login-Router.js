const express =require("express")
const db =require("../db")
const router =express.Router()


router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  
  db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password],
    (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: 'Email already exists' });
        }
        return res.status(500).json({ message: 'Database error' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    }
  );
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (results.length === 0) return res.status(401).json({ message: 'Invalid email or password' });

    const user = results[0];
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
  });
});

router.post("/add-employee", (req, res) => {
  const { name, email, department, role, salary,password } = req.body;

  const query = `INSERT INTO employee (name, email, department, role, salary,password) VALUES (?, ?, ?, ?, ?,?)`;
  db.query(query, [name, email, department, role, salary,password], (err, result) => {
    if (err) {
      console.error("Error inserting employee:", err);
      return res.status(500).json({ message: "Failed to add employee" });
    }
    res.status(200).json({ message: "Employee added successfully", employee:{
         id: result.insertId,
        name,
        email,
        department,
        role,
        salary
    } });
  });
});

// Update employee by ID
router.put("/update-employee/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, department, role, salary } = req.body;

  const query = `
    UPDATE employee 
    SET name = ?, email = ?, department = ?, role = ?, salary = ?
    WHERE id = ?
  `;

  db.query(query, [name, email, department, role, salary, id], (err, result) => {
    if (err) {
      console.error("Error updating employee:", err);
      return res.status(500).json({ message: "Failed to update employee" });
    }
    res.status(200).json({ message: "Employee updated successfully" });
  });
});

// Delete employee by ID
router.delete("/delete-employee/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM employee WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting employee:", err);
      return res.status(500).json({ message: "Failed to delete employee" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  });
});

// POST /HR/change-password
router.post("/change-password", async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];


    if (user.password !== oldPassword) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    const updateQuery = "UPDATE users SET password = ? WHERE email = ?";
    db.query(updateQuery, [newPassword, email], (updateErr) => {
      if (updateErr) {
        return res.status(500).json({ message: "Failed to update password" });
      }
      res.json({ message: "Password updated successfully" });
    });
  });
});


// GET /employees — Get all employees
router.get('/employees', (req, res) => {
  const query = 'SELECT * FROM employee';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching employees:', err);
      return res.status(500).json({ message: 'Failed to fetch employees' });
    }

    res.status(200).json(results);
  });
});


module.exports =router;
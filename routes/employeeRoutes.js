const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee"); 

router.get("/home", async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.render("home", { employees });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


router.get("/add", (req, res) => {
  res.render("add");
});


router.post("/add", async (req, res) => {
  try {
    const { name, designation, location, salary } = req.body;
    await Employee.create({
      name,
      designation,
      location,
      salary: parseInt(salary),
    });
    res.redirect("/api/home");
  } catch (err) {
    console.error(err);
    res.status(400).send("Failed to add employee");
  }
});


router.post("/delete/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.redirect("/api/home");
  } catch (err) {
    console.error(err);
    res.status(400).send("Failed to delete employee");
  }
});


router.get("/update/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).send("Employee not found");
    res.render("update", { employee });
  } catch (err) {
    console.error(err);
    res.status(400).send("Invalid ID");
  }
});


router.post("/update/:id", async (req, res) => {
  try {
    const { name, designation, location, salary } = req.body;
    await Employee.findByIdAndUpdate(req.params.id, {
      name,
      designation,
      location,
      salary: parseInt(salary),
    });
    res.redirect("/api/home");
  } catch (err) {
    console.error(err);
    res.status(400).send("Failed to update employee");
  }
});

module.exports = router;

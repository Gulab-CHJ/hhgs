const express = require("express");
const router = express.Router();

const Student = require("../../models/modelsStudent.js");

const AddStudent = require("../../pages/addpages/addStudent");
const AllStudents = require("../../pages/allexelpage/allStudents.js");
const EditStudent = require("../../pages/editpages/editStudent");

// ==========================
// Add Student Page
// ==========================

router.get("/admin/add-student", (req, res) => {

    res.send(AddStudent());

});

// ==========================
// Save Student
// ==========================

router.post("/admin/add-student", async (req, res) => {

    try {

        const student = new Student({

            name: req.body.name,
            fatherName: req.body.fatherName,
            course: req.body.course,
            mobile: req.body.mobile,
            email: req.body.email,
            address: req.body.address,
            image: req.body.image,
            description: req.body.description

        });

        await student.save();

        res.redirect("/admin/students");

    } catch (err) {

        console.log(err);

        res.status(500).send(err.message);

    }

});

// ==========================
// All Students
// ==========================

router.get("/admin/students", async (req, res) => {

    const students = await Student.find().sort({ createdAt: -1 });

    res.send(AllStudents(students));

});

// ==========================
// Edit Page
// ==========================

router.get("/admin/edit-student/:id", async (req, res) => {

    const student = await Student.findById(req.params.id);

    res.send(EditStudent(student));

});

// ==========================
// Update Student
// ==========================

router.post("/admin/edit-student/:id", async (req, res) => {

    await Student.findByIdAndUpdate(req.params.id, {

        name: req.body.name,
        fatherName: req.body.fatherName,
        course: req.body.course,
        mobile: req.body.mobile,
        email: req.body.email,
        address: req.body.address,
        image: req.body.image,
        description: req.body.description

    });

    res.redirect("/admin/students");

});

// ==========================
// Delete Student
// ==========================

router.get("/admin/delete-student/:id", async (req, res) => {

    await Student.findByIdAndDelete(req.params.id);

    res.redirect("/admin/students");

});

module.exports = router;
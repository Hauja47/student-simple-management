const express = require('express');
const multer = require("multer");
const router = express.Router();
const fs = require('fs');

const Student = require('../models/student');
const sequelize = require('../configs/sequelize');
const s3 = require('../configs/aws_s3');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/* GET home page. */
router.get('/', async function (req, res, next) {
    try {
        const students = await Student.findAll();
        res.render('students', {students});
    } catch (err) {
        next(err);
    }
});

router.post('/student', upload.single('student_image'), async function (req, res, next){
    const {
        first_name,
        last_name,
        dob,
        gender,
        email,
        phone_no,
        address,
        department,
        skill
    } = req.body;
    const student_image_file = req.file;

    const t = await sequelize.transaction();
    try {
        const student = await Student.create({
            first_name,
            last_name,
            dob,
            gender,
            email_id: email,
            phone_no,
            address,
            department,
            skill
        });

        if (!student_image_file) {
            const img_file_name = `student-images/${student.student_id}.jpg`;

            const uploadParams = {
                Bucket: process.env.AWS_S3_BUCKET,
                Key: img_file_name,
                Body: student_image_file.buffer
            };

            s3.upload(uploadParams, (err, data) => {
                console.log(err);
            })
        }

        await t.commit();

        res.redirect('/');
    } catch(err) {
        await t.rollback();
        next(err)
    }
})

module.exports = router;

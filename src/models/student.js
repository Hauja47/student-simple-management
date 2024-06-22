const {DataTypes} = require('sequelize');
const sequelize = require('../configs/sequelize');

const Student = sequelize.define(
    'student',
    {
        student_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING(50),
        },
        last_name: {
            type: DataTypes.STRING(50),
        },
        dob: {
            type: DataTypes.DATE,
        },
        gender: {
            type: DataTypes.ENUM('Male', 'Female', 'Other'),
        },
        email_id: {
            type: DataTypes.STRING(100),
            validate: {
                isEmail: true,
            },
        },
        phone_no: {
            type: DataTypes.STRING(15),
            validate: {
                isNumeric: true
            }
        },
        address: {
            type: DataTypes.TEXT
        },
        department: {
            type: DataTypes.STRING(50)
        },
        skill: {
            type: DataTypes.TEXT
        }
    },
    {
        timestamps: false
    }
);

module.exports = Student;
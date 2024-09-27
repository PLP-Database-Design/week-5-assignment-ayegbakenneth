const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

// Question 1. Retrieve all patients

app.get('/patients', (req, res) =>{
    const patientsQuery = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    db.query(patientsQuery, (error, result) =>{
        if(error){
            console.error('Error retrieving patients information.');
            res.status(500).json({error: 'Internal server error'});
        }
        res.json(result);
    });
});

// Question 2. Retrieve all providers

app.get('/providers', (req, res) =>{
    const providersQuery = 'SELECT first_name, last_name, provider_specialty From providers'
    db.query(providersQuery, (error, result) => {
        if(error) {
            console.error('Error retrieving providers informations.');
            res.status(500).json({error: 'Internal server error'});
        }
        res.json(result);
    });
});

// Question 3. Filter patients by First Name

app.get('/patients/by_first_name', (req, res) => {
    const firstName = req.query.first_name;

    db.query('SELECT * FROM patients WHERE first_name = ?', [firstName], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

// Question 4. Retrieve all providers by their specialty

app.get('/providers/by_provider_specialty', (req, res) => {
    const specialty = req.query.provider_specialty;

    db.query('SELECT * FROM providers WHERE provider_specialty = ?', [specialty], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

app.use(express.json());
app.use(cors());
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

db.connect((error) => {
    if (error) {
        console.error('Error connecting to the database:', error.message);
    } else {
        console.log('Connection successful.');

        const serverPort = process.env.SERVER_PORT || 3000;

        app.listen(serverPort, () => {
            console.log(`server is runnig on http://localhost:${serverPort}`);
        });
    }
});
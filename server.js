const inquirer = require('inquirer');
const fs = require('fs');
// Import and require mysql2
const mysql = require('mysql2');
require('dotenv').config();

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'password',
      database: 'DATABASE_NAME'
    },
    console.log(`Connected to the DATABASE_NAME database.`)
  );
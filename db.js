const Pool = require('pg').Pool; 
const pool = new Pool({
    user: "postgres",
    password: "Roma03012001",
    host: "localhost",
    port: "5432",
    database: "spring"
});

module.exports = pool;

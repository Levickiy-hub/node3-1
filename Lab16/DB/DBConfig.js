const config = {
    driver: 'msnodesqlv8', connectionString: "Driver={SQL Server Native Client 11.0};Server={PC\\SQLEXPRESS};Database={lab16};Trusted_Connection={yes};",
    pool: { max: 10, min: 0, softIdleTimeoutMillis: 5000, idleTimeoutMillis: 10000 }
};

module.exports = config;

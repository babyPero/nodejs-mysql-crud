var express = require('express')
var app = express()

app.get('/', function(req, res) {
    // render to views/index.ejs template file
    res.render('index', {title: 'My Node.js Application'})

    var mysql_host = process.env.OPENSHIFT_MYSQL_DB_HOST
    var mysql_url = process.env.OPENSHIFT_MYSQL_DB_URL
    var mysql_port = process.env.OPENSHIFT_MYSQL_DB_PORT
    var mysql_usrname = process.env.OPENSHIFT_MYSQL_DB_USERNAME
    var mysql_pwd = process.env.OPENSHIFT_MYSQL_DB_PASSWORD

    console.log('_____________________________________')
    console.log('host:' + mysql_host)
    console.log('url:' + mysql_url)
    console.log('port:' + mysql_port)
    console.log('usrname:' + mysql_usrname)
    console.log('pwd:' + mysql_pwd)

    var mysqlServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
    var	mysqlHost = process.env[mysqlServiceName + '_SERVICE_HOST']
    var	mysqlPort = process.env[mysqlServiceName + '_SERVICE_PORT']
    var	mysqlDB = process.env[mysqlServiceName + '_DATABASE']
    var	mysqlPassword = process.env[mysqlServiceName + '_PASSWORD']
    var	mysqlUser = process.env[mysqlServiceName + '_USER']

    console.log('_____________________________________')
    console.log('service name :' + mysqlServiceName)
    console.log('host:' + mysqlHost)
    console.log('port:' + mysqlPort)
    console.log('pwd:' + mysqlPassword)
    console.log('usrname:' + mysqlUser)
    console.log('database:' + mysqlDB)

    //Database setup - create tables
    var jobpostingsDb_init = 'CREATE TABLE IF NOT EXISTS jobpostings('
	+ 'job_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,'
	+ 'job_title VARCHAR(40) NOT NULL,'
	+ 'job_description VARCHAR(100) NOT NULL,'
	+ 'location VARCHAR(30) NOT NULL,'
	+ 'posted_date TIMESTAMP NOT NULL'
	+ ')'

    var applicantsDb_init = 'CREATE TABLE IF NOT EXISTS applicants('
	+ 'applicant_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, '
	+ 'first_name VARCHAR(40) NOT NULL, '
	+ 'last_name VARCHAR(40) NOT NULL,'
	+ 'email VARCHAR(50),'
	+ 'phone VARCHAR(20),'
	+ 'job_id INT UNSIGNED NOT NULL,'
	+ 'applied_date TIMESTAMP NOT NULL'
	+ ')'

    req.getConnection(function(error, conn) {
        conn.query(jobpostingsDb_init, function (err) {
            if (err) {
		console.log("error creating DB")
		throw err
	    } else {
		console.log("tables created")
	    }
        })
    })

    req.getConnection(function(error, conn) {
        conn.query(applicantsDb_init, function (err) {
            if (err) {
                console.log("error creating DB")
                throw err
            } else {
                console.log("tables created")
            }
        })
    })
})

/** 
 * We assign app object to module.exports
 * 
 * module.exports exposes the app object as a module
 * 
 * module.exports should be used to return the object 
 * when this file is required in another module like app.js
 */ 
module.exports = app;

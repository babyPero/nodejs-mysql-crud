var mysqlHost = process.env.MYSQL_SERVICE_HOST,
    mysqlPort = process.env.MYSQL_SERVICE_PORT,
    mysqlUser = process.env.MYSQL_USER,
    mysqlPwd = process.env.MYSQL_PASSWORD,
    mysqlDb = process.env.MYSQL_DATABASE

var config = {
    database: {
	host:	   mysqlHost, 	// database host
	user: 	   mysqlUser, 	// database username
	password:  mysqlPwd, 	// database password
	port: 	   mysqlPort,   // MySQL port
	db: 	   mysqlDb      // database name
    },
    server: {
	host: '127.0.0.1',
	port: '3000'
    }
}

module.exports = config

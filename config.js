var mysqlHost = process.env.MYSQL_SERVICE_HOST,
    mysqlPort = process.env.MYSQL_SERVICE_PORT

var config = {
	database: {
		host:	   mysqlHost, 	// database host '172.30.83.49'
		user: 	   'mhirota', 		// database username
		password:  'password', 		// database password
		port: 	   mysqlPort, 	         // MySQL port '3306'
		db: 	   'sampledb' 		// database name
	},
	server: {
		host: '127.0.0.1',
		port: '3000'
	}
}

module.exports = config

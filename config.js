var mysqlURL = process.env.OPENSHIFT_MYSQL_DB_URL

var config = {
	database: {
		host:	   mysqlURL, 	// database host '172.30.83.49'
		user: 	  'mhirota', 		// database username
		password: 'password', 		// database password
		port: 	  '3306', 	         // MySQL port
		db: 	  'sampledb' 		// database name
	},
	server: {
		host: '127.0.0.1',
		port: '3000'
	}
}

module.exports = config

var mssqlHost = process.env.MSSQL_RHEL_TEST_MH_SERVICE_HOST,
    mssqlPort = process.env.MSSQL_RHEL_TEST_MH_SERVICE_PORT,
    mssqlUer =  process.env.MSSQL_USER.toString(),
    mssqlPwd =  process.env.MSSQL_SA_PASSWORD,
    mssqlDb =  process.env.MSSQL_DATABASE

var config = {
    database: {
	host:	   mssqlHost,      //mssqlHost,      // database host '127.0.0.1'
	user: 	   mssqlUer,       // database username
	password:  mssqlPwd,       // database password
	port: 	   mssqlPort,      // database port
	db: 	   mssqlDb         // database name
    }
}

module.exports = config

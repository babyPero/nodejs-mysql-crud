var mssqlHost = process.env.MSSQL_SERVICE_HOST,
    mssqlPort = process.env.MSSQL_SERVICE_PORT,
    mssqlUer =  process.env.MSSQL_USER,
    mssqlPwd =  process.env.MSSQL_SA_PASSWORD,
    mssqlDb =  process.env.MSSQL_DATABASE

var config = {
    database: {
	host:	   '127.0.0.1'     //mssqlHost,      // database host
	user: 	   mssqlUer,       // database username
	password:  mssqlPwd,       // database password
	port: 	   mssqlPort,      // database port
	db: 	   mssqlDb         // database name
    }
}

module.exports = config

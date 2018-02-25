var express = require('express')
var app = express()

var mysql = require('mysql')

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'

/**
 * This middleware provides a consistent API 
 * for MySQL connections during request/response life cycle
 */ 
var myConnection  = require('express-myconnection')

/**
 * Store database credentials in a separate config.js file
 * Load the file/module and its values
 */

var mssql = require("mssql")
var config = require('./config')

// config for your database
var dbOptions = {
    user:        config.database.user,
    password:    config.database.password,
    server:      config.database.host,
    database:    config.database.db,
    port:        config.database.port,
    options: {
        encrypt: true
    }
}

console.log('dbOptions-----')
console.log(dbOptions)
console.log('process.env-----')
console.log(process.env)

// connect to mssql database
var connection = mssql.connect(dbOptions, function (err) {
    if (err)
        throw err;
    console.log('mssql connected');
});


app.get('/', function (req, res) {
    console.log('app.get"/"---------------------------')

    (async function () {
	try {
            let pool = await sql.connect(config)
            let result1 = await pool.request()
	    //.input('input_parameter', sql.Int, value)
		.query('select * from sampledb')

	    console.logt('db connected2');
            console.dir(result1)

            // Stored procedure
	    /*
            let result2 = await pool.request()
		.input('input_parameter', sql.Int, value)
		.output('output_parameter', sql.VarChar(50))
		.execute('procedure_name')

            console.dir(result2)
	    */
	} catch (err) {
            // ... error checks
	    console.log('ERROR');
	}
    })()

    sql.on('error', err => {
	// ... error handler
	console.log('ERROR2');
    })
})

/**
 * 3 strategies can be used
 * single: Creates single database connection which is never closed.
 * pool: Creates pool of connections. Connection is auto release when response ends.
 * request: Creates new connection per new request. Connection is auto close when response ends.
 */ 
//app.use(myConnection(mysql, dbOptions, 'pool'))

/**
 * setting up the templating view engine
 */ 
app.set('view engine', 'ejs')

/**
 * import routes/index.js
 * import routes/postings.js
 * import routes/applicants.js
 */ 
var index = require('./routes/index')
var postings = require('./routes/postings')
var applicants = require('./routes/applicants')

/**
 * Express Validator Middleware for Form Validation
 */ 
var expressValidator = require('express-validator')
app.use(expressValidator())

/**
 * body-parser module is used to read HTTP POST data
 * it's an express middleware that reads form's input 
 * and store it as javascript object
 */ 
var bodyParser = require('body-parser')
/**
 * bodyParser.urlencoded() parses the text as URL encoded data 
 * (which is how browsers tend to send form data from regular forms set to POST) 
 * and exposes the resulting object (containing the keys and values) on req.body.
 */ 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/**
 * This module let us use HTTP verbs such as PUT or DELETE 
 * in places where they are not supported
 */ 
var methodOverride = require('method-override')

/**
 * using custom logic to override method
 * 
 * there are other ways of overriding as well
 * like using header & using query value
 */ 
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

/**
 * This module shows flash messages
 * generally used to show success or error messages
 * 
 * Flash messages are stored in session
 * So, we also have to install and use 
 * cookie-parser & session modules
 */ 
var flash = require('express-flash')
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser('keyboard cat'))
app.use(session({ 
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}))
app.use(flash())

app.use('/', index)
app.use('/postings', postings)
app.use('/applicants', applicants)

/*
app.listen(port, ip, function(){
    console.log('Server running on http://%s:%s', ip, port)
})
*/

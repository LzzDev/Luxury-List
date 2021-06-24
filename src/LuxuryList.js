process.env.NODE_ENV = process.argv.includes( '--development' ) ? 'development' : 'production';


// Packages
global.express = require( 'express' );
global._       = require( 'lodash'  );
global.path    = require( 'path'    );

const settings    = require( '../settings.json'     );
const settingsDev = require( '../settings-dev.json' );

global.settings = process.env.NODE_ENV == 'development' ?
    _.merge( settings, settingsDev ) :
    settings;


// Services
const service = s => require( `./services/${ s }` );
global.discord = service( 'discord' );

// Utils


// App
global.app = express();
app.port = global.settings.website.port.http;

app.set( 'view engine', 'ejs' );
app.set( 'views',       path.join( __dirname, 'views' ) );

app.use( express.static( path.join( __dirname, 'public' ) ) );

app.get( '/', ( req, res ) => {
    res.render( 'index.ejs' );
} );
app.get( '/hello', ( req, res ) => {
    res.render( 'hello.ejs' );
} );


// Error Handler
app.use( ( error, req, res, next ) => {
    console.error( error.stack );
    res.status( 500 ).send( 'Something Broke! All I know is: ' + error.message.replace( __dirname, '' ) );
} );


// Listen
app.listen( app.port, () => console.log('[LuxuryList] Ready on port ' + app.port + '. http' + (process.env.NODE_ENV == 'development' ? '' : 's') + '://localhost:' + app.port));
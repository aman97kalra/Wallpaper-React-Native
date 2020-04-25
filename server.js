/* eslint-disable */

const express = require( 'express' );
const socketIO = require( 'socket.io' );
const multer = require( 'multer' );
const bodyParser = require( 'body-parser' );
const compression = require( 'compression' );
const colors = require( 'colors' );
const _ = require( 'lodash' );
const urlencode = require( 'urlencode' );
const path = require( 'path' );
const morgan = require( 'morgan' );

// server configuration
const PROTOCOL = 'http://';
const HOST = 'localhost';
const PORT = '9000';
const SERVER_URL = PROTOCOL + HOST + ':' + PORT;
const JSON_DIR = path.resolve( __dirname + '/src/assets/jsons' );
const IMAGES_DIR = path.resolve( __dirname + '/src/assets/images' );
const FILES_DIR = path.resolve( __dirname + '/src/assets/files' );
const UPLOAD_DIR = path.resolve( __dirname + '/upload' );
const FILE_INPUT_NAME = 'file';

// create express app
const app = express();

// multer (file upload)
const uploadFile = multer( {
    storage: multer.diskStorage( {

        // used to determine within which folder the uploaded files should be stored.
        destination: ( req, file, cb ) => {
            cb( null, UPLOAD_DIR );
        },

        // used to determine what the file should be named inside the folder.
        // If no filename is given, each file will be given a random name that doesn't include any file extension
        filename: ( req, file, cb ) => {
            const filename = urlencode.decode( file.originalname );
            _.set( req, 'multer.filename', filename );
            cb( null, filename );
        }
    } )
} );

// delay middleware function
const delay = ( delay = 100 ) => {
    return ( request, response, next ) => {
        setTimeout( next, delay );
    };
};

// log requests
app.use( morgan( 'tiny' ) );

// parse json, text body etc.
app.use(
    bodyParser.json( { limit: '50mb' } ),
    bodyParser.text( { limit: '50mb' } )
);

// set json spaces (pretty json)
app.set( 'json spaces', 4 );

// use compression to compress response
app.use( compression() );

// set appropriate CORS header
app.use( ( req, res, next ) => {
    res.set( {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': req.get( 'Access-Control-Request-Headers' ),
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    } );

    next();
} );

// allow OPTIONS request and return response immediately
app.use( ( req, res, next ) => {
    if( 'OPTIONS' === req.method ) {
        return res.end();
    }

    return next();
} );


/***********************/


// return 401
/* app.use( '*', ( req, res ) => {
    res.sendStatus( 401 );
} ); */

// get sample response
app.get( '/', ( req, res ) => {
    res.send( 'WORKING' );
} );

// serve json files
app.use( '/jsons', delay( 1000 ), express.static( JSON_DIR ) );
//app.all( '/jsons/*', ( req, res ) => res.sendStatus( 401 ) );

// serve images files
app.use( '/images', express.static( IMAGES_DIR ) );

// serve raw files
app.use( '/files', express.static( FILES_DIR ) );

// serve json files
app.use( '/json', express.static( JSON_DIR ) );

// get uploaded file
app.use( '/upload', express.static( UPLOAD_DIR ) );

// upload a file and send URL back
app.post( '/upload', uploadFile.single( FILE_INPUT_NAME ), ( req, res ) => {
    res.send( {
        filename: req.multer.filename,
        url: `${ SERVER_URL }/upload/${ req.multer.filename }`,
        timestamp: Date.now()
    } );
} );

// submit form and return JSON resoonse
app.post( '/jsons/*', ( req, res ) => {
	console.log( 'req.path', req.path );
    res.sendFile(  __dirname + '/src/assets/' + req.path );
} );

// submit form and return JSON resoonse
app.put( '/jsons/*', ( req, res ) => {
    res.sendFile(  __dirname + '/src/assets/' + req.path );
} );

/***********************/

// listen app on port
const server = app.listen( PORT, () => {

    // print hosting imformation
    console.log(
        colors.green(
            `App is running on port ${ colors.black.bgYellow.bold( ' ' + PORT + ' ' ) } at ${ colors.white.bgBlue.italic( ' ' + SERVER_URL + ' ' ) }`
        )
    );

    // separator
    console.log( colors.grey( '--------------------------------------------------------' ) );

    // print json directory
    console.log(
        colors.grey(
            `Upload directory is ${ colors.white.italic( JSON_DIR ) }`
        )
    );

    // print upload directory
    console.log(
        colors.grey(
            `Upload directory is ${ colors.white.italic( UPLOAD_DIR ) }`
        )
    );

    // file input name
    console.log(
        colors.grey(
            `File input name is ${ colors.white.italic( FILE_INPUT_NAME ) }`
        )
    );
} );

// add server latency
//server.setTimeout( 500 ); // 500ms


/***********************/


// socket.io
const io = socketIO( server );

io.on( 'connection', ( socket ) => {
    console.log(
        colors.bgGreen.white.bold( ' SOCKET-IO ' ),
        colors.white( `A user with session id ${ colors.bold( socket.id ) } connected.` )
    );

    // when user disconnects
    socket.on( 'disconnect', () => {
        console.log(
            colors.bgRed.white.bold( ' SOCKET-IO ' ),
            colors.white( `User with session id ${ colors.bold( socket.id ) } disconnected.` )
        );
    } );

    // when user sends a message : `message` event
    socket.on( 'message', ( data ) => {
        console.log(
            colors.bgMagenta.white.bold( ' SOCKET-IO ' ),
            colors.grey( `User with session id ${ colors.bold( socket.id ) } sent message.` ),
            data
        );

        // send sample response back : `message` event
        socket.emit( 'message', {
            data: data,
            timestamp: Date.now()
        } );
    } );
} );

const express = require( 'express' );
const mongoose = require( 'mongoose' );
mongoose.connect('mongodb://localhost/quotes_db', {useNewUrlParser: true});

const {UserModel} = require( './models/userModel' );

// This package is deprecated, use instead the jsonParser integrated within express
// Look at line 12 for the usage
//const bodyParser = require( 'body-parser' );
const app = express();

app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );

// This code is deprecated, use instead line 10
//app.use( bodyParser.urlencoded({extended:true}) );
app.use( express.urlencoded({extended:true}) );


app.get( '/', function( request, response ){
    // UserModel
    //     .getUsers()
    //     .then( data => {
    //         console.log( data );
    // { users : data }
            response.render( 'index');
        // });  
});

app.get( '/users/getById', function( request, response ){
    let id = Number( request.query.id );

    UserModel
        .getUserById( id )
        .then( result => {
            if( result === null ){
                throw new Error( "That user doesn't exist" );
            }
            response.render( 'user', { found: true, user: result } );
        })
        .catch( error => {
            response.render( 'user', { found: false } );
        });
});

app.get( '/users/:identifier', function( request, response ){
    let id = Number( request.params.identifier );

    UserModel
        .getUserById( id )
        .then( result => {
            if( result === null ){
                throw new Error( "That user doesn't exist" );
            }
            response.render( 'user', { found: true, user: result } );
        })
        .catch( error => {
            response.render( 'user', { found: false } );
        });
});

app.post( '/users/addUser', function( request, response ){
    console.log( request.body );
    const name = request.body.name;
    const quote = request.body.quote;

    // Run validations to see if the 'id' is not already in the list
    const newEntry = {
        name,
        quote
    };
    console.log( newEntry );
    UserModel
        .createUser( newEntry )
        .then( result => {
            console.log( result );
        })
        .catch( err => {
            console.log( "Something went wrong!" );
            console.log( err );
        })

    response.redirect( '/quotes' );
});

app.get( '/quotes', function( request, response ){
    UserModel
        .getUsers()
        .then( data => {
            console.log( data );
    { users : data }
    response.render( 'quotes', {users: data});
    });  
});

app.listen( 8000, function(){
    console.log( "The users server is running in port 8000." );
});
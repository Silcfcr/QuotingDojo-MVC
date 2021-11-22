const express = require( 'express' );
const mongoose = require( 'mongoose' );
mongoose.connect('mongodb://localhost/users_db', {useNewUrlParser: true});

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
const users = [
    {
        name : "Michael Miller",
        id : 123
    },
    {
        name : "Julie Gomez",
        id : 456
    },
    {
        name : "Roger Martinez",
        id : 789
    },
    {
        name : "Alex Santos",
        id : 555
    }
];

app.get( '/users', function( request, response ){
    UserModel
        .getUsers()
        .then( data => {
            console.log( data );
            response.render( 'index', { users : data } );
        });  
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
    const id = Number(request.body.userId);
    const firstName = request.body.firstName;
    const lastName = request.body.lastName;

    // Run validations to see if the 'id' is not already in the list
    const newUser = {
        id,
        firstName,
        lastName
    };
    console.log( newUser );
    UserModel
        .createUser( newUser )
        .then( result => {
            console.log( result );
        })
        .catch( err => {
            console.log( "Something went wrong!" );
            console.log( err );
        })

    response.redirect( '/users' );
});

app.listen( 8080, function(){
    console.log( "The users server is running in port 8080." );
});
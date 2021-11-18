const express = require( 'express' );
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
    response.render( 'index', {users} );
});

app.get( '/users/getById', function( request, response ){
    let id = Number( request.query.id );

    let result = users.find( user => {
        if( user.id === id ){
            return user;
        }
    });

    if( result === undefined ){
        response.render( 'user', { found: false } );
    }
    else{
        response.render( 'user', { found: true, user: result } );
    }
});

app.get( '/users/:identifier', function( request, response ){
    let id = Number( request.params.identifier );

    let result = users.find( user => {
        if( user.id === id ){
            return user;
        }
    });

    if( result === undefined ){
        response.render( 'user', { found: false } );
    }
    else{
        response.render( 'user', { found: true, user: result } );
    }
});

app.post( '/users/addUser', function( request, response ){
    console.log( request.body );
    const id = request.body.userId;
    const name = request.body.userName;

    // Run validations to see if the 'id' is not already in the list
    const newUser = {
        id,
        name
    };

    users.push( newUser );

    response.redirect( '/users' );
});

app.listen( 8080, function(){
    console.log( "The users server is running in port 8080." );
});
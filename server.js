const express = require( 'express' );
require('./server/config/database');

// const {UserModel} = require( './server/models/userModel' );
const { UserRouter } = require('./server/routes/userRouter');

const app = express();

app.set( 'views', __dirname + '/client/views' );
app.set( 'view engine', 'ejs' );

app.use( express.urlencoded({extended:true}) );
app.use('/users', UserRouter);

// app.get( '/', function( request, response ){
//     // UserModel
//     //     .getUsers()
//     //     .then( data => {
//     //         console.log( data );
//     // { users : data }
//             response.render( 'index');
//         // });  
// });

// app.get( '/users/getById', function( request, response ){
//     let id = Number( request.query.id );

//     UserModel
//         .getUserById( id )
//         .then( result => {
//             if( result === null ){
//                 throw new Error( "That user doesn't exist" );
//             }
//             response.render( 'user', { found: true, user: result } );
//         })
//         .catch( error => {
//             response.render( 'user', { found: false } );
//         });
// });

// app.get( '/users/:identifier', function( request, response ){
//     let id = Number( request.params.identifier );

//     UserModel
//         .getUserById( id )
//         .then( result => {
//             if( result === null ){
//                 throw new Error( "That user doesn't exist" );
//             }
//             response.render( 'user', { found: true, user: result } );
//         })
//         .catch( error => {
//             response.render( 'user', { found: false } );
//         });
// });

// app.post( '/users/addUser', function( request, response ){
//     console.log( request.body );
//     const name = request.body.name;
//     const quote = request.body.quote;

//     // Run validations to see if the 'id' is not already in the list
//     const newEntry = {
//         name,
//         quote
//     };
//     console.log( newEntry );
//     UserModel
//         .createUser( newEntry )
//         .then( result => {
//             console.log( result );
//         })
//         .catch( err => {
//             console.log( "Something went wrong!" );
//             console.log( err );
//         })

//     response.redirect( '/quotes' );
// });

// app.get( '/quotes', function( request, response ){
//     UserModel
//         .getUsers()
//         .then( data => {
//             console.log( data );
//     { users : data }
//     response.render( 'quotes', {users: data});
//     });  
// });

app.listen( 8000, function(){
    console.log( "The users server is running in port 8000." );
});
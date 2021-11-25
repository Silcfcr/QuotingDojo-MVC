const {UserModel} = require("./../models/userModel");

const UserController =  {
    loadIndex: function( request, response ){
        response.render( 'index');
    },
    getUser : function( request, response ){
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
    },
    addUser: function( request, response ){
        console.log( request.body );
        const name = request.body.name;
        const quote = request.body.quote;

        const newEntry = {
            name,
            quote
        };
        console.log( newEntry );
        UserModel
            .createUser( newEntry )
            .then( result => {
                console.log( result );
                response.redirect( '/users/quotes' );
            })
            .catch( err => {
                console.log( "Something went wrong!" );
                console.log( err );
                response.redirect( '/users/' );
            })

        
    },
    viewQuotes : function( request, response ){
                UserModel
                    .getUsers()
                    .then( data => {
                        console.log( data );
                { users : data }
                response.render( 'quotes', {users: data});
                });  
            }
}

module.exports = (UserController);
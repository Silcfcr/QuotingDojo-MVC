const mongoose = require( 'mongoose' );

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20
    },
    quote : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 200
    },

});

UserSchema.set('timestamps', true);

const User = mongoose.model( 'users', UserSchema );

const UserModel = {
    createUser : function( newUser ){
        return User.create( newUser );
    },
    getUsers : function(){
        return User.find();
    },
    getUserById : function( userId ){
        return User.findOne({ id : userId });
    }

};

module.exports = {UserModel};

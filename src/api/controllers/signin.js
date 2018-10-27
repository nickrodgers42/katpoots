const db = require('../../data/db');
const User = require('../../data/models/user');
const UserSession = require('../../data/models/session')

module.exports = function(server) {
    server.post('/account/signup', createUser);
    server.post('/account/signin', signIn)
    server.get('/account/verify', verify)
    server.get('/account/logout', logout);
};

async function createUser(req, res, next){
    const models = await db.connect();
    const newUser = await new models.user();
    const {body} = req;
    let {
        firstName,
        lastName,
        username,
        password,
        email
    } = body;

    email = email.toLowerCase();
    models.user.find({
        email: email
    }, (err, prevUsers) =>{
        if (err){
            return res.send({
                success: false,
                message: "Server error"
            });
        }
        else if (prevUsers.length > 0){
            return res.send({
                success: false,
                message: "Error: email already exists"
            })
        }
        else{
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.email = email;
            newUser.username = username;
            newUser.password = newUser.generateHash(password);
        
            newUser.save();
            res.json();
            next();
        }
    });
}

async function signIn(req, res, next){
    const models = await db.connect();
    const userSession = await new models.session();
    const {body} = req;
    let {
        email,
        password
    } = body;

    if (!email){
        return res.send({
            success: false,
            message: "Error email cannot be blank"
        });
    }
    if (!password){
        return res.send({
            success: false,
            message: "Error password cannot be blank"
        });
    }

    email = email.toLowerCase();

    models.user.find({
        email: email
    }, (err, users) =>{
        console.log(email);
        if (err){
            return res.send({
                success: false,
                message: "Server error"
            });
        }
        else if (users.length != 1){
            return res.send({
                success: false,
                message: "Error: invalid"
            })
        }
        else{
            const currentUser = users[0];
            if (!currentUser.validPassword(password)){
                return res.send({
                    success: false,
                    message: "Invalid Password"
                })
            }
            else{
                userSession.userId = currentUser._id;
                userSession.save((err, doc) =>{
                    if (err){
                        return res.send({
                            success:false,
                            message: 'Error: server error'
                        });
                    }
                    else{
                        return res.send({
                            success:true,
                            message: "Valid sign in",
                            token: doc._id,
                        });
                    }
                });
            }
        }
    });
}

async function verify(req, res, next){
    const models = await db.connect();
    const userSession = await new models.session();

    const { query } = req;
    const { token } = query;

    models.session.find({
        _id: token,
    }, (err, sessions) => {
        if (err){
            return res.send({
                success: false,
                message: "Error: Server error"
            });
        }
        else if (sessions.length != 1){
            return res.send({
                success: false,
                message: "Error: Invalid"
            });
        }
        else{
            return res.send({
                success: true,
                message: "yay it worked"
            });
        }
    });
}

async function logout(req, res, next){
    const models = await db.connect();

    const { query } = req;
    const { token } = query;

    models.session.findOneAndUpdate({
        _id: token,
    }, (err, sessions) =>{
        if(err){
            return res.send({
                success:false,
                message: "Error server error"
            });
        }
        else{
            return res.send({
                success:true,
                message: "logged out"
            });
        }
    });
}
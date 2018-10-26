const db = require('../../data/db');
const User = require('../../data/models/user');

module.exports = function(server) {
    console.log('in create account stuff');
    server.post('/createAccount', createUser);
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

    if (!firstName){
        return res.send({
            success: false,
            message: "Error first name cannot be blank"
        });
    }
    if (!lastName){
        return res.send({
            success: false,
            message: "Error last name cannot be blank"
        });
    }
    if (!username){
        return res.send({
            success: false,
            message: "Error username cannot be blank"
        });
    }
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
            next() //what does next do?
        }
    });
}
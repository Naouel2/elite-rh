const router = require('express').Router();
const Utilisateur = require('../config/index').Utilisateur;
const bcrypt = require('bcrypt-nodejs');
const jwt = require("jsonwebtoken");
const {jwtOptions} = require('../config/jwtOptions');


//function to add a user
const createUser = async ({ prenom_utilisateur , nom_utilisateur, email_utilisateur , mdp_utilisateur, telephone_utilisateur }) => {
    return await Utilisateur.create({ prenom_utilisateur , nom_utilisateur, email_utilisateur , mdp_utilisateur, telephone_utilisateur});
};

// find user
const getUser = async obj => {
    return await Utilisateur.findOne({
        where: obj,
    });
};


// POST /login
router.post('/login', async function(req, res, next) {
    
    const { email, password } = req.body;
    
    if (email && password) {
        let user = await getUser({ email_utilisateur: email });
        if (!user) {
          return  res.status(401).json({ message: 'No such user found' });
        }

        bcrypt.compare( password , user.mdp_utilisateur, (err, result) =>{
            if(err){
                 res.status(403).json({message :'incorrect password'});
            }
            if(result){
                
                let payload = { user   };
                console.log(jwtOptions.secretOrKey);
                let token = jwt.sign(payload, jwtOptions.secretOrKey);
               
                return res.status(200).json({ message: 'ok', token });
            }
            else{
              return  res.status(403).json({message :'incorrect password'});
            }

        })

    }
});

//register a new user POST /register
router.post('/register', async  function(req, res, next) {

    const user = await getUser({email_utilisateur : req.body.email});

    if(user)
    return   res.status(409).json({message : 'email already exists'});

    bcrypt.hash(req.body.password , null , null, (err, hash) => {

   
        createUser({
            prenom_utilisateur: req.body.firstName,
            nom_utilisateur: req.body.lastName,
            email_utilisateur : req.body.email,
            mdp_utilisateur : hash,
            telephone_utilisateur: req.body.phone
        }).then(user =>
            res.status(201).json({ user, msg: 'account created successfully' }) );
    })

});


module.exports = router;

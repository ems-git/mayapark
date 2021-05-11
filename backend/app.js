//  .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   API IMPORT

const express = require(`express`);
const bodyParser = require(`body-parser`);
const cors = require('cors');
const { body,check,param ,validationResult,checkSchema  } = require('express-validator');

//  .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   CLASS IMPORT

const MySqlUtilities = require('./utilities/MySqlUtilities')

//  .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   APP
const app = express();
const port = 4242;

app.use(bodyParser.json());
app.use(cors());

/*-------------------------------------------------------------------------------------------------*/
/*   .   .   .   .   .   .   .   .   .   .   .USER.   .   .   .   .   .   .   .   .   .   .   .   .*/
/*-------------------------------------------------------------------------------------------------*/

// GET ALL USERS
app.get(`/userList`, (req, res) => {
    MySqlUtilities.getUserList((result, error)=>
    {
        if(!error)
        {
            res.send(result);
        }
        else
        {
            res.status(500).send.error;
        }
    });
});

// CHECK INFORMATION OF CONNECTION  //
app.get(`/user/mail/:mail/password/:password`,
    param('mail', "L'adresse e-mail entrée ne correspond pas au format attendu").notEmpty().isEmail().withMessage(),
    param('password', 'Le mot de passe doit être composé de lettre, de chiffre et de certains caractère spéciaux "?!§"').notEmpty().isLength({ min:4}).matches(/^[a-zA-Z0-9?!§]*$/).withMessage(),
    (req, res) => {
        const errorsValidator = validationResult(req);
        if ( errorsValidator.isEmpty()) //  .   .   .   .   .   .   .   .   .   .   .   .   .   .validator OK
        {
            let userMail = req.params.mail;
            let userPassword = req.params.password;
            MySqlUtilities.getUser(userMail, userPassword, (result, error) => {
                if (!error) //  .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .callabck OK
                {
                    res.send(result);
                }
                else // .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .callabck NOT ok !!
                {
                    res.status(500).send.error;
                }
            });
        }
        else //  .   .   .   .   .   .   .   .   .   .   .   .   .   .  .   .   .   .   .   .   .validator NOT ok !!
        {
            const errors = errorsValidator.array();
            const errorsMsg =[];
            errors.forEach(error => {
                errorsMsg.push(error.msg);
            });
            res.status(400).send({ errorsValidator: errorsMsg});
        }
});

// LOGIN LOGOUT OF A USER (SET iSLog To true or false) //
app.put(`/user/id/:id_user/isLog/:isLog`,
    param('id_user', "L'id de l'utilisateur doit être un nombre entier").notEmpty().isInt().withMessage(),
    param('isLog', 'Cette valeur doit etre un booléen').notEmpty().isBoolean().withMessage(),
    (req, res) => {
        const errorsValidator = validationResult(req);
        if ( errorsValidator.isEmpty()) //  .   .   .   .   .   .   .   .   .   .   .   .   .   .validator OK
        {
            let userId = req.params.id_user;
            let userLog = req.params.isLog;
            MySqlUtilities.changeUserLog(userId, userLog, (result, error) => {
                if (!error) //  .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .callabck OK
                {
                    res.send(result);
                }
                else // .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .callabck NOT ok !!
                {
                    res.status(500).send.error;
                }
            });
        }
        else //  .   .   .   .   .   .   .   .   .   .   .   .   .   .  .   .   .   .   .   .   .validator NOT ok !!
        {
            const errors = errorsValidator.array();
            const errorsMsg =[];
            errors.forEach(error => {
                errorsMsg.push(error.msg);
            });
            res.status(400).send({ errorsValidator: errorsMsg});
        }
});

// CHECK USER EXISTANCE 
app.get(`/user/mail/:mail`, (req, res) => {
    let userMail = req.params.mail;
    MySqlUtilities.checkUser(userMail, (result, error)=>
    {
        if(!error)
        {
            res.send(result);
        }
        else
        {
            res.status(500).send.error;
        }
    });
});

// ADD NEW USER//
app.post(`/createUser`,
   (req, res) => {
       let user = req.body;
       MySqlUtilities.createUser(user, (result, error) => {
           if (!error) //  .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .callabck OK
           {
               res.send(result);
           }
           else // .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .callabck NOT ok !!
           {
               res.status(500).send.error;
           }
       });
});
/*---------------------------------------------------------------------------------------------------*/
/*   .   .   .   .   .   .   .   .   .   .   .ATTRACTION.   .   .   .   .   .   .   .   .   .   .   .*/
/*---------------------------------------------------------------------------------------------------*/

// GET ATTRACTION IN HIGH LIGHT //
app.get(`/attractionLight`, (req, res) => {
    MySqlUtilities.getHlAtr((result, error)=>
    {
        if(!error) //  .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .callabck OK
        {
            res.send(result);
        }
        else // .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .callabck NOT ok !!
        {
            res.status(500).send.error;
        }
    });
});

// GET ATTRACTION LIST //
app.get(`/attractionList`, (req, res) => {
    MySqlUtilities.getAtrList((result, error)=>
    {
        if(!error) //  .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .callabck OK
        {
            res.send(result);
        }
        else // .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .callabck NOT ok !!
        {
            res.status(500).send.error;
        }
    });
});

// GET THE USER RATING OF AN ATTRACTION //
app.get(`/userRating/user/:id_user/attraction/:id_atr`,
    param('id_user', "L'id de l'utilisateur doit être un nombre entier").notEmpty().isInt().withMessage(),
    param('id_atr', "L'id de l'attraction doit être un nombre entier").notEmpty().isInt().withMessage(),
    (req, res) => {
    let userId = req.params.id_user;
    let atrId = req.params.id_atr;
    MySqlUtilities.getUserRating(userId, atrId, (result, error)=>
    {
        if(!error) //  .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .callabck OK
        {
            res.send(result);
        }
        else // .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .callabck NOT ok !!
        {
            res.status(500).send.error;
        }
    });
});

/*------------------------------------------------------------------------------------------------*/
/*   .   .   .   .   .   .   .   .   .   .   .DAYS.   .   .   .   .   .   .   .   .   .   .   .   */
/*-------------------------------------------------------------------------------------------------*/
app.get(`/day/date/:date`, (req, res) => {
    let date = req.params.date;
    MySqlUtilities.getTicketAvailableDate(date, (result, error)=>
    {
        if(!error) //  .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .callabck OK
        {
            res.send(result);
        }
        else // .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .callabck NOT ok !!
        {
            res.status(500).send.error;
        }
    });
});































//  .   .   .   .   .   .   .   .   .   .   .   .   LISTEN APPLICATION
app.listen(port,()=>{
    console.log(`exemple app listening at http://localhost:${port}`);
});
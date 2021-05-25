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

// GET ALL USERS
app.get(`/users`, (req, res) => {
    MySqlUtilities.getUsers((result, error)=>
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
app.get(`/attractions`, (req, res) => {
    MySqlUtilities.getAttractions((result, error)=>
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

// DELETE AN ATTRACTION  //
app.delete(`/attraction/:id_atr`, (req, res) => {
    let idAtr=req.params.id_atr
    MySqlUtilities.delAttraction(idAtr,(result, error)=>
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
/*   .   .   .   .   .   .   .   .   .   .   .RATING.   .   .   .   .   .   .   .   .   .   .   . */
/*------------------------------------------------------------------------------------------------*/

// ADD NEW USER RATING//
app.post(`/setUserRating/user/:id_user/attraction/:id_atr/rating/:userRating`,
   (req, res) => {
       let userId = req.params.id_user;
       let atrId = req.params.id_atr;
       let userRating = req.params.userRating;
       MySqlUtilities.setUserRating(userId, atrId, userRating, (result, error) => {
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

// GET THE USER RATING OF AN ATTRACTION //
app.get(`/userRating/user/:id_user/attraction/:id_atr`,
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

// UPDATE USER RATING OF AN ATTRACTION //
app.put(`/setUserRating/user/:id_user/attraction/:id_atr/rating/:userRating`, (req, res) => {
    let userId = req.params.id_user;
    let atrId = req.params.id_atr;
    let userRating = req.params.userRating;
    MySqlUtilities.updateUserRating(userId, atrId, userRating , (result, error) => {
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

// UPDATE RATING OF AN ATTRACTION //
app.put(`/updtateRating/attraction/:id_atr/rating/:newRating/nbrRating/:ratingNbr`, (req, res) => {
    let atrId = req.params.id_atr;
    let newRating = req.params.newRating;
    let ratingNbr = req.params.ratingNbr;
    MySqlUtilities.updateRating(atrId, newRating, ratingNbr , (result, error) => {
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

// DELETE RATING WHEN ATTRACTION IS DELETE  //
app.delete(`/rating/attraction/:id_atr`, (req, res) => {
    let idAtr=req.params.id_atr
    MySqlUtilities.delRating(idAtr,(result, error)=>
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
/*------------------------------------------------------------------------------------------------*/

/** GET DATES OF EXISTING DAYS ON DATA BASE */
app.get(`/day/startDay/:start/endDays/:end`, (req, res) => {
    let start = req.params.start;
    let end = req.params.end;
    
    MySqlUtilities.getExistingDates(start,end, (result, error)=>
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

/** CHECK VALID TICKETS FOR A RESERVATION */
app.get(`/day/startDate/:start/endDate/:end/ticket/:tickets`, (req, res) => {
    let start = req.params.start;
    let end = req.params.end;
    let tickets = req.params.tickets; 
    
    MySqlUtilities.getValidTickets(start, end,tickets, (result, error)=>
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

/** REGISTER RESERVATION, RESEVE AND DAYS */
app.post(`/booking`, (req, res) => {
    let informations = req.body;
    MySqlUtilities.saveBooking(informations, (result, error)=>
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
/*   .   .   .   .   .   .   .   .   .   .RESERVATION.   .   .   .   .   .   .   .   .   .   .   .*/
/*------------------------------------------------------------------------------------------------*/

// GET USER RESERVATIONS LIST //
app.get(`/reservations/user/:id_user`, (req, res) => {
    let id_user = req.params.id_user;
    MySqlUtilities.getReservations(id_user,(result, error)=>
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

// UPDATE RESERVATION //
app.post(`/reservations/user/:id_user`, (req, res) => {
    let id_user = req.params.id_user;
    let ids_res = req.body.ids_res;

    console.log(id_user,ids_res)
    MySqlUtilities.updateReservation(id_user,ids_res,(result, error)=>
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
/*   .   .   .   .   .   .   .   .   .   .RESEVRE.   .   .   .   .   .   .   .   .   .   .   .   .*/
/*------------------------------------------------------------------------------------------------*/






























//  .   .   .   .   .   .   .   .   .   .   .   .   LISTEN APPLICATION
app.listen(port,()=>{
    console.log(`exemple app listening at http://localhost:${port}`);
});

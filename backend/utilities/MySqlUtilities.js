const mysql = require('mysql');

const config =
{
    host : 'localhost',
    user :'root',
    password : '',
    database :'mayapark',
};

class MySqlUtilities
{
    /*-------------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .USER.   .   .   .   .   .   .   .   .   .   .   .   .*/
    /*-------------------------------------------------------------------------------------------------*/

    /** MysSqlUtilities.js GET THE LIST OF USERS
    * @param {Callback} callback response of result in data base
    * @returns {Array} every columns information of an user*/
    getUserList(callback)
    {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('SELECT * FROM user', (error, results)=>
        {
            callback(results, error);
        });
        connection.end;
    }

    /** MysSqlUtilities.js GET THE TYPE AND THE ID OF A USER LINKED TO HIS MAIL AND PASSWORD
     * @param {String} pUserMail mail of the current user
     * @param {String} pUserPass password of the current password
     * @param {Callback} callback response of result in data base
     * @returns {Array} type and id_user of the current user*/
    getUser(pUserMail, pUserPass,callback)
    {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('SELECT type,id_user FROM user WHERE mail=? AND password=?', [pUserMail, pUserPass] ,(error, results)=>
        {
            callback(results, error);
        });
        connection.end;
    }

    /** MysSqlUtilities.js SET THE VALUE OF isLog OF CURRENT USER WHEN HE'S CONNECTED OR NOT
     * @param {Number} pUserId id of the current user
     * @param {Number} pUserLog 1 to 0 if the user is logout and 0 to 1 if he is login
     * @param {Callback} callback response of result in data base */
    changeUserLog(pUserId, pUserLog,callback)
    {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('UPDATE user SET isLog=(?) WHERE id_user=?', [pUserLog, pUserId], (error,results)=>
        {
            callback(results,error);
        });
        connection.end;
    }

    /** MysSqlUtilities.js CHECK IF USER EXISTE IN DATA BASE
     * @param {String} pMail mail of user */
    checkUser(pMail,callback)
    {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('SELECT id_user FROM user WHERE mail=?', [pMail], (error,results)=>
        {
            callback(results,error);
        });
        connection.end;
    }

    /** MySqlUtilities.js - CREATE A NEW USER
     * @param {Object} pUser */
    createUser(pUser, callback)
    {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('INSERT INTO `user` (`type`, `isLog`, `mail`, `password`, `birthday`, `firstName`, `name`) VALUES (?,?,?,?,?,?,?)', ["user", 1, pUser.mail, pUser.password, pUser.birthday, pUser.firstName, pUser.name], (error,results)=>
        {
            callback(results,error);
        });
        connection.end;
    }

    /*--------------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .ATRACTION.   .   .   .   .   .   .   .   .   .   .   .*/
    /*--------------------------------------------------------------------------------------------------*/

     /** MysSqlUtilities.js GET ATTRACTION IN HIGH LIGHT FOR HOME PAGE
     * @param {Callback} callback response of result in data base
     * @returns {Object} every columns information of an attraction*/
    getHlAtr(callback)
    {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('SELECT * FROM attraction WHERE light=1', (error, results)=>
        {
            callback(results, error);
        });
        connection.end;
    }

    /** MysSqlUtilities.js GET ATTRACTION LIST IN DATA BASE
     * @param {Callback} callback response of result in data base
     * @returns {Object} every columns information of an attraction*/
    getAtrList(callback)
    {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('SELECT * FROM attraction', (error, results)=>
        {
            callback(results, error);
        });
        connection.end;
    }

    /*------------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .RATING.   .   .   .   .   .   .   .   .   .   .   . */
    /*------------------------------------------------------------------------------------------------*/

    /** MysSqlUtilities.js GET THE USER RATING OF AN ATTRACTION
     * @param {Number} pUserId id of the current user
     * @param {Number} pAtrId id of the attraction
     * @param {Float} pUserRating raiting of the user
     * @param {Callback} callback response of result in data base */
     setUserRating(pUserId, pAtrId, pUserRating, callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('INSERT INTO `rating` (`id_user`, `id_atr`, `rating`) VALUES (?,?,?)', [pUserId, pAtrId, pUserRating], (error, results) => {
            callback(results, error);
        });
        connection.end;
    }

    /** MysSqlUtilities.js GET THE USER RATING OF AN ATTRACTION
     * @param {Number} pIdUser id of the current user
     * @param {Number} pIdAtr id of the attraction
     * @param {Callback} callback response of result in data base
     * @returns {Number} rating of an attraction according to a user*/
    getUserRating(pIdUser, pIdAtr, callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('SELECT rating FROM rating WHERE id_user=? AND id_atr=?', [pIdUser, pIdAtr], (error, results) => {
            callback(results, error);
        });
        connection.end;
    }

    /** MysSqlUtilities.js UPDATE USER RATING
     * @param {*} pUserId id of current user
     * @param {*} pAtrId id of the current attraction
     * @param {*} pUserRating new rating
     * @param {*} callback  */
    updateUserRating(pUserId,pAtrId, pUserRating, callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('UPDATE rating SET rating=(?) WHERE id_user=? AND id_atr=?', [pUserRating,pUserId,pAtrId], (error, results) => {
            callback(results, error);
        });
        connection.end;
    }

     /** MysSqlUtilities.js GET THE USER RATING OF AN ATTRACTION
     * @param {Number} pAtrId id of the attraction
     * @param {Number} pRating new rating of the attraction
     * @param {Number} pRatingNbr nbr of rating
     * @param {Callback} callback response of result in data base */
    updateRating(pAtrId, pRating, pRatingNbr, callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('UPDATE attraction SET rating=(?), ratingNbr=(?) WHERE id_atr=?', [ pRating, pRatingNbr, pAtrId], (error, results) => {
            callback(results, error);
        });
        connection.end;
    }

    /*------------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .DAYS.   .   .   .   .   .   .   .   .   .   .   .   */
    /*------------------------------------------------------------------------------------------------*/

    getTicketAvailableDate(pDate, callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('SELECT ticketsAvailable FROM day WHERE date=? ', [pDate], (error, results) => {
            callback(results, error);
        });
        connection.end;
    }
    getIdDay(pDate, callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('SELECT id_day FROM day WHERE date=? ', [pDate], (error, results) => {
            callback(results, error);
        });
        connection.end;
    }

    setDay(pDate, pTickets, callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('INSERT INTO `day` (`date`, `ticketsAvailable`) VALUES (?,?)', [pDate, pTickets], (error, results) => {
            callback(results, error);
        });
        connection.end;
    }

    updateDay(pDate, pTickets, callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('UPDATE day SET ticketsAvailable=(?) WHERE date=?', [pTickets, pDate], (error, results) => {
            callback(results, error);
        });
        connection.end;
    }

    /*------------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .RESERVATION.   .   .   .   .   .   .   .   .   .   .   .*/
    /*------------------------------------------------------------------------------------------------*/
    setReservation(pReservation, callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('INSERT INTO `reservation` (`id_user`, `startDay`,`periode`, `state`, `price` ) VALUES (?,?,?,?,?)', [pReservation.id_user, pReservation.startDay, pReservation.periode, "inComing", pReservation.price], (error, results) => {
            callback(results, error);
        });
        connection.end;
    }
    
    /*------------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .RESERVE.   .   .   .   .   .   .   .   .   .   .   .   .*/
    /*------------------------------------------------------------------------------------------------*/
    setReserve(pResere, pIdDay, callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('INSERT INTO `reserve` ( `id_res`, `id_day`,`nbrTickets`) VALUES (?,?,?)', [pResere.id_res, pIdDay, pResere.nbrTickets], (error, results) => {
            callback(results, error);
        });
        connection.end;
    }
}

module.exports =  new MySqlUtilities();
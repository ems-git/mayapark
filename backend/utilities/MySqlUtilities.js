const mysql = require('mysql');

const config =
{
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mayapark',
    multipleStatements: true,
};

class MySqlUtilities {
    /*-------------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .USER.   .   .   .   .   .   .   .   .   .   .   .   .*/
    /*-------------------------------------------------------------------------------------------------*/

    /** MysSqlUtilities.js GET THE LIST OF USERS
    * @param {Callback} callback response of result in data base
    * @returns {Array} every columns information of an user*/
    getUsers(callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('SELECT * FROM user', (error, results) => {
            callback(results, error);
        });
        connection.end;
    }

    /** MysSqlUtilities.js GET THE TYPE AND THE ID OF A USER LINKED TO HIS MAIL AND PASSWORD
     * @param {String} pUserMail mail of the current user
     * @param {String} pUserPass password of the current password
     * @param {Callback} callback response of result in data base
     * @returns {Array} type and id_user of the current user*/
    getUser(pUserMail, pUserPass, callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('SELECT type,id_user FROM user WHERE mail=? AND password=?', [pUserMail, pUserPass], (error, results) => {
            callback(results, error);
        });
        connection.end;
    }

    /** MysSqlUtilities.js SET THE VALUE OF isLog OF CURRENT USER WHEN HE'S CONNECTED OR NOT
     * @param {Number} pUserId id of the current user
     * @param {Number} pUserLog 1 to 0 if the user is logout and 0 to 1 if he is login
     * @param {Callback} callback response of result in data base */
    changeUserLog(pUserId, pUserLog, callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('UPDATE user SET isLog=(?) WHERE id_user=?', [pUserLog, pUserId], (error, results) => {
            callback(results, error);
        });
        connection.end;
    }

    /** MysSqlUtilities.js CHECK IF USER EXISTE IN DATA BASE
     * @param {String} pMail mail of user */
    checkUser(pMail, callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('SELECT id_user FROM user WHERE mail=?', [pMail], (error, results) => {
            callback(results, error);
        });
        connection.end;
    }

    /** MySqlUtilities.js - CREATE A NEW USER
     * @param {Object} pUser */
    createUser(pUser, callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('INSERT INTO `user` (`type`, `isLog`, `mail`, `password`, `birthday`, `firstName`, `name`) VALUES (?,?,?,?,?,?,?)', ["user", 1, pUser.mail, pUser.password, pUser.birthday, pUser.firstName, pUser.name], (error, results) => {
            callback(results, error);
        });
        connection.end;
    }

    /*--------------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .ATRACTION.   .   .   .   .   .   .   .   .   .   .   .*/
    /*--------------------------------------------------------------------------------------------------*/

    /** MysSqlUtilities.js GET ATTRACTION IN HIGH LIGHT FOR HOME PAGE
    * @param {Callback} callback response of result in data base
    * @returns {Object} every columns information of an attraction*/
    getHlAtr(callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('SELECT * FROM attraction WHERE light=1', (error, results) => {
            callback(results, error);
        });
        connection.end;
    }

    /** MysSqlUtilities.js GET ATTRACTION LIST IN DATA BASE
     * @param {Callback} callback response of result in data base
     * @returns {Object} every columns information of an attraction*/
    getAttractions(callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('SELECT * FROM attraction', (error, results) => {
            callback(results, error);
        });
        connection.end;
    }

    delAttraction(pAtrId, callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('DELETE FROM `attraction` WHERE id_atr=?', [pAtrId], (error, results) => {
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
    updateUserRating(pUserId, pAtrId, pUserRating, callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('UPDATE rating SET rating=(?) WHERE id_user=? AND id_atr=?', [pUserRating, pUserId, pAtrId], (error, results) => {
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
        connection.query('UPDATE attraction SET rating=(?), ratingNbr=(?) WHERE id_atr=?', [pRating, pRatingNbr, pAtrId], (error, results) => {
            callback(results, error);
        });
        connection.end;
    }

    delRating(pAtrId, callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('DELETE FROM `rating` WHERE id_atr=?', [pAtrId], (error, results) => {
            callback(results, error);
        });
        connection.end;
    }

    /*------------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .   .DAYS.   .   .   .   .   .   .   .   .   .   .   .   */
    /*------------------------------------------------------------------------------------------------*/

    getExistingDates(start, end, callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query(`SELECT DATE_FORMAT(date,"%Y-%m-%d") AS date FROM day WHERE date BETWEEN ? AND ?`, [start, end], (error, results) => {
            callback(results, error);
        });
        connection.end;
    }

    getValidTickets(start, end, tickets, callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query(`SELECT COUNT(id_day) AS unavailableDay FROM day WHERE (ticketsAvailable-?)<0 AND date BETWEEN ? AND ?`,
            [tickets, start, end], (error, results) => {
                callback(results, error);
            });
        connection.end;
    }

    saveBooking(pInformations, callback) {
        let insertRequest = 'SELECT date FROM day WHERE id_day = 0;';
        let updateRequest = 'SELECT date FROM day WHERE id_day = 0;';
        let reseveRequest = 'SELECT date FROM day WHERE id_day = 0;';
        let idReservation;
        let dayIds = [];

        pInformations.insertDates.forEach(date => {
            insertRequest += `INSERT INTO day(date,ticketsAvailable) VALUES('${date}',(200-${pInformations.tickets}));`;
        });

        pInformations.updateDates.forEach(date => {
            updateRequest += `UPDATE day SET ticketsAvailable=(ticketsAvailable-${pInformations.tickets}) WHERE date='${date}';`;
        });

        let connection = mysql.createConnection(config);
        connection.beginTransaction(function (err) {
            if (err) { throw err; }

            connection.query(insertRequest, (error, results, fields) => {
                if (error) return connection.rollback(() => { throw error; }); // INSERT DAY

                connection.query(updateRequest, (error, results, fields) => {
                    if (error) return connection.rollback(() => { throw error; }); //UPDATE DAYS

                    connection.query('INSERT INTO `reservation` (`id_user`, `startDay`,`periode`,`tickets`,`price`) VALUES (?,?,?,?,?)', [pInformations.id_user, pInformations.startDay, pInformations.periode, pInformations.tickets, pInformations.price], (error, results, fields) => {
                        if (error) return connection.rollback(() => { throw error; }); // INSERT RESERVATION

                        idReservation = results.insertId; //id reservation

                        connection.query(`SELECT id_day FROM day WHERE date BETWEEN ? AND ?`, [pInformations.startDay, pInformations.endDay], (error, results, fields) => {
                            if (error) return connection.rollback(() => { throw error; }); // GET ID DAYS

                            results.forEach((element, index, array) => {
                                dayIds.push(element.id_day);
                                if (index === array.length - 1) {
                                    dayIds.forEach(date => {
                                        reseveRequest += `INSERT INTO reserve (id_res, id_day) VALUES ('${idReservation}','${date}');`
                                    });

                                    connection.query(reseveRequest, (error, results, fields) => {
                                        if (error) return connection.rollback(() => { throw error; }); //UPDATE DAYS
                                        connection.commit((error, results, fields) => {
                                            if (error) return connection.rollback(() => { throw err });
                                            callback(results, error);
                                            console.log('SUCCESS!');
                                        });
                                    });
                                }
                            });
                        });
                    });
                });
            });
        });
    }
    /*------------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .RESERVATION.   .   .   .   .   .   .   .   .   .   .   .*/
    /*------------------------------------------------------------------------------------------------*/

    getReservations(pIdUser, callback) {
        let connection = mysql.createConnection(config);
        connection.connect();
        connection.query('SELECT id_user,id_res,DATE_FORMAT(startDay,"%Y-%m-%d") AS startDay, periode, tickets, price FROM reservation WHERE id_user=?', [pIdUser], (error, results) => {
            callback(results, error);
        });
        connection.end;
    }

    deleteUserReservation(pIdUser, pInformations, callback) {
        let reqSelectIdsDay = "";
        let reqDeleteReserve = "";
        let reqDeleteReservation = "";
        let reqUpdateTicketAvailable = "";
        let resIdDay = [];
        let id_days = [];

        //GET ID_DAY OF RESERVE REQUEST
        pInformations.ids_res.forEach(id_res => {
            reqSelectIdsDay += `SELECT id_day FROM reserve WHERE id_res=${id_res};`;
        });
        //console.log("REQUEST 01 \n", reqSelectIdsDay);

        //DELETE RESERVE REQUESTS
        pInformations.ids_res.forEach(id_res => {
            reqDeleteReserve += `DELETE FROM reserve WHERE id_res=${id_res};`;
        });
        //console.log("REQUEST 02 \n", reqDeleteReserve);

        
        //DELETE RESERVATION REQUESTS
        pInformations.ids_res.forEach(id_res => {
            reqDeleteReservation += `DELETE FROM reservation WHERE id_res=${id_res} AND id_user=${pIdUser};`;
        });
        //console.log("REQUEST 03 \n", reqDeleteReservation);

        let connection = mysql.createConnection(config);
        connection.beginTransaction(function (err) {
            if (err) { throw err; }

            connection.query(reqSelectIdsDay, (error, results, fields) => {
                if (error) return connection.rollback(() => { throw error; }); // GET ID_DAY OF EVERY RESERVE
                resIdDay = [];
                if (Array.isArray(results[0]))
                {
                    results.forEach(result => {
                        id_days=[];
                        result.forEach((element, index, array) => {
                            id_days.push(element.id_day);
                            if(index===array.length-1) resIdDay.push(id_days);
                        });
                    });
                }
                else
                {
                    results.forEach((element) => {
                        resIdDay.push(element.id_day);
                    });
                }

                //console.log("ICI TEST resIdDay\n", resIdDay);

                //UPDATE DAYS TICKETS AVAILABLE REQUESTS (a inclure dans un rollback)
                if (Array.isArray(resIdDay[0]))
                {
                    resIdDay.forEach((reservation, index, array) => {
                        reservation.forEach(id_day => {
                            reqUpdateTicketAvailable += `UPDATE day SET ticketsAvailable=(ticketsAvailable+${pInformations.tickets[index]}) WHERE id_day='${id_day}';`;
                        });
                    });
                }
                else
                {
                    resIdDay.forEach((id_day,index) => {
                        reqUpdateTicketAvailable += `UPDATE day SET ticketsAvailable=(ticketsAvailable+${pInformations.tickets}) WHERE id_day='${id_day}';`;
                    });
                }

                //console.log("ICI TEST \n",reqUpdateTicketAvailable );
                
                connection.query(reqUpdateTicketAvailable, (error, results, fields) => {
                    if (error) return connection.rollback(() => { throw error; }); // UPDATE DAYS TICKETAVAILABLE

                    connection.query(reqDeleteReserve, (error, results, fields) => {
                        if (error) return connection.rollback(() => { throw error; }); // DELETE RESERVE

                        connection.query(reqDeleteReservation, (error, results, fields) => {
                            if (error) return connection.rollback(() => { throw error; }); // DELETE RESERVATION

                            connection.commit((error, results, fields) => {
                                if (error) return connection.rollback(() => { throw err });
                                callback(results, error);
                                console.log('SUCCESS!');
                            });
                        });
                    });
               });
            });
        });
    }

    /*------------------------------------------------------------------------------------------------*/
    /*   .   .   .   .   .   .   .   .   .   .RESERVE.   .   .   .   .   .   .   .   .   .   .   .   .*/
    /*------------------------------------------------------------------------------------------------*/

}

module.exports = new MySqlUtilities();
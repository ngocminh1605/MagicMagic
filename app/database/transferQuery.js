const addHistory = async (goodID, state, officeID, time, db, res) => {
    const confirmReceiveQuery = "INSERT INTO bookinghistory (ID_good, State, ID_Office, Time_update) VALUES (?, ?, ?, ?);";

    return new Promise((resolve, reject) => {
        db.query(confirmReceiveQuery, [goodID, state, officeID, time], (err) => {
            if (err) {
                console.error("Lỗi thêm vào history: ", err.message);
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const updtaeHistory = async (goodID, state, officeID, time, db, res) => {
    const confirmReceiveQuery = `UPDATE bookinghistory SET State = ?, Time_update=?  WHERE ID_Office = ? AND ID_good = ? AND State IN ("Đang chờ", "Đang đợi");`;

    return new Promise((resolve, reject) => {
        db.query(confirmReceiveQuery, [state, time, officeID, goodID], (err) => {
            if (err) {
                console.error("Lỗi thêm vào history: ", err.message);
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const gettransfer = async (goodID, officeID, db, res) => {
    const query = `SELECT DISTINCT good.* FROM good 
                    JOIN bookinghistory ON bookinghistory.ID_good = good.ID_good
                    WHERE good.ID_good = ? AND bookinghistory.ID_Office = ?`;

    return new Promise((resolve, reject) => {
        db.query(query, [goodID, officeID], (err, results) => {
            if (err) {
                console.error("Lỗi thêm vào history: ", err.message);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const getStatetransfer = async (goodID, officeID, db, res) => {
    const query = `SELECT bookinghistory.State FROM good 
                    JOIN bookinghistory ON bookinghistory.ID_good = good.ID_good
                    WHERE good.ID_good = ? AND bookinghistory.ID_Office = ?`;

    return new Promise((resolve, reject) => {
        db.query(query, [goodID, officeID], (err, results) => {
            if (err) {
                console.error("Lỗi thêm vào history: ", err.message);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const getIDtransfer = async (officeID, db, res) => {
    const query = `SELECT DISTINCT good.ID_good FROM good 
                    JOIN bookinghistory ON bookinghistory.ID_good = good.ID_good
                    WHERE bookinghistory.ID_Office = ?`;

    return new Promise((resolve, reject) => {
        db.query(query, [officeID], (err, results) => {
            if (err) {
                console.error("Lỗi thêm vào history: ", err.message);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};


module.exports = { addHistory, updtaeHistory, gettransfer, getIDtransfer, getStatetransfer };
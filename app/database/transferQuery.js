// Thêm một bản ghi vào lịch sử đơn hàng
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

// Cập nhật trạng thái đơn hàng trong lịch sử
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

// Cập nhật trạng thái đơn hàng trả lại trong lịch sử
const updateReturn = async (goodID, state, officeID, time, db, res) => {
    const confirmReceiveQuery = `UPDATE bookinghistory SET State = ?, Time_update=?  WHERE ID_Office = ? AND ID_good = ? AND State IN ("Chờ nhận", "Đợi nhận");`;

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

// Cập nhật trạng thái đã gửi của đơn hàng trong lịch sử
const updateDaGui = async (goodID, state, officeID, db, res) => {
    const confirmReceiveQuery = `UPDATE bookinghistory SET State = ? WHERE ID_Office = ? AND ID_good = ? AND State IN ("Đã gửi");`;

    return new Promise((resolve, reject) => {
        db.query(confirmReceiveQuery, [state, officeID, goodID], (err) => {
            if (err) {
                console.error("Lỗi thêm vào history: ", err.message);
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// Cập nhật trạng thái đã nhận của đơn hàng trong lịch sử
const updateDaNhan = async (goodID, state, officeID, db, res) => {
    const confirmReceiveQuery = `UPDATE bookinghistory SET State = ? WHERE ID_Office = ? AND ID_good = ? AND State IN ("Đã nhận");`;

    return new Promise((resolve, reject) => {
        db.query(confirmReceiveQuery, [state, officeID, goodID], (err) => {
            if (err) {
                console.error("Lỗi thêm vào history: ", err.message);
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// Lấy thông tin chuyển đến (đơn hàng)
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

// Lấy trạng thái chuyển đến (đơn hàng)
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

// Lấy ID đơn hàng đã chuyển đến (đơn hàng)
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

// Lấy ID văn phòng đã chuyển đến (đơn hàng)
const getIDOficeTransfer = async (goodID, db, res) => {
    const query = `SELECT DISTINCT b.ID_Office FROM good g 
                    JOIN bookinghistory b ON b.ID_good = g.ID_good
                    WHERE b.ID_good = ?`;

    return new Promise((resolve, reject) => {
        db.query(query, [goodID], (err, results) => {
            if (err) {
                console.error("Lỗi thêm vào history: ", err.message);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

// Lấy thông tin đơn hàng trong lịch sử
const getStateGood = async (goodID, db, res) => {
    const query = `SELECT DISTINCT b.* FROM good g 
                    JOIN bookinghistory b ON b.ID_good = g.ID_good
                    WHERE b.ID_good = ?`;

    return new Promise((resolve, reject) => {
        db.query(query, [goodID], (err, results) => {
            if (err) {
                console.error("Lỗi thêm vào history: ", err.message);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

// Cập nhật thông tin đơn hàng
const updateGood = async (nameSender, addressSender, phoneSender, nameReceiver, addressReceiver, phoneReceiver, goodID, db, res) => {
    const updateQuery = `UPDATE good SET Name_sender = ?, Address_sender= ?, Phone_sender = ?, Name_receiver = ?, Address_receiver = ?, Phone_receiver = ?  WHERE ID_good = ?;`;

    return new Promise((resolve, reject) => {
        db.query(updateQuery, [nameSender, addressSender, phoneSender, nameReceiver, addressReceiver, phoneReceiver, goodID], (err) => {
            if (err) {
                console.error("Lỗi thêm vào history: ", err.message);
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// Lấy thông tin đơn hàng và văn phòng trong lịch sử
const getByIDandOffice = async (goodID, officeID, db, res) => {
    const query = `SELECT DISTINCT b.* FROM good g 
                        JOIN bookinghistory b ON b.ID_good = g.ID_good
                        WHERE b.ID_good = ? AND b.ID_Office = ?`;

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

module.exports = { addHistory, updtaeHistory, gettransfer, getIDtransfer, getStatetransfer, getIDOficeTransfer, getStateGood, 
    updateReturn, updateGood, updateDaGui, updateDaNhan, getByIDandOffice };

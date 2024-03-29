const crypto = require('crypto');
const qrcode = require('qrcode');

// Tạo mã QR từ data truyền vào.
const generateQRCodeBase64 = async (data) => {
    try {
        // Tạo QR code như một buffer
        const qrCodeBuffer = await qrcode.toBuffer(data);

        // Chuyển đổi buffer sang base64
        const qrCodeBase64 = qrCodeBuffer.toString('base64');

        return qrCodeBase64;
    } catch (error) {
        console.error('Error generating QR Code:', error);
        throw error;
    }
};

// Tạo một dãy số ngẫu nhiên 
const generateRandom = (length, characters) => {
    const randomBytes = crypto.randomBytes(length);
    let code = '';

    for (let i = 0; i < length; i++) {
        const byteValue = randomBytes[i] % characters.length;
        code += characters.charAt(byteValue);
    }

    return code;
};

// Tạo mã đơn hàng
const generateCode = () => {
    const letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const number = "0123456789";

    const randomLetters = generateRandom(2, letter);
    const randomDigits = generateRandom(9, number);
    const code = `${randomLetters}${randomDigits}VN`;
    return code;
};

// Lấy ra QR Code
const getQRCode = async (db, res) => {
    const getQRQuery = "SELECT good.QR_code FROM good;";

    return new Promise((resolve, reject) => {
        db.query(getQRQuery, (err, results) => {
            if (err) {
                console.error("Lỗi truy vấn: ", err.message);
                reject(err);
            }
            resolve(results);
        });
    });
};

// Tạo đơn hàng
const createOrder = async (nameSender, addressSender, phoneSender, nameReceiver, addressReceiver, phoneReceiver, PostalcodeSend, type, weight, goodQR,  mainPrice, secondPrice, GTVT, VAT, Price, IdUser, Senddate, db, res) => {
    const insertOrderQuery = "INSERT INTO good (Name_sender, Address_sender, Phone_sender, Name_receiver, Address_receiver, Phone_receiver, PostalcodeSend, Type, Weight, QR_code,  mainPrice, secondPrice, GTVT, VAT, Price, ID_user, Senddate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

    return new Promise((resolve, reject) => {
        db.query(insertOrderQuery, [nameSender, addressSender, phoneSender, nameReceiver, addressReceiver, phoneReceiver, PostalcodeSend, type, weight, goodQR,  mainPrice, secondPrice, GTVT, VAT, Price, IdUser, Senddate], (err) => {
            if (err) {
                console.error("Lỗi tạo đơn hàng: ", err.message);
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// Lấy thông tin đơn hàng bằng mã QR
const getOrderByQRCode = async (QRCode, db) => {
    const query = 'SELECT * FROM good WHERE QR_code = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [QRCode], (err, results) => {
            if (err) {
                console.error("Lỗi truy vấn: ", err.message);
                reject(err);
            }
            resolve(results);
        });
    });
};

// Lấy dữ liệu đơn hàng có State là đang đợi
const getStateWait = async (officeID, db, res) => {
    const query = `SELECT DISTINCT * FROM good g
                    JOIN bookinghistory b ON b.ID_good = g.ID_good
                    WHERE b.ID_Office = ? AND b.State IN ("Đang đợi", "Đang chờ");`;
    return new Promise((resolve, reject) => {
        db.query(query, [officeID], (err, results) => {
            if (err) {
                console.error("Lỗi truy vấn: ", err.message);
                reject(err);
            }
            resolve(results);
        });
    });
};

// Lấy dữ liệu đơn hàng có State là chờ nhận
const getStateReturn = async (officeID, db, res) => {
    const query = `SELECT DISTINCT * FROM good g
                    JOIN bookinghistory b ON b.ID_good = g.ID_good
                    WHERE b.ID_Office = ? AND b.State IN ("Chờ nhận", "Đợi nhận");`;
    return new Promise((resolve, reject) => {
        db.query(query, [officeID], (err, results) => {
            if (err) {
                console.error("Lỗi truy vấn: ", err.message);
                reject(err);
            }
            resolve(results);
        });
    });
};

// Lấy dữ liệu đơn hàng có State là đã nhận
const getStateNhan = async (officeID, db, res) => {
    const query = `SELECT DISTINCT * FROM good g
                    JOIN bookinghistory b ON b.ID_good = g.ID_good
                    WHERE b.ID_Office = ? AND b.State IN ("Đã nhận");`;
    return new Promise((resolve, reject) => {
        db.query(query, [officeID], (err, results) => {
            if (err) {
                console.error("Lỗi truy vấn: ", err.message);
                reject(err);
            }
            resolve(results);
        });
    });
};

// Lấy dữ liệu đơn hàng theo officeID
const getAll = async (officeID, db, res) => {
    let getAllQuery = "";

    if (!officeID) {
        // Nếu officeID rỗng
        getAllQuery = `SELECT DISTINCT * FROM good;`;
    } else {
        // Nếu officeID khác rỗng
        getAllQuery = `SELECT DISTINCT good.* FROM good
                            JOIN bookinghistory ON bookinghistory.ID_good = good.ID_good
                            WHERE bookinghistory.ID_Office = ?;`;
    }

    return new Promise((resolve, reject) => {
        db.query(getAllQuery, [officeID], (err, results) => {
            if (err) {
                console.error("Lỗi truy vấn: ", err.message);
                reject(err);
            }
            resolve(results);
        });
    });
};



// Lấy dữ liệu đơn hàng đã gửi
const getSend = async (officeID, db, res) => {
    let getSendQuery = "";

    if (!officeID) {
        // Nếu officeID rỗng
        getSendQuery = `
            SELECT DISTINCT * FROM bookinghistory
            JOIN good ON good.ID_good = bookinghistory.ID_good
            WHERE bookinghistory.State IN ("Đã gửi", "Gửi trả về");
        `;
    } else {
        // Nếu officeID khác rỗng
        getSendQuery = `
            SELECT DISTINCT * FROM bookinghistory
            JOIN good ON good.ID_good = bookinghistory.ID_good
            WHERE bookinghistory.State IN ("Đã gửi", "Gửi trả về") AND bookinghistory.ID_Office = ?;
        `;
    }

    return new Promise((resolve, reject) => {
        db.query(getSendQuery, [officeID], (err, results) => {
            if (err) {
                console.error("Lỗi truy vấn: ", err.message);
                reject(err);
            }
            resolve(results);
        });
    });
};

// Lấy dữ liệu đơn hàng đã nhận
const getReceive = async (officeID, db, res) => {
    let getReceiveQuery = "";

    if (!officeID) {
        // Nếu officeID rỗng
        getReceiveQuery = `
            SELECT DISTINCT * FROM bookinghistory
            JOIN good ON good.ID_good = bookinghistory.ID_good
            WHERE bookinghistory.State IN ("Đã nhận", "Nhận trả về");
        `;
    } else {
        // Nếu officeID khác rỗng
        getReceiveQuery = `
            SELECT DISTINCT * FROM bookinghistory
            JOIN good ON good.ID_good = bookinghistory.ID_good
            WHERE bookinghistory.State IN ("Đã nhận", "Nhận trả về") AND bookinghistory.ID_Office = ?;
        `;
    }

    return new Promise((resolve, reject) => {
        db.query(getReceiveQuery, [officeID], (err, results) => {
            if (err) {
                console.error("Lỗi truy vấn: ", err.message);
                reject(err);
            }
            resolve(results);
        });
    });
};

// Lấy thông tin đơn hàng bởi ID_good
const getOrderInfo = async (goodID, db, res) => {
    const getInfoQuery = `SELECT * FROM good WHERE good.ID_good = ? ;`;

    return new Promise((resolve, reject) => {
        db.query(getInfoQuery, [goodID], (err, results) => {
            if (err) {
                console.error("Lỗi truy vấn: ", err.message);
                reject(err);
            }
            resolve(results);
        });
    });
};

// Lấy thông tin đơn hàng và history bởi mã QR
const getInfoByQR = async (goodCode, db, res) => {
    const query = `SELECT DISTINCT g.* FROM good g
                            JOIN bookinghistory b ON b.ID_good = g.ID_good
                            WHERE g.QR_code = ?;`;

    return new Promise((resolve, reject) => {
        db.query(query, [goodCode], (err, results) => {
            if (err) {
                console.error("Lỗi truy vấn: ", err.message);
                reject(err);
            }
            resolve(results);
        });
    });
};

// Lấy các state và thông tin theo Mã QR
const getStateByQR = async (goodCode, db, res) => {
    const query = `SELECT DISTINCT b.State, b.ID_Office, b.Time_update, o.Name, o.Address FROM good g
                        JOIN bookinghistory b ON b.ID_good = g.ID_good
                        JOIN office o ON o.ID_office = b.ID_Office
                        WHERE g.QR_code = ?;`;

    return new Promise((resolve, reject) => {
        db.query(query, [goodCode], (err, results) => {
            if (err) {
                console.error("Lỗi truy vấn: ", err.message);
                reject(err);
            }
            resolve(results);
        });
    });
};

// Cập nhật PostalcodeReceive trong bảng good
const updateGood = async (code, goodID, db) => {
    const query = 'UPDATE good SET good.PostalcodeReceive = ? WHERE good.ID_good = ?;';
    return new Promise((resolve, reject) => {
        db.query(query, [code, goodID], (err, results) => {
            if (err) {
                console.error("Lỗi cập nhật hàng hóa: ", err.message);
                reject(err);
            }
            resolve(results);
        });
    });
};

// Lấy địa chỉ người nhận
const getAdressReceiver = async (goodID, db) => {
    const query = 'SELECT Address_receiver FROM good WHERE ID_good = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [goodID], (err, results) => {
            if (err) {
                console.error("Lỗi cập nhật hàng hóa: ", err.message);
                reject(err);
            }
            resolve(results);
        });
    });
};

// Lấy mã bưu chính theo các địa điểm
const getPostalCode = async (province, db) => {
    const query = `SELECT Postalcode FROM office WHERE Address LIKE ? AND Name LIKE '%GD%';`;
    return new Promise((resolve, reject) => {
        db.query(query, [`%${province}%`], (err, results) => {
            if (err) {
                console.error("Lỗi cập nhật hàng hóa: ", err.message);
                reject(err);
            }
            resolve(results);
        });
    });
};

module.exports = { createOrder, getSend, getAll, getReceive, generateCode, getQRCode, getOrderInfo, generateQRCodeBase64, getOrderByQRCode, 
                    getStateWait, getStateNhan, getStateReturn, getInfoByQR, getStateByQR, updateGood, getAdressReceiver, getPostalCode};
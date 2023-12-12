const crypto = require('crypto');
const qrcode = require('qrcode');

const generateQRCodeBase64 = async (data) => {
    try {
        // Generate QR code as a buffer
        const qrCodeBuffer = await qrcode.toBuffer(data);

        // Convert the buffer to base64
        const qrCodeBase64 = qrCodeBuffer.toString('base64');

        return qrCodeBase64;
    } catch (error) {
        console.error('Error generating QR Code:', error);
        throw error;
    }
};


const generateRandom = (length, characters) => {
    const randomBytes = crypto.randomBytes(length);
    let code = '';

    for (let i = 0; i < length; i++) {
        const byteValue = randomBytes[i] % characters.length;
        code += characters.charAt(byteValue);
    }

    return code;
};

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
const createOrder = async (nameSender, addressSender, phoneSender, nameReceiver, addressReceiver, phoneReceiver, type, weight, goodQR,  mainPrice, secondPrice, GTVT, VAT, Price, IdUser, Senddate, db, res) => {
    const insertOrderQuery = "INSERT INTO good (Name_sender, Address_sender, Phone_sender, Name_receiver, Phone_receiver, Address_receiver, Type, Weight, QR_code,  mainPrice, secondPrice, GTVT, VAT, Price, ID_user, Senddate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

    return new Promise((resolve, reject) => {
        db.query(insertOrderQuery, [nameSender, addressSender, phoneSender, nameReceiver, addressReceiver, phoneReceiver, type, weight, goodQR,  mainPrice, secondPrice, GTVT, VAT, Price, IdUser, Senddate], (err) => {
            if (err) {
                console.error("Lỗi tạo đơn hàng: ", err.message);
                reject(err);
            } else {
                resolve();
            }
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
            SELECT * FROM bookinghistory
            JOIN good ON good.ID_good = bookinghistory.ID_good
            WHERE bookinghistory.State IN ("Đã gửi", "Gửi trả về");
        `;
    } else {
        // Nếu officeID khác rỗng
        getSendQuery = `
            SELECT * FROM bookinghistory
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

// Lấy dữ liệu đơn hàng đã gửi
const getReceive = async (officeID, db, res) => {
    let getReceiveQuery = "";

    if (!officeID) {
        // Nếu officeID rỗng
        getReceiveQuery = `
            SELECT * FROM bookinghistory
            JOIN good ON good.ID_good = bookinghistory.ID_good
            WHERE bookinghistory.State IN ("Đã nhận", "Nhận trả về");
        `;
    } else {
        // Nếu officeID khác rỗng
        getReceiveQuery = `
            SELECT * FROM bookinghistory
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



module.exports = { createOrder, getSend, getAll, getReceive, generateCode, getQRCode, getOrderInfo, generateQRCodeBase64 };
const crypto = require('crypto');
const qrcode = require('qrcode');

const generateQRCode = async (text, filePath) => {
    try {
        await qrcode.toFile(filePath, text);
        console.log('QR Code generated successfully');
    } catch (error) {
        console.error('Error generating QR Code:', error);
    }
};

// Hàm này sẽ tạo mã QR từ mã QRCode và lưu vào một tệp
const generateQRCodeFromFile = async (QRCode, filePath) => {
    const text = `QR Code: ${QRCode}`;
    await generateQRCode(text, filePath);
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
const createOrder = async (goodQR, goodName, goodPrice, db, res) => {
    const insertOrderQuery = "INSERT INTO good (QR_code, Name, Price) VALUES (?, ?, ?);";

    return new Promise((resolve, reject) => {
        db.query(insertOrderQuery, [goodQR, goodName, goodPrice], (err) => {
            if (err) {
                console.error("Lỗi tạo đơn hàng: ", err.message);
                reject(err);
            } else {
                resolve();
            }
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

module.exports = { createOrder, getSend, getReceive, generateCode, getQRCode, generateQRCodeFromFile };
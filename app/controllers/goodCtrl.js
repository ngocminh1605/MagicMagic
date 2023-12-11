var express = require("express");
const router = express.Router();

const goodQueries = require("../database/goodQuery");

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

const goodCtrl = {
    createOrder : async(req, res) => {
        try {
            const db = req.app.locals.db;
    
            const { goodName, goodPrice } = req.body;

            const QRCodeList = await goodQueries.getQRCode(db);

            let goodQR;
            let isDuplicate;

            do {
                goodQR = goodQueries.generateCode();
                // Kiểm tra xem goodQR đã tồn tại trong danh sách chưa
                isDuplicate = QRCodeList.includes(goodQR);
            } while (isDuplicate);

            await goodQueries.createOrder(goodQR, goodName, goodPrice, db, res);
    
            res.status(201).json({ message: "Tạo đơn hàng thành công!" });
        } catch (error) {
            console.error("Lỗi tạo đơn hàng: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    getSendAll: async (req, res) => {
        try {
            const db = req.app.locals.db;
            const results = await goodQueries.getSend(null, db);
            
            res.status(200).json({ message: "Truy vấn lấy tất cả đơn hàng đã gửi thành công!", data: results });
        } catch (error) {
            console.error("Lỗi lấy các đơn hàng: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    getSendByOffice: async (req, res) => {
        try {
            const db = req.app.locals.db;
            const { officeID } = req.body;
            const results = await goodQueries.getSend(officeID, db);
            
            res.status(200).json({ message: "Truy vấn lấy các đơn hàng theo office đã gửi thành công!", data: results });
        } catch (error) {
            console.error("Lỗi lấy các đơn hàng: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    getReceiveAll: async (req, res) => {
        try {
            const db = req.app.locals.db;
            const results = await goodQueries.getReceive(null, db);
            
            res.status(200).json({ message: "Truy vấn lấy tất cả đơn hàng đã nhận thành công!", data: results });
        } catch (error) {
            console.error("Lỗi lấy các đơn hàng: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    getReceiveByOffice: async (req, res) => {
        try {
            const db = req.app.locals.db;
            const { officeID } = req.body;
            const results = await goodQueries.getReceive(officeID, db);
            
            res.status(200).json({ message: "Truy vấn lấy các đơn hàng đã nhận theo office thành công!", data: results });
        } catch (error) {
            console.error("Lỗi lấy các đơn hàng: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

}


module.exports = goodCtrl;
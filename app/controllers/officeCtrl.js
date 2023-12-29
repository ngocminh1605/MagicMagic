var express = require("express");
const router = express.Router();

const officeQueries = require("../database/officeQuery");
const goodQueries = require("../database/goodQuery");

const officeCtrl = {
    getOfficeTransaction : async(req, res) => {
        try {
            const db = req.app.locals.db;
            const { address } = req.body;
            
            const results = await officeQueries.transactionAndAddress(address, db, res);
    
            res.status(201).json({ message: "Lấy điểm giao dịch thành công", data: results });
        } catch (error) {
            console.error("Lỗi lấy điểm giao dịch: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    getOfficeGathering : async(req, res) => {
        try {
            const db = req.app.locals.db;
            const { address } = req.body;
           
            const results = await officeQueries.gatheringAndAddress(address, db, res);
    
            res.status(201).json({ message: "Lấy điểm tập kết thành công!", data: results });
        } catch (error) {
            console.error("Lỗi lấy điểm tập kết: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    getOfficeByID : async(req, res) => {
        try {
            const db = req.app.locals.db;
            const { officeID } = req.body;
           
            const results = await officeQueries.getOfficeByID(officeID, db, res);
    
            res.status(201).json({ message: "Lấy office theo ID thành công!", data: results });
        } catch (error) {
            console.error("Lỗi lấy office theo ID: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    getOfficeByUser : async(req, res) => {
        try {
            const db = req.app.locals.db;
            const { userID } = req.body;
           
            const [results] = await officeQueries.getOfficeByUser(userID, db, res);
    
            res.status(201).json({ message: "Lấy office theo ID thành công!", data: results });
        } catch (error) {
            console.error("Lỗi lấy office theo ID: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    getOption: async(req, res) => {
        try {
            const db = req.app.locals.db;
            const { goodID, officeID } = req.body;
           
            const infoOfficeCurrent = await officeQueries.getOfficeByID(officeID, db, res);
            const infoOrderCurrent = await goodQueries.getOrderInfo(goodID, db, res);

            if (infoOfficeCurrent.length === 0) {
                res.status(404).json({ message: "Không tìm thấy thông tin văn phòng." });
                return;
            }

            if (infoOrderCurrent.length === 0) {
                res.status(404).json({ message: "Không tìm thấy thông tin đơn hàng." });
                return;
            }

            const nameOffice = infoOfficeCurrent[0].Name;
            const addressOffice = infoOfficeCurrent[0].Address;
            const destination = infoOrderCurrent[0].Address_receiver;
            const addressSender = officeQueries.extractProvinceName(infoOrderCurrent[0].Address_sender);
            const addressReceiver = officeQueries.extractProvinceName(infoOrderCurrent[0].Address_receiver);

            let option;
            
            if (nameOffice.includes('GD')) {
                if (addressSender.includes(addressOffice)) {
                    console.log("Đang ở điểm giao dịch phía người gửi, sẽ gửi đến điểm tập kết", addressSender);
                    option = await officeQueries.gatheringAndAddress(addressOffice, db, res);
                } else if (addressReceiver.includes(addressOffice)) {
                    console.log("Đang ở điểm giao dịch phía người nhận, sẽ gửi đến người nhận!");
                    option = {destination};
                } else {
                    option = "Xem lại các địa chỉ_ !";
                }
            } else if (nameOffice.includes('TK')) { 
                if (addressSender.includes(addressOffice)) {
                    console.log("Đang ở điểm tập kết phía người gửi, sẽ gửi đến tập kết người nhận ở", addressReceiver);
                    option = await officeQueries.gatheringAndAddress(addressReceiver, db, res);
                } else if (addressReceiver.includes(addressOffice)) {
                    console.log("Đang ở điểm tập kết phía người nhận, sẽ gửi đến giao dịch người nhận ở", addressReceiver);
                    option = await officeQueries.transactionAndAddress(addressReceiver, db, res);
                } else {
                    option = "Xem lại các địa chỉ !";
                }
            } else {
                option = "Xem lại các địa chỉ!";
            }
    
            res.status(201).json({ message: "Lấy office theo ID thành công!", data: infoOfficeCurrent,  option: option});
        } catch (error) {
            console.error("Lỗi lấy office theo ID: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    getProvinceOffice: async(req, res) => {
        try {
            const db = req.app.locals.db;
            const { officeID } = req.body;
           
            const data = await officeQueries.getOfficeByID(officeID, db, res);
            const results = officeQueries.extractProvinceName(data[0].Address)
            const codeSend = data[0].Postalcode
    
            res.status(201).json({ message: "Lấy tỉnh/tp office theo ID thành công!", data: results, code: codeSend });
        } catch (error) {
            console.error("Lỗi lấy tỉnh/tp office theo ID: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    getAllOffice: async(req, res) => {
        try {
            const db = req.app.locals.db;
           
            const data = await officeQueries.getAllOffice(db, res);
    
            res.status(201).json({ message: "Lấy tỉnh/tp office theo ID thành công!", data: data });
        } catch (error) {
            console.error("Lỗi lấy tỉnh/tp office theo ID: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    getListOffice: async(req, res) => {
        try {
            const db = req.app.locals.db;
            const data = await officeQueries.getListOffice(db, res);
            res.status(201).json({ message: "Lấy danh sách office thành công!", data: data });
        } catch (error) {
            console.error("Lỗi lấy danh sách office: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    addOffice: async(req, res) => {
        try {
            const db = req.app.locals.db;

            const {name, address, hotline, learder, code} = req.body;
           
            const data = await officeQueries.addOffice(name, address, hotline, learder, code, db, res);
    
            res.status(201).json({ message: "Thêm office thành công!"});
        } catch (error) {
            console.error("Lỗi thêm office: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    deleteOffice: async(req, res) => {
        try {
            const db = req.app.locals.db;
            const {officeID} = req.body;
           
            const data = await officeQueries.deleteOffice(officeID, db, res);
    
            res.status(201).json({ message: "Xóa office thành công!"});
        } catch (error) {
            console.error("Lỗi xóa office: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

}



module.exports = officeCtrl;
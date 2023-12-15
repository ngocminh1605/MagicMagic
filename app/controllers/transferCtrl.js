var express = require("express");
const router = express.Router();


const transferQueries = require("../database/transferQuery");

const transferCtrl = {
    confirmReceive : async(req, res) => {
        try {
            const db = req.app.locals.db;
            const { goodID, officeID } = req.body;
            const currentTime = new Date();
            const state = "Đã nhận";

            await transferQueries.addHistory(goodID, state, officeID, currentTime, db, res);
    
            res.status(201).json({ message: "Thêm history nhận hàng thành công!" });
        } catch (error) {
            console.error("Lỗi nhận đơn hàng: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    SendAndWaitOrder : async(req, res) => {
        try {
            const db = req.app.locals.db;
            const { goodID, officeIDSend, officeIDWait } = req.body;
            const currentTime = new Date();

            if (officeIDWait == '') {
                const state = "Chờ nhận";
                await transferQueries.addHistory(goodID, state, officeIDSend, currentTime, db, res);
            } else {
                const stateSend = "Đã gửi";
                await transferQueries.addHistory(goodID, stateSend, officeIDSend, currentTime, db, res);

                const stateWait = "Đang chờ";
                await transferQueries.addHistory(goodID, stateWait, officeIDWait, currentTime, db, res);
            }
    
            res.status(201).json({ message: "Thêm history đã gửi và chờ thành công!" });
        } catch (error) {
            console.error("Lỗi gửi đơn hàng: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    updateReceive : async(req, res) => {
        try {
            const db = req.app.locals.db;
            const { goodID, officeID } = req.body;
            const currentTime = new Date();
            const state = "Đã nhận";

            await transferQueries.updtaeHistory(goodID, state, officeID, currentTime, db, res);
    
            res.status(201).json({ message: "Thêm history nhận hàng thành công!" });
        } catch (error) {
            console.error("Lỗi nhận đơn hàng: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    getTransferOrder: async (req, res) => {
        try {
            const db = req.app.locals.db;
            const { officeID } = req.body;
    
            const idResults = await transferQueries.getIDtransfer(officeID, db, res);
    
            const promiseArray = idResults.map(async row => {
                const data = await transferQueries.gettransfer(row.ID_good, officeID, db, res);
                const state = await transferQueries.getStatetransfer(row.ID_good, officeID, db, res);
                
                const hasReceived = state.some(s => s.State === 'Đã nhận');
                const hasSent = state.some(s => s.State === 'Đã gửi' || s.State === 'Chờ nhận' || s.State === 'Đợi nhận');

                if (hasReceived && !hasSent) {
                    return data;
                }
                return null;
            });
    
            const filteredResults = await Promise.all(promiseArray);
    
            res.status(201).json({ message: "Lấy dữ liệu thành công!", data: filteredResults });
        } catch (error) {
            console.error("Lỗi lấy dữ liệu: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },
    
    
}

module.exports = transferCtrl;
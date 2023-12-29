var express = require("express");
const router = express.Router();

const transferQueries = require("../database/transferQuery");

const transferCtrl = {
    // Xác nhận đã nhận hàng
    confirmReceive: async (req, res) => {
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

    // Gửi đơn hàng và chờ xác nhận
    SendAndWaitOrder: async (req, res) => {
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

    // Cập nhật trạng thái đã nhận hàng
    updateReceive: async (req, res) => {
        try {
            const db = req.app.locals.db;
            const { goodID, officeID } = req.body;
            const currentTime = new Date();
            const state = "Đã nhận";

            await transferQueries.updtaeHistory(goodID, state, officeID, currentTime, db, res);

            res.status(201).json({ message: "Cập nhật trạng thái đã nhận hàng thành công!" });
        } catch (error) {
            console.error("Lỗi nhận đơn hàng: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    // Lấy đơn hàng cần xác nhận
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

    // Xác nhận thành công đơn hàng
    confirmSuccess: async (req, res) => {
        try {
            const db = req.app.locals.db;
            const { goodID } = req.body;
            const currentTime = new Date();
            const state = "Thành công";

            const office = await transferQueries.getIDOficeTransfer(goodID, db, res);
            office.map(async row => {
                await transferQueries.addHistory(goodID, state, row.ID_Office, currentTime, db, res);
            });

            res.status(201).json({ message: "Thêm history thành công ở cả 4 office!" });
        } catch (error) {
            console.error("Lỗi thêm state thành công: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    // Lấy đơn hàng chờ xác nhận hoặc đã nhận
    getGoodWaitConfirm: async (req, res) => {
        try {
            const db = req.app.locals.db;
            const { officeID } = req.body;

            const idResults = await transferQueries.getIDtransfer(officeID, db, res);

            const promiseArray = idResults.map(async row => {
                const data = await transferQueries.gettransfer(row.ID_good, officeID, db, res);
                const state = await transferQueries.getStatetransfer(row.ID_good, officeID, db, res);

                const hasReceived = state.some(s => s.State === 'Chờ nhận' || s.State === 'Đợi nhận');
                const hasSent = state.some(s => s.State === 'Thành công' || s.State === 'Trả về');

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

    // Xác nhận trả lại đơn hàng
    confirmFail: async (req, res) => {
        try {
            const db = req.app.locals.db;
            const { goodID, officeID } = req.body;
            const currentTime = new Date();
            const state1 = "Trả về";

            await transferQueries.updateReturn(goodID, state1, officeID, currentTime, db, res);

            const office = await transferQueries.getIDOficeTransfer(goodID, db, res);
            office.map(async row => {
                const stateGui = "Gửi trả về";
                const stateNhan = "Nhận trả về";

                if (row.ID_Office != officeID) {
                    await transferQueries.updateDaGui(goodID, stateGui, row.ID_Office, db, res);
                    await transferQueries.updateDaNhan(goodID, stateNhan, row.ID_Office, db, res);
                }
            });

            const order = await transferQueries.gettransfer(goodID, officeID, db, res);

            const newNameSender = order[0].Name_receiver;
            const newAddressSender = order[0].Address_receiver;
            const newPhoneSender = order[0].Phone_receiver;

            const newNameReceiver = order[0].Name_sender;
            const newAddressReceiver = order[0].Address_sender;
            const newPhoneReceiver = order[0].Phone_sender;

            await transferQueries.updateGood(newNameSender, newAddressSender, newPhoneSender, newNameReceiver, newAddressReceiver, newPhoneReceiver, goodID, db, res);

            const state2 = "Đã nhận";
            await transferQueries.addHistory(goodID, state2, officeID, currentTime, db, res);

            res.status(201).json({ message: "Trả lại đơn hàng thành công!" });
        } catch (error) {
            console.error("Lỗi trả lại đơn hàng: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    // Kiểm tra xem đơn hàng có trạng thái trả về không
    getByIDandOffice: async (req, res) => {
        try {
            const db = req.app.locals.db;
            const { goodID, officeID } = req.body;

            const dataCheck = await transferQueries.getByIDandOffice(goodID, officeID, db, res);

            const isReturn = dataCheck.some(s => s.State.includes("trả về") || s.State.includes("Trả về"));

            res.status(201).json({ message: "Lấy dữ liệu trả về thành công!", data: isReturn });
        } catch (error) {
            console.error("Lỗi lấy dữ liệu trả về: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },
};

module.exports = transferCtrl;
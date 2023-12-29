var express = require("express");
const router = express.Router();

const tkQueries = require("../database/thongkeQuery");

const tkeCtrl = {
    // Lấy thống kê tổng toàn quốc
    getAll: async (req, res) => {
        try {
            const db = req.app.locals.db;
            const { id } = req.body;
            const [allResult] = await tkQueries.all(id, db, res);
            const [sendResult] = await tkQueries.sendAll(id, db, res);
            const [receiveResult] = await tkQueries.receiveAll(id, db, res);
            const [successResult] = await tkQueries.success(id, db, res);
            const [returnResult] = await tkQueries.returnTotal(id, db, res);
            res.status(201).json({
                message: "Thống kê tổng toàn quốc thành công!",
                all: allResult.total,
                send: sendResult.send,
                receive: receiveResult.receive,
                success: successResult.success,
                return: returnResult.tralai
            });
        } catch (error) {
            console.error("Lỗi thống kê tổng toàn quốc: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    // Lấy thống kê theo tháng
    byMonth: async (req, res) => {
        try {
            const db = req.app.locals.db;
            const { id } = req.body;
            const all = await tkQueries.allByMonth(id, db, res);
            const send = await tkQueries.sendByMonth(id, db, res);
            const receive = await tkQueries.receivedByMonth(id, db, res);

            const groupByYear = (data) => {
                const result = {};
                data.forEach(item => {
                    if (!result[item.year]) {
                        result[item.year] = [];
                    }
                    result[item.year].push({
                        month: item.month,
                        total: item.total
                    });
                });
                return result;
            };

            res.status(201).json({
                message: "Thống kê tổng toàn quốc theo tháng thành công!",
                all: groupByYear(all),
                send: groupByYear(send),
                receive: groupByYear(receive)
            });
        } catch (error) {
            console.error("Lỗi thống kê tổng theo tháng toàn quốc: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    // Thống kê theo điểm giao dịch
    GDOffice: async (req, res) => {
        try {
            const db = req.app.locals.db;
            result = await tkQueries.GDOffice(db, res);

            res.status(201).json({ message: "Thống kê theo điểm giao dịch thành công!", data: result });
        } catch (error) {
            console.error("Lỗi thống kê theo điểm giao dịch: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    // Thống kê theo điểm tập kết
    TKOffice: async (req, res) => {
        try {
            const db = req.app.locals.db;
            result = await tkQueries.TKOffice(db, res);

            res.status(201).json({ message: "Thống kê theo điểm tập kết thành công!", data: result });
        } catch (error) {
            console.error("Lỗi thống kê theo điểm tập kết: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    // Thống kê số lượng office
    numOffice: async (req, res) => {
        try {
            const db = req.app.locals.db;
            const [numOfGD] = await tkQueries.office("GD", db, res);
            const [numOfTK] = await tkQueries.office("TK", db, res);

            res.status(201).json({ message: "Thống kê số office thành công!", tk: numOfTK.numOfOffice, gd: numOfGD.numOfOffice });
        } catch (error) {
            console.error("Lỗi thống kê số office: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    },

    // Thống kê số lượng nhân viên
    numEmployee: async (req, res) => {
        try {
            const db = req.app.locals.db;
            const { officeID } = req.body;
            const [employee] = await tkQueries.employee(officeID, db, res);

            res.status(200).json({ message: "Thống kê số nhân viên thành công!", employee: employee.numOfemployee });
        } catch (error) {
            console.error("Lỗi thống kê số nhân viên: ", error);
            res.status(500).json({ message: "Lỗi máy chủ Internal Server." });
        }
    }
};

module.exports = tkeCtrl;

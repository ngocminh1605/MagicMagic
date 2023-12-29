// Đếm tất cả các đơn hàng hoặc đơn hàng của một office cụ thể
const all = async (officeID, db, res) => {
    let query = "";
    if (!officeID) {
        query = `SELECT COUNT(DISTINCT ID_good) as total FROM good;`;
    } else {
        query = `SELECT COUNT(DISTINCT ID_good) as total FROM bookinghistory WHERE bookinghistory.ID_Office = ?`
    }

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

// Đếm số lượng đơn hàng đã nhận hoặc đang chờ nhận
const receiveAll = async (officeID, db, res) => {
    let query = "";

    if (!officeID) {
        query = `SELECT COUNT(DISTINCT ID_good) as receive FROM bookinghistory WHERE bookinghistory.State IN ("Nhận trả về", "Đã nhận")`;
    } else {
        query = `SELECT COUNT(DISTINCT ID_good) as receive FROM bookinghistory WHERE bookinghistory.State IN ("Nhận trả về", "Đã nhận") AND bookinghistory.ID_Office = ?`;
    }

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

// Đếm số lượng đơn hàng đã gửi hoặc đang chờ gửi
const sendAll = async (officeID, db, res) => {
    let query = "";

    if (!officeID) {
        query = `SELECT COUNT(DISTINCT ID_good) as send FROM bookinghistory WHERE bookinghistory.State IN ("Gửi trả về", "Đã gửi")`;
    } else {
        query = `SELECT COUNT(DISTINCT ID_good) as send FROM bookinghistory WHERE bookinghistory.State IN ("Gửi trả về", "Đã gửi") AND bookinghistory.ID_Office = ?`;
    }

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

// Đếm số lượng đơn hàng theo tháng
const allByMonth = async (officeID, db, res) => {
    let query = "";

    if (!officeID) {
        query = `SELECT DATE_FORMAT(Senddate, '%Y') AS year,
                    DATE_FORMAT(Senddate, '%m') AS month,
                    COUNT(DISTINCT ID_good) AS total
                FROM good
                GROUP BY YEAR(Senddate), MONTH(Senddate);`;
    } else {
        query = `SELECT DATE_FORMAT(Senddate, '%Y') AS year,
                    DATE_FORMAT(Senddate, '%m') AS month,
                    COUNT(DISTINCT g.ID_good) AS total
                    FROM good g
                    JOIN bookinghistory b ON b.ID_good = g.ID_good 
                    WHERE b.ID_Office = ?
                    GROUP BY YEAR(Senddate), MONTH(Senddate);`;
    }
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

// Đếm số lượng đơn hàng đã gửi hoặc đang chờ gửi theo tháng
const sendByMonth = async (officeID, db, res) => {
    let query = "";

    if (!officeID) {
        query = `SELECT DATE_FORMAT(Time_update, '%Y') AS year,
                    DATE_FORMAT(Time_update, '%m') AS month,
                    COUNT(DISTINCT ID_good) AS total
                FROM bookinghistory b WHERE b.State IN ("Gửi trả về", "Đã gửi")
                GROUP BY YEAR(Time_update), MONTH(Time_update);`;
    } else {
        query = `SELECT DATE_FORMAT(Time_update, '%Y') AS year,
            DATE_FORMAT(Time_update, '%m') AS month,
            COUNT(DISTINCT ID_good) AS total
        FROM bookinghistory b WHERE b.State IN ("Gửi trả về", "Đã gửi") AND b.ID_Office = ?
        GROUP BY YEAR(Time_update), MONTH(Time_update);`;

    }

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

// Đếm số lượng đơn hàng đã nhận hoặc đang chờ nhận theo tháng
const receivedByMonth = async (officeID, db, res) => {
    let query = "";

    if (!officeID) {
        query = `SELECT DATE_FORMAT(Time_update, '%Y') AS year,
                    DATE_FORMAT(Time_update, '%m') AS month,
                    COUNT(DISTINCT ID_good) AS total
                FROM bookinghistory b WHERE b.State IN ("Nhận trả về", "Đã nhận")
                GROUP BY YEAR(Time_update), MONTH(Time_update);`;
    } else {
        query = `SELECT DATE_FORMAT(Time_update, '%Y') AS year,
                    DATE_FORMAT(Time_update, '%m') AS month,
                    COUNT(DISTINCT ID_good) AS total
                FROM bookinghistory b WHERE b.State IN ("Nhận trả về", "Đã nhận") AND b.ID_Office = ?
                GROUP BY YEAR(Time_update), MONTH(Time_update);`;
    }

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

// Đếm số lượng đơn hàng theo trạng thái của từng office (GD)
const GDOffice = async (db, res) => {
    const query = `SELECT
                        ROW_NUMBER() OVER (ORDER BY o.Name) AS STT,
                        o.Name,
                        COUNT(DISTINCT CASE WHEN b.State IN ('Gửi trả về', 'Đã gửi') THEN b.ID_good END) AS sentTotal,
                        COUNT(DISTINCT CASE WHEN b.State IN ('Nhận trả về', 'Đã nhận') THEN b.ID_good END) AS receivedTotal,
                        COUNT(DISTINCT b.ID_good) AS total
                    FROM bookinghistory b
                    JOIN office o ON o.ID_office = b.ID_Office
                    WHERE (b.State IN ('Gửi trả về', 'Đã gửi') OR b.State IN ('Nhận trả về', 'Đã nhận')) AND o.Name LIKE '%GD%'
                    GROUP BY b.ID_Office;`;

    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => {
            if (err) {
                console.error("Lỗi truy vấn: ", err.message);
                reject(err);
            }
            resolve(results);
        });
    });
};

// Đếm số lượng đơn hàng theo trạng thái của từng office (TK)
const TKOffice = async (db, res) => {
    const query = `SELECT
                        ROW_NUMBER() OVER (ORDER BY o.Name) AS STT,
                        o.Name,
                        COUNT(DISTINCT CASE WHEN b.State IN ('Gửi trả về', 'Đã gửi') THEN b.ID_good END) AS sentTotal,
                        COUNT(DISTINCT CASE WHEN b.State IN ('Nhận trả về', 'Đã nhận') THEN b.ID_good END) AS receivedTotal,
                        COUNT(DISTINCT b.ID_good) AS total
                    FROM bookinghistory b
                    JOIN office o ON o.ID_office = b.ID_Office
                    WHERE (b.State IN ('Gửi trả về', 'Đã gửi') OR b.State IN ('Nhận trả về', 'Đã nhận')) AND o.Name LIKE '%TK%'
                    GROUP BY b.ID_Office;`;

    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => {
            if (err) {
                console.error("Lỗi truy vấn: ", err.message);
                reject(err);
            }
            resolve(results);
        });
    });
};

// Đếm số lượng đơn hàng thành công của một office
const success = async (officeID, db, res) => {
    const query = `SELECT COUNT(DISTINCT ID_good) as success FROM bookinghistory WHERE bookinghistory.State IN ("Thành công") AND bookinghistory.ID_Office = ?`;

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

// Đếm số lượng đơn hàng trả lại của một office
const returnTotal = async (officeID, db, res) => {
    const query = `SELECT COUNT(DISTINCT ID_good) as tralai FROM bookinghistory WHERE bookinghistory.State IN ("Trả về", "Nhận trả về", "Gửi trả về") AND bookinghistory.ID_Office = ?`;

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

// Đếm số lượng office
const office = async (office, db, res) => {
    const query = "SELECT COUNT(office.ID_office) as numOfOffice FROM office WHERE office.Name LIKE ?;";

    return new Promise((resolve, reject) => {
        db.query(query, [`%${office}%`], (err, results) => {
            if (err) {
                console.error("Lỗi đếm số office: ", err.message);
                reject(err);
            }
            resolve(results);
        });
    });
};

// Đếm số lượng nhân viên của một office hoặc toàn bộ
const employee = async (officeID, db, res) => {
    let query = "";

    if (!officeID) {
        query = `SELECT COUNT(u.ID_user) AS numOfemployee FROM user u
        JOIN office o ON o.ID_office = u.OfficeId;`
    } else {
        query = `SELECT COUNT(u.ID_user) AS numOfemployee FROM user u
        JOIN office o ON o.ID_office = u.OfficeId
        WHERE u.title LIKE '%Nhân viên%' AND o.ID_office = ?`
    }

    return new Promise((resolve, reject) => {
        db.query(query, [officeID], (err, results) => {
            if (err) {
                console.error("Lỗi đếm nhân viên: ", err.message);
                reject(err);
            }
            resolve(results);
        });
    });
};

// Xuất module chứa tất cả các hàm truy vấn
module.exports = { all, allByMonth, sendAll, sendByMonth, receiveAll, receivedByMonth, GDOffice, TKOffice, success, returnTotal, employee, office };

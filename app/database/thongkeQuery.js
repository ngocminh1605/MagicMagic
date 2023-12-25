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

module.exports = { all, allByMonth, sendAll, sendByMonth, receiveAll, receivedByMonth, GDOffice, TKOffice, success, returnTotal };
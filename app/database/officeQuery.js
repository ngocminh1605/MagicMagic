const transactionAndAddress = async (address, db, res) => {
    const transQuery = "SELECT * FROM office WHERE office.Name LIKE '%GD%' AND office.Address LIKE ?;";

    return new Promise((resolve, reject) => {
        db.query(transQuery, [`%${address}%`], (err, results) => {
            if (err) {
                console.error("Lỗi thêm vào history: ", err.message);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const gatheringAndAddress = async (address, db, res) => {
    const gatherQuery = "SELECT * FROM office WHERE office.Name LIKE '%TK%' AND office.Address LIKE ?;";

    return new Promise((resolve, reject) => {
        db.query(gatherQuery, [`%${address}%`], (err, results) => {
            if (err) {
                console.error("Lỗi thêm vào history: ", err.message);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const getOfficeByID = async (officeID, db, res) => {
    const getQuery = "SELECT * FROM office WHERE office.ID_office = ?;";
    return new Promise((resolve, reject) => {
        db.query(getQuery, [officeID], (err, results) => {
            if (err) {
                console.error("Lỗi thêm vào history: ", err.message);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};


const getAllOffice = async (db, res) => {
    const getQuery = "SELECT ID_office, Name FROM office;";
    return new Promise((resolve, reject) => {
        db.query(getQuery, (err, results) => {
            if (err) {
                console.error("Lỗi lấy dữ liệu office: ", err.message);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = { transactionAndAddress, gatheringAndAddress, getOfficeByID, getAllOffice };
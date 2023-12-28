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


const getListOffice = async (db, res) => {
    const getQuery = "SELECT * FROM office;";
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
function extractProvinceName(address) {
    const lowercaseAddress = address.toLowerCase();
  
    const provinces = {
        'An Giang': ['an giang', 'an giang'],
        'Bà Rịa-Vũng Tàu': ['vũng tàu', 'bà rịa', 'vung tau', 'ba ria'],
        'Bắc Giang': ['bắc giang', 'bac giang'],
        'Bắc Kạn': ['bắc kạn', 'bac kan'],
        'Bạc Liêu': ['bạc liêu', 'bac lieu'],
        'Bắc Ninh': ['bắc ninh', 'bac ninh'],
        'Bến Tre': ['bến tre', 'ben tre'],
        'Bình Định': ['bình định', 'binh dinh'],
        'Bình Dương': ['bình dương', 'binh duong'],
        'Bình Phước': ['bình phước', 'binh phuoc'],
        'Bình Thuận': ['bình thuận', 'binh thuan'],
        'Cà Mau': ['cà mau', 'ca mau'],
        'Cần Thơ': ['cần thơ', 'can tho'],
        'Cao Bằng': ['cao bằng', 'cao bang'],
        'Đà Nẵng': ['đà nẵng', 'da nang'],
        'Đắk Lắk': ['đắk lắk', 'dak lak'],
        'Đắk Nông': ['đắk nông', 'dak nong'],
        'Điện Biên': ['điện biên', 'dien bien'],
        'Đồng Nai': ['đồng nai', 'dong nai'],
        'Đồng Tháp': ['đồng tháp', 'dong thap'],
        'Gia Lai': ['gia lai', 'gia lai'],
        'Hà Giang': ['hà giang', 'ha giang'],
        'Hà Nam': ['hà nam', 'ha nam'],
        'Hà Nội': ['hà nội', 'ha noi'],
        'Hà Tĩnh': ['hà tĩnh', 'ha tinh'],
        'Hải Dương': ['hải dương', 'hai duong'],
        'Hải Phòng': ['hải phòng', 'hai phong'],
        'Hậu Giang': ['hậu giang', 'hau giang'],
        'TP Hồ Chí Minh': ['hồ chí minh', 'tp hcm', 'ho chi minh'],
        'Hòa Bình': ['hòa bình', 'hoa binh'],
        'Hưng Yên': ['hưng yên', 'hung yen'],
        'Khánh Hòa': ['khánh hòa', 'khanh hoa'],
        'Kiên Giang': ['kiên giang', 'kien giang'],
        'Kon Tum': ['kon tum', 'kon tum'],
        'Lai Châu': ['lai châu', 'lai chau'],
        'Lâm Đồng': ['lâm đồng', 'lam dong'],
        'Lạng Sơn': ['lạng sơn', 'lang son'],
        'Lào Cai': ['lào cai', 'lao cai'],
        'Long An': ['long an', 'long an'],
        'Nam Định': ['nam định', 'nam dinh'],
        'Nghệ An': ['nghệ an', 'nghe an'],
        'Ninh Bình': ['ninh bình', 'ninh binh'],
        'Ninh Thuận': ['ninh thuận', 'ninh thuan'],
        'Phú Thọ': ['phú thọ', 'phu tho'],
        'Phú Yên': ['phú yên', 'phu yen'],
        'Quảng Bình': ['quảng bình', 'quang binh'],
        'Quảng Nam': ['quảng nam', 'quang nam'],
        'Quảng Ngãi': ['quảng ngãi', 'quang ngai'],
        'Quảng Ninh': ['quảng ninh', 'quang ninh'],
        'Quảng Trị': ['quảng trị', 'quang tri'],
        'Sóc Trăng': ['sóc trăng', 'soc trang'],
        'Sơn La': ['sơn la', 'son la'],
        'Tây Ninh': ['tây ninh', 'tay ninh'],
        'Thái Bình': ['thái bình', 'thai binh'],
        'Thái Nguyên': ['thái nguyên', 'thai nguyen'],
        'Thanh Hóa': ['thanh hóa', 'thanh hoa'],
        'Thừa Thiên-Huế': ['thừa thiên-huế', 'thua thien-hue'],
        'Tiền Giang': ['tiền giang', 'tien giang'],
        'Trà Vinh': ['trà vinh', 'tra vinh'],
        'Tuyên Quang': ['tuyên quang', 'tuyen quang'],
        'Vĩnh Long': ['vĩnh long', 'vinh long'],
        'Vĩnh Phúc': ['vĩnh phúc', 'vinh phuc'],
        'Yên Bái': ['yên bái', 'yen bai'],
      };
      
    for (const [province, keywords] of Object.entries(provinces)) {
      const containsProvince = keywords.some(keyword => lowercaseAddress.includes(keyword));
      if (containsProvince) {
        return province;
      }
    }
  
    return 'Không xác định';
}

module.exports = { transactionAndAddress, gatheringAndAddress, getOfficeByID, getAllOffice, extractProvinceName, getListOffice};

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
            const addressSender = extractProvinceName(infoOrderCurrent[0].Address_sender);
            const addressReceiver = extractProvinceName(infoOrderCurrent[0].Address_receiver);

            console.log(extractProvinceName("Số 36, Quận 4, TP HCM"));

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
            const results = extractProvinceName(data[0].Address)
    
            res.status(201).json({ message: "Lấy tỉnh/tp office theo ID thành công!", data: results });
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

}

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

module.exports = officeCtrl;
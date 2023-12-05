var express = require("express");
var bcrypt = require("bcryptjs");
// var jwt = require("jsonwebtoken");

const router = express.Router();

const hashPassword = async (password) => {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      console.error("Lỗi mã hóa mật khẩu: " + error.message);
      throw "Lỗi đăng ký người dùng.";
    }
  };
  

const createUser = async (username, email, password, db, res) => {
    // Kiểm tra có tồn tại mail chưa
    const checkUserQuery = "SELECT * FROM user WHERE email = ? OR UserName = ?";
    console.log(username + " " + email + " " + password);
    const hashedPassword = await hashPassword(password);
    console.log(username + " " + email + " " + hashedPassword);
    db.query(checkUserQuery, [email, username], (err, results) => {
        if (err) {
            console.error("Lỗi truy vấn cơ sở dữ liệu: " + err.message);
            return res.status(500).json({ message: "Lỗi đăng ký người dùng." });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: "Người dùng đã tồn tại." });
        }

        // Thêm người dùng mới vào cơ sở dữ liệu
        const insertUserQuery =
            "INSERT INTO user (UserName, email, PassWord) VALUES (?, ?, ?);";
        db.query(insertUserQuery, [username, email, hashedPassword], (err) => {
            if (err) {
                console.error("Lỗi thêm người dùng vào cơ sở dữ liệu: " + err.message);
                return res.status(500).json({ message: "Lỗi đăng ký người dùng." });
            }
            return res.status(201).json({ message: "Đăng ký thành công." });
        });
    });
};

router.post("/register", (req, res) => {
    const db = req.app.locals.db;
    console.log(req);
    const { username, email, password } = req.body;
    return createUser(username, email, password, db, res);
});



module.exports = router;
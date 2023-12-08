var express = require("express");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const router = express.Router();

// post : up; put : sua du lieu/update ; get : lay du lieu; delete : xoa du 
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
const comparePasswords = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error("Error comparing passwords:", error);
        throw "Error comparing passwords";
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
            "INSERT INTO user (UserName, email, Password) VALUES (?, ?, ?);";
        db.query(insertUserQuery, [username, email, hashedPassword], (err) => {
            if (err) {
                console.error("Lỗi thêm người dùng vào cơ sở dữ liệu: " + err.message);
                return res.status(500).json({ message: "Lỗi đăng ký người dùng." });
            }
            return res.status(201).json({ message: "Đăng ký thành công." });
        });
    });
};
router.post("/register", async (req, res) => {
    try {
        const db = req.app.locals.db;
        const { username, email, password } = req.body;

        // Call createUser function and wait for its completion
        await createUser(username, email, password, db, res);
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const db = req.app.locals.db;

        // Truy vấn người dùng theo username và password
        const userQuery = "SELECT * FROM user WHERE UserName = ? or email=?";
        db.query(userQuery, [username, username], async (err, results) => {
            if (err) {
                console.error("Lỗi truy vấn cơ sở dữ liệu: " + err.message);
                return res.status(500).json({ message: "Lỗi đăng nhập người dùng." });
            }

            console.log(results.length);
            if (results.length === 0) {
                return res.status(404).json({ message: "Người dùng không tồn tại hoặc sai thông tin đăng nhập." });
            }

            const user = results[0];
            const isPasswordValid = await comparePasswords(password, user.Password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: "Mật khẩu không đúng." });
            }
            // Tạo token
            try {
                const token = jwt.sign(
                    {
                        userId: user.ID_user,
                        username: user.UserName,
                    },
                    "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7",
                    {
                        expiresIn: "1h",
                    }
                );

                res.status(200).json({ token, userId: user.ID_user, userName: user.UserName, expiresIn: 3600 });
            } catch (error) {
                console.error('Error signing token:', error);
                res.status(500).json({ message: "Lỗi đăng nhập." });
            }
        });
    } catch (error) {
        console.error("Lỗi đăng nhập: " + error.message);
        res.status(500).json({ message: "Lỗi đăng nhập." });
    }
});

const isAuthenticated = (req, res, next) => {
    console.log("Hello 1");
    const token = req.headers.authorization.split(" ")[1];
    console.log("Hello 2", token);

    if (!token) {
        console.log("Not token");
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        // Xác thực token
        console.log("vào try");
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY, {
            algorithms: ["HS256"],
        });

        // Thêm thông tin người dùng vào req để sử dụng ở các middleware hoặc route khác
        console.log("sử dụng decodedToken");
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error("Invalid token:", error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};
router.get("/me", isAuthenticated, (req, res) => {
    // Thông tin người dùng đã được thêm vào req.user trong quá trình xác thực
    const user = req.user;

    // Trả về thông tin người dùng
    return res
        .status(200)
        .json({ user: { userId: user.id, username: user.username } });
});

router.get("/logout", isAuthenticated, (req, res) => {
    try {
        res.setHeader("Authorization", ""); // Xóa token khỏi header
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;


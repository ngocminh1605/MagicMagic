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
const createUser = async (username, email, password, officeID, Title, db, res) => {
    // Kiểm tra có tồn tại mail chưa
    const checkUserQuery = "SELECT * FROM user WHERE email = ? OR UserName = ?";
    console.log(username + " " + email + " " + password);
    const hashedPassword = await hashPassword(password);
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
            "INSERT INTO user (UserName, email, Password,OfficeId,title) VALUES (?, ?, ?, ?, ?);";
        db.query(insertUserQuery, [username, email, hashedPassword, officeID, Title], (err) => {
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
        const { username, email, password, officeID, Title } = req.body;

        // Call createUser function and wait for its completion
        await createUser(username, email, password, officeID, Title, db, res);
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
                        officeID : user.OfficeId,
                        title: user.title,
                    },
                    "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7",
                    {
                        expiresIn: "1h",
                    }
                );

                res.status(200).json({ token, userId: user.ID_user, userName: user.UserName,officeID:user.OfficeId,title: user.title, expiresIn: 3600 });
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
    try {
        // console.log("Headers:", req.headers); // Log headers
        const token = req.headers.authorization.split(" ")[1];
        // console.log("Token:", token); // Log token

        if (!token) {
            console.log("Not token");
            return res.status(401).json({ message: "Unauthorized" });
        }

        // console.log("Hello 2", token);

        // Xác thực token
        const now = Date.now() / 1000;
        const expirationThreshold = 5 * 60; // 5 minutes in seconds
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY, {
            algorithms: ["HS256"],
        });
        if (decodedToken.exp - now < expirationThreshold) {
            // Token is about to expire, generate a new one and send it in the response
            const newToken = jwt.sign({
                userId: user.ID_user,
                username: user.UserName,
                officeID:user.OfficeId,
                title: user.title,
            }, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.setHeader('Authorization', 'Bearer ' + newToken); // Include 'Bearer' before the new token
        }
        // Thêm thông tin người dùng vào req để sử dụng ở các middleware hoặc route khác
        console.log("sử dụng decodedToken");
        console.log("user", decodedToken.id);
        req.user = decodedToken;

        next();
    } catch (error) {
        console.error("Invalid token:", error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};
router.get("/me", isAuthenticated, (req, res) => {
    const user = req.user;
    console.log("user:", user);
    return res.status(200).json({ user: { userId: user.userId, username: user.username,officeID:user.officeID, title: user.title } });
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


//thêm thông tin bản thân
const createInfo = async (userid, fullname, phone, db, res) => {
    //xem đây là thông tin của ai
    const checkID = "Select * from user WHERE ID_user = ?"
    console.log(userid);
    db.query(checkID, [userid], (err, results) => {
        if (err) {
            console.error("Lỗi truy vấn cơ sở dữ liệu: " + err.message);
            return res.status(500).json({ message: "Lỗi thêm thông tin người dùng." });
        }
        const insertUserQuery =
            "UPDATE user set FullName = ? ,Phone = ? WHERE ID_user = ?";
        db.query(insertUserQuery, [fullname, phone, userid], (err) => {
            if (err) {
                console.error("Lỗi thêm người dùng vào cơ sở dữ liệu: " + err.message);
                return res.status(500).json({ message: "Lỗi update dữ liệu người dùng." });
            }
            return res.status(201).json({ message: "update dữ liệu thành công" });
        });

    })

}

// sửa đổi thông tin người dùng
router.put("/info", async (req, res) => {
    try {
        const db = req.app.locals.db;
        const { userid, fullname, phone } = req.body;
        await createInfo(userid, fullname, phone, db, res);
    }
    catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// lấy thông tin người dùng
router.get("/info_users", (req, res) => {
    const db = req.app.locals.db;
    const getUsersQuery = "SELECT * FROM user";
    db.query(getUsersQuery, (err, results) => {
        if (err) {
            console.error("Lỗi truy vấn cơ sở dữ liệu: " + err.message);
            return res.status(500).json({ message: "Lỗi lấy danh sách người dùng." });
        }

        return res.status(200).json({ users: results });
    });
});

module.exports = router;


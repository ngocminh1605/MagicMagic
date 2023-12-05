const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors());
var usersRouter = require('./routes/users.js');

var mysql = require('mysql2');
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "magicmagic",
  port: 3307
})

conn.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối cơ sở dữ liệu: ' + err.message);
  } else {
    console.log('Kết nối cơ sở dữ liệu thành công.');
  }
})

app.locals.db = conn;
app.use(express.json());
app.use('/users', usersRouter);


app.get('/', (req, res) => {
  res.send('Chào mừng đến với dự án của bạn với Express.js!');
});

app.listen(port, () => {
  console.log(`Máy chủ đang lắng nghe tại http://localhost:${port}`);
});

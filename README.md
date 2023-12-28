<h1 align="center">------------- MAGIC MAGIC -------------</h1>

<h1 align="center">Mục lục 📖</h1>

<h2 align="center">
  <a href="#introduction">I. Giới thiệu chung</a>
  <br />
  <a href="#about">II. Mô tả</a>
  <br />
  <a href="#function">III. Chức năng</a>
  <br />
  <a href="#technique">IV. Công nghệ</a>
  <br />
  <a href="#demo">V. Video demo</a>
  <br />
</h2>
<br />

## I. Giới thiệu chung <a name="introduction"></a>
1. Tên nhóm: 3x
2. Lớp: INT3306 2 - Phát triển ứng dụng Web
3. Tên web: MagicMagic
4. Thành viên:

| Order |        Name          |    ID    |        Email        |                 Github account                  |
| :---: |:--------------------:|:--------:|:-------------------:|:-----------------------------------------------:|
|   1   |  Nguyễn Phương Linh  | 21020545 | 21020545@vnu.edu.vn |       [Elyy27](https://github.com/Elyy27)       |
|   2   |    Trần Diệu Anh     | 21020279 | 21020279@vnu.edu.vn |  [AnhDieuTran](https://github.com/AnhDieuTran)  |
|   3   | Nguyễn Thị Ngọc Minh | 21020358 | 21020358@vnu.edu.vn | [ngocminh1605](https://github.com/ngocminh1605) |


## II. Mô tả <a name="about"></a>
MagicMagic là công ty hoạt động trong lĩnh vực chuyển phát. Công ty này có các điểm giao dịch phủ khắp cả nước. Mỗi điểm giao dịch phụ trách một vùng. Ngoài các điểm giao dịch, công ty cũng có nhiều điểm tập kết hàng hóa. Mỗi điểm giao dịch sẽ làm việc với một điểm tập kết và ngược lại.

Người gửi, có hàng cần gửi, đem hàng đến một điểm giao dịch (thường là gần nhất) để gửi. Hàng, sau đó, được đưa đến điểm tập kết ứng với điểm giao dịch của người gửi, rồi được chuyển đến điểm 
tập kết ứng với điểm giao dịch của người nhận. Tại điểm giao dịch của người nhận, nhân viên giao hàng sẽ chuyển hàng đến tận tay người nhận.

## III. Chức năng <a name="function"></a>
### 1. Lãnh đạo
- Quản lý hệ thống các điểm giao dịch và điểm tập kết với các thao tác thêm, sửa, xóa.
- Quản lý tài khoản trưởng điểm điểm tập kết và điểm giao dịch với các thao tác thêm, sửa, xóa. 
- Thống kê hàng gửi, hàng nhận trên toàn quốc, từng điểm giao dịch hoặc điểm tập kết. Thống kế dạng đường giúp so sánh số lượng đơn các tháng

### 2. Trưởng điểm giao dịch
- Cấp tài khoản cho giao dịch viên tại điểm giao dịch.
- Thống kê hàng gửi, hàng nhận tại điểm giao dịch.

### 3. Trưởng điểm tập kết
- Quản lý tài khoản nhân viên tại điểm tập kết với các thao tác thêm, sửa, xóa.
- Thống kê hàng đi, đến.

### 4. Nhân viên giao dịch
- Ghi nhận hàng cần gửi của khách (người gửi), in giấy biên nhận chuyển phát và phát cho khách hàng.
- Tạo đơn chuyển hàng gửi đến điểm tập kết mỗi/trước khi đem hàng gửi đến điểm tập kết.
- Xác nhận đơn hàng về từ điểm tập kết.
- Tạo đơn hàng cần chuyển đến tay người nhận.
- Xác nhận hàng đã chuyển đến tay người nhận theo .
- Xác nhận hàng không chuyển được đến người nhận và trả lại điểm giao dịch.
- Thống kê tổng đơn hàng, đơn gửi, đơn nhận, đơn hàng đã chuyển thành công, đơn hàng chuyển không thành công và trả lại điểm giao dịch.

### 5. Nhân viên tập kết
- Xác nhận đơn hàng đi từ điểm giao dịch chuyển đến.
- Tạo đơn chuyển hàng đến điểm tập kết đích (ứng với điểm giao dịch đích, tức điểm giao dịch phụ trách vùng ứng với địa chỉ của người nhận).
- Xác nhận đơn hàng nhận về từ điểm tập kết khác.
- Tạo đơn chuyển hàng đến điểm giao dịch đích.

### 6. Khách hàng
- Tra cứu thông tin, trạng thái và tiến trình chuyển phát của kiện hàng mình gửi.

## IV. Công nghệ <a name="technique"></a>
- Ngôn ngữ: ReactJS
- Cơ sở dữ liệu: MySQL

## V. Video Demo <a name="demo"></a>
link

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./donhangprint.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import logo from '../../assets/logo/express-delivery.png';
import { BiSquare, BiCheckSquare } from "react-icons/bi";
import { Link } from 'react-router-dom';

const DonHangPrint = () => {
  const { goodID } = useParams();
  const [orderInfo, setOrderInfo] = useState(null);
  const [qrCodeImage, setQrCodeImage] = useState(null);

  useEffect(() => {
    const fetchOrderInfo = async (goodID) => {
      try {
        const response = await axios.post(`http://localhost:3001/goods/infoOrder`, { goodID });
        if (!response.data || response.data.length === 0) {
          // Handle case where no order information is found
          return;
        }
        setOrderInfo(response.data.data[0]);
        setQrCodeImage(response.data.qrCodeImage);
      } catch (error) {
        console.error('Error fetching order information:', error);
      }
    };

    fetchOrderInfo(goodID);
  }, [goodID]);

  const handlePrint = () => {
    window.print();
  };


  return (
    <div className='add'>
      <Sidebar />
      <div className="container" style={{ overflowY: 'auto', height: '100vh' }}>
        <div className="title" style = {{fontSize:"25px"}}>
          Thông tin đơn hàng
        </div>

        <div className="grid-container">
          <div className='logo' style={{ alignContent: 'center', margin: 'auto', fontSize:"30px" }}>
            <img src={logo} alt=''/>
            <span>
              Magic<span>Magic</span>
            </span>
          </div>
          {orderInfo && (
            <div className="orderInfo">
              <img src={`data:image/png;base64, ${qrCodeImage}`} alt="QRCode" />
              {orderInfo.QR_code}

            </div>
          )}

        </div>


        {orderInfo && (
          <div className="grid-container">

            <div className="grid-column">
              <div className="grid-item-gui">
                <p style={{ fontWeight: "bold" }}>1. Họ tên địa chỉ người gửi:</p>
                <p>{orderInfo.Name_sender}</p>
                <p>{orderInfo.Address_sender}</p>
                <p style={{ fontWeight: "bold" }}>Điện thoại: {orderInfo.Phone_sender}</p>
                <p style={{ fontWeight: "bold" }}>Mã bưu chính:</p>
              </div>

              <div className="grid-item2" style = {{borderLeft:"2px solid black"}}>
                <p style={{ fontWeight: "bold" }}>3. Loại hàng gửi</p>
                <div style={{ flex: 1, display: "flex", alignItems: "flex-start"}}>
                  {orderInfo.Type === 'Tài liệu' && (<span role="img" aria-label="Tick"><BiCheckSquare /></span>)}
                  {orderInfo.Type !== 'Tài liệu' && (<span role="img" aria-label="Tick"><BiSquare /></span>)}
                  &nbsp; Tài liệu&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {orderInfo.Type === 'Hàng hóa' && (<span role="img" aria-label="Tick" style={{ marginLeft: '5px' }}><BiCheckSquare /></span>)}
                  {orderInfo.Type !== 'Hàng hóa' && (<span role="img" aria-label="Tick" style={{ marginLeft: '5px' }}><BiSquare /></span>)}
                  &nbsp; Hàng hóa
                </div>


                <p style={{ paddingBottom: "5px", fontWeight: "bold" }}>4. Nội dung giá trị bưu gửi:</p>
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Nội dung</th>
                      <th>Số lượng</th>
                      <th>Trị giá</th>
                      <th>Giấy tờ đính kèm</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Tổng</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid-item" style = {{borderLeft:"2px solid black"}}>
                <p style={{ fontWeight: "bold" }}>5. Dịch vụ đặc biệt/ Cộng thêm:</p>
                <p>............................................................................................................................................</p>
                <p style = {{marginBottom:"0.025px"}}>............................................................................................................................................</p>
              </div>
              <div className="grid-item" style = {{borderLeft:"2px solid black"}}>
                <p style={{ fontWeight: "bold" }}>6. Cam kết của người gửi khi không phát được bưu gửi:</p>
                <div style={{ flex: 1, display: "flex", alignItems: "flex-start"}}>
                  <span role="img" aria-label="Tick"><BiSquare /></span>&nbsp; Chuyển hoàn ngay &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span role="img" aria-label="Tick"><BiSquare /></span>&nbsp; Gọi điện cho người gửi&nbsp;&nbsp;
                  <span role="img" aria-label="Tick"><BiSquare /></span>&nbsp; Hủy
                  <br />
                </div>
                <div style={{ flex: 1, display: "flex", alignItems: "flex-start"}}>
                  <span role="img" aria-label="Tick"><BiSquare /></span>Chuyển hoàn trước ngày
                  <span role="img" aria-label="Tick"><BiSquare /></span>Chuyển hoàn khi hết thời gian lưu trữ
                </div>


              </div>
              <div className="grid-item" style = {{borderLeft:"2px solid black", borderBottom:"2px solid black"}}>
                <p style={{ fontWeight: "bold" }}>7. Cam kết của người gửi:</p>
                <p>Tôi chấp nhận các điều khoản tại mặt sau phiếu gửi và cam đoan bưu gửi này không chứa những mặt hàng nguy hiểm, cấm gửi. Trường hợp không phát được hãy thực hiện chỉ dẫn tại mục 6.</p>
                
                <p style={{ fontWeight: "bold" }}><span className="spacer">8. Ngày giờ gửi:</span> <span className="spacer">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Chữ ký người gửi</span></p>
                <p style={{marginTop:"6.1px"}}>{new Date(orderInfo.Senddate).toLocaleString()}
                </p>
              </div>


            </div>

            <div className="grid-column">
              <div className="grid-item-nhan">
                <p style={{ fontWeight: "bold" }}>2. Họ tên địa chỉ người nhận:</p>
                <p>{orderInfo.Name_receiver}</p>
                <p>{orderInfo.Address_receiver}</p>
                <p style={{ fontWeight: "bold" }}>Điện thoại: {orderInfo.Phone_receiver}</p>
                <p style={{ fontWeight: "bold" }}>Mã bưu chính:</p>
              </div>

              <div className='grid-container'>
                <div className="grid-subcolumn">
                  <div className="grid-item">
                    <p style={{ fontWeight: "bold" }}>9. Cước:</p>
                    <table className='price-table'>
                      <tbody>
                        <tr>
                          <td style={{ fontWeight: "bold" }}>a. Cước phí:</td>
                          <td>{orderInfo.mainPrice}</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "bold" }}>b. Phụ phí:</td>
                          <td>{orderInfo.secondPrice}</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "bold" }}>c. Cước GTGT</td>
                          <td>{orderInfo.GTVT}</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "bold" }}>d. VAT</td>
                          <td>{orderInfo.VAT}</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "bold" }}>Thu khác</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "bold" }}>f. Tổng thu:</td>
                          <td>{orderInfo.Price}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="grid-item">
                    <p style={{ fontWeight: "bold" }}>11. Thu của người nhận:</p>
                    <table className='price-table'>
                      <tbody>
                        <tr>
                          <td style={{ fontWeight: "bold" }}>COD:</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "bold" }}>Thu khác:</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "bold" }}>Tổng thu:</td>
                          <td>0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="grid-item">
                    <p style={{ fontWeight: "bold" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;13. Bưu cục chấp nhận</p>
                    <p style={{ alignItems: 'center' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Chữ ký GDV nhận</p>
                    <br /><br /><br /><br />
                  </div>
                </div>
                <div className="grid-subcolumn">
                  <div className="grid-item" style = {{borderRight:"2px solid black"}}>
                    <p style={{ fontWeight: "bold" }}>10. Khối lượng (kg): </p>
                    <p>Khối lượng thực tế:  {orderInfo.Weight}</p>
                    <p>Khối lượng quy đổi:   0</p>
                  </div>
                  <div className="grid-item" style = {{borderRight:"2px solid black"}}>
                    <p style={{ fontWeight: "bold" }}>12. Chú dẫn nghiệp vụ:</p>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>
                  <div className="grid-item" style = {{borderRight:"2px solid black"}}>
                    <p style={{ fontWeight: "bold"}}>14. Ngày giờ nhận:</p>
                    <p>......h....../......../......../20......</p>
                    Người nhận/ Người được ủy quyền nhận <br />
                    <i>(Ký, ghi rõ họ tên)</i>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        <div className="card-footer">
          <button type="submit" onClick={handlePrint} className="btn1">Print</button>
          <button className="btn2"><Link to={'/orders'} style={{ textDecoration: 'none', color: 'grey' }}>Back</Link></button>
        </div>
      </div>
    </div>
  );

};

export default DonHangPrint;

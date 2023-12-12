import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./donhangprint.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import { Button } from '@mui/material';
import logo from '../../assets/logo/express-delivery.png';
import { BiSquare, BiCheckSquare  } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { margin } from '@mui/system';

const DonHangPrint = () => {
  const navigate = useNavigate();
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
        <div className="title">
          Thông tin đơn hàng
        </div>
  
        <div className="grid-container">
            <div className='logo' style={{alignContent: 'center', margin: 'auto'}}>
              <img src={logo} alt='' />
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
              <div className="grid-item">
                  <p>1. Họ tên địa chỉ người gửi:</p>
                  <p>{orderInfo.Name_sender}</p>
                  <p>{orderInfo.Address_sender}</p>
                  <p>DĐiện thoại: {orderInfo.Phone_sender}</p>
                  <p>Mã bưu chính:</p>
              </div>
              
              <div className="grid-item">
                <p>3. Loại hàng gửi</p>

                {orderInfo.Type === 'Tài liệu' && (<span role="img" aria-label="Tick" style={{ marginLeft: '5px' }}><BiCheckSquare /></span>)}
                {orderInfo.Type !== 'Tài liệu' && (<span role="img" aria-label="Tick" style={{ marginLeft: '5px' }}><BiSquare /></span>)}
                &nbsp; Tài liệu
                
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                
                {orderInfo.Type === 'Hàng hóa' && (<span role="img" aria-label="Tick" style={{ marginLeft: '5px' }}><BiCheckSquare /></span>)}
                {orderInfo.Type !== 'Hàng hóa' && (<span role="img" aria-label="Tick" style={{ marginLeft: '5px' }}><BiSquare /></span>)}
                &nbsp; Hàng hóa 

                <p>4. Nội dung giá trị bưu gửi:</p>
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
              
              <div className="grid-item">
                  <p>5. Dịch vụ đặc biệt/ Cộng thêm:</p>
                  <p>.......................................................................................................................</p>
                  <p>.......................................................................................................................</p>
                </div>
              <div className="grid-item">
                  <p>6. Cam kết của người gửi khi không phát được bưu gửi:</p>
                  <span role="img" aria-label="Tick" style={{ marginLeft: '5px' }}><BiSquare /></span> Chuyển hoàn ngay &nbsp;&nbsp;
                  <span role="img" aria-label="Tick" style={{ marginLeft: '5px' }}><BiSquare /></span> Gọi điện cho người gửi&nbsp;&nbsp;
                  <span role="img" aria-label="Tick" style={{ marginLeft: '5px' }}><BiSquare /></span> Hủy
                  <br />
                  <span role="img" aria-label="Tick" style={{ marginLeft: '5px' }}><BiSquare /></span> Chuyển hoàn trước ngày&nbsp;&nbsp;
                  <span role="img" aria-label="Tick" style={{ marginLeft: '5px' }}><BiSquare /></span> Chuyển hoàn khi hết thời gian lưu trữ
                 
              </div>
              <div className="grid-item">
                  <p>7. Cam kết của người gửi:</p>
                  <p>Tôi chấp nhận.....</p>

                  <p><span class="spacer">8. Ngày giờ gửi:</span> <span class="spacer">Chữ ký người gửi</span></p>
                  <p>{new Date(orderInfo.Senddate).toLocaleString()}</p>
              </div>
              
          
            </div>
    
            <div className="grid-column">
                <div className="grid-item">
                    <p>2. Họ tên địa chỉ người nhận:</p>
                    <p>{orderInfo.Name_receiver}</p>
                    <p>{orderInfo.Address_receiver}</p>
                    <p>{orderInfo.Phone_receiver}</p>
                    <p>Mã bưu chính:</p>
                </div>
              
              <div className='grid-container'>
                <div className="grid-subcolumn">
                  <div className="grid-item">
                      <p>9. Cước:</p>
                      <table className='price-table'>
                        <tbody>
                          <tr>
                            <td>a. Cước phí:</td>
                            <td>{orderInfo.mainPrice}</td>
                          </tr>
                          <tr>
                            <td>b. Phụ phí:</td>
                            <td>{orderInfo.secondPrice}</td>
                          </tr>
                          <tr>
                            <td>c. Cước GTGT</td>
                            <td>{orderInfo.GTVT}</td>
                          </tr>
                          <tr>
                            <td>d. VAT</td>
                            <td>{orderInfo.VAT}</td>
                          </tr>
                          <tr>
                            <td>Thu khác</td>
                            <td>0</td>
                          </tr>
                          <tr>
                            <td>f. Tổng thu:</td>
                            <td>{orderInfo.Price}</td>
                          </tr>
                        </tbody>
                      </table>
                  </div>
                  <div className="grid-item">
                      <p>11. Thu của người nhận:</p>
                      <table className='price-table'>
                        <tbody>
                          <tr>
                            <td>COD:</td>
                            <td>0</td>
                          </tr>
                          <tr>
                            <td>Thu khác:</td>
                            <td>0</td>
                          </tr>
                          <tr>
                            <td>Tổng thu:</td>
                            <td>0</td>
                          </tr>
                        </tbody>
                      </table>
                  </div>
                  <div className="grid-item">
                      13. Bưu cục chấp nhận
                      <br />
                      Chữ ký GDV nhận
                      <br /><br /><br /><br />
                  </div>
                </div>
                <div className="grid-subcolumn">
                  <div className="grid-item">
                      <p>10. Khối lượng (kg): </p>
                      <p>Khối lượng thực tế:  {orderInfo.Weight}</p>
                      <p>Khối lượng quy đổi:   0</p>
                  </div>
                  <div className="grid-item">
                      <p>12. Chú dẫn nghiệp vụ:</p>
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                  </div>
                  <div className="grid-item">
                      <p>14. Ngày giờ nhận:</p>
                      <p>......h....../......../......../20......</p>
                      Người nhận/ Người được ủy quyền nhận <br />
                      <i>(Ký, ghi rõ họ tên)</i>
                  </div>
                </div>

              </div>
            </div>
          </div>
          )}
      
        <div className="card-footer" style={{ marginTop: '-10px' }}>
            <button type="submit" onClick={handlePrint} className="btn1">Print</button>
            <button className="btn2"><Link to={'/orders'} style={{ textDecoration: 'none', color: 'grey' }}>Back</Link></button>
        </div>
      </div>
    </div>
  );
  
};  

export default DonHangPrint;

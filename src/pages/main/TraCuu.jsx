import React, { useEffect, useState } from 'react';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import './tracuu.scss';
import { axiosInstance } from '../../constant/axios';
import { useParams } from 'react-router-dom';
import { InputLabel, Select, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

const TraCuu = () => {
    const {goodCode} = useParams();
    const [info, setInfo] = useState();
    const [state, setState] = useState();
   
    useEffect(() => {
        if (goodCode) {
            const fetchData = async (goodCode) => {
                try {
                    const response = await fetch('http://localhost:3001/goods/stateInfo', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({goodCode: goodCode}),
                    });
    
                    if (response.ok) {
                        const data = await response.json();
                        if (setInfo) { setInfo(data.info[0]); }
                        if (setState) { setState(data.state); }
                        
                    } else {
                        console.error('Lỗi lấy tỉnh:', response.statusText);
                    }
                } catch (error) {
                    console.error('Lỗi fetch data:', error);
                }
            };
    
            fetchData(goodCode);
        }
        
    }, [goodCode]);
  

  return (
    <div style={{ overflowY: 'auto', height: '100vh' }}>
        <div className='title'>
            Thông tin vận đơn
        </div>

        {info && 
            <div>
                Thông tin đơn hàng
                <div className="row1">
                    <div>Mã Đơn hàng: {goodCode}</div>
                    {state.length > 0 && (
                        <div>Tình trạng hiện tại: {state[state.length - 1].State}</div>
                    )}
                </div>

                <div className="row1">
                    <div>Ngày gửi: {new Date(info.Senddate).toLocaleString()}</div>
                    <div>Tổng chi phí: {Number(info.Price).toFixed(0)} VNĐ</div>
                    <div>Đơn vị vận chuyển: Magic Magic</div>
                </div>

                <div className="row1">
                    <div>Người gửi: {info.Name_sender}</div>
                    <div>Địa chỉ gửi: {info.Address_sender}</div>
                </div>

                <div className="row1">
                    <div>Người nhận: {info.Name_receiver}</div>
                    <div>Địa chỉ nhận: {info.Address_receiver}</div>
                </div>
            </div>        
        }

        {state && info &&
            <div>
                Chi tiết tình trạng vận đơn
                <table>
                    <thead>
                        <tr>
                            <td>Bưu cục</td>
                            <td>Trạng thái</td>
                            <td>Thời gian</td>
                            <td>Ghi chú</td>
                        </tr>
                    </thead>
                    <tbody>
                    {state.map((item, index) => (
                        <React.Fragment key={index}>
                            {item.State !== "Đang chờ"  && (
                                <tr>
                                    <td>{item.Name}</td>
                                    <td>
                                        {item.State === "Gửi trả về" ? "Đã gửi"
                                        : item.State === "Nhận trả về" ? "Đã nhận"
                                        : item.State}
                                    </td>
                                    <td>{new Date(item.Time_update).toLocaleString()}</td>
                                    <td>
                                        {item.State === "Đã nhận" || item.State === "Nhận trả về" ? "Đơn hàng đã được nhận ở"
                                        : item.State === "Đã gửi" || item.State === "Gửi trả về" ? "Đơn hàng đi khỏi bưu cục và sẽ tới điểm tiếp theo."
                                        : item.State === "Chờ nhận" ? "Đơn hàng đang được gửi tới người nhận tại " + info.Address_receiver
                                        : item.State === "Thành công" ? (index+=3, "Đơn hàng gửi tới người nhận thành công!")
                                        : item.State === "Trả về" ? "Không gửi tới được người nhận! Đơn hàng sẽ được trả về."
                                        : ""}

                                        {(item.State === "Đã nhận" || item.State === "Nhận trả về")  && item.Name.includes("TK") ? " điểm tập kết " + item.Address + "." : ""}
                                        {(item.State === "Đã nhận" || item.State === "Nhận trả về") && item.Name.includes("GD") ? " điểm giao dịch " + item.Address + "." : ""}
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>
        }

        <div className="card-footer">
            <button className="btn2" style={{marginTop: '35px'}}>
                <Link to={'/'} style={{  textDecoration: 'none', color: 'grey' }}>Back</Link>
            </button>
        </div>
    </div>
    
  );
};

export default TraCuu;

  
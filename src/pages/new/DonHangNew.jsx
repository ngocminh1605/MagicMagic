import React, { useState } from 'react';
import { InputLabel, Select, MenuItem, Button } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./donhangnew.scss";
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Sidebar from "../../components/sidebar/Sidebar";


const DonHangNew = () => {
    const navigate = useNavigate();
    const { userID } = useParams();

    const [senderFullName, setSenderFullName] = useState('');
    const [senderAddress, setSenderAddress] = useState('');
    const [senderPhoneNumber, setSenderPhoneNumber] = useState('');
    const [receiverFullName, setReceiverFullName] = useState('');
    const [receiverAddress, setReceiverAddress] = useState('');
    const [receiverPhoneNumber, setReceiverPhoneNumber] = useState('');
    const [shipmentType, setShipmentType] = useState('document');
    const [sendDateTime, setSendDateTime] = useState(new Date());
    const [mainFee, setMainFee] = useState('');
    const [extraFee, setExtraFee] = useState('');
    const [gtvtFee, setGtvtFee] = useState('');
    const [vatFee, setVatFee] = useState('');
    const [weight, setWeight] = useState('');

    const handleAddClick = async (e) => {
        e.preventDefault();

        if (
            senderFullName.trim() === '' ||
            senderAddress.trim() === '' ||
            senderPhoneNumber.trim() === '' ||
            receiverFullName.trim() === '' ||
            receiverAddress.trim() === '' ||
            receiverPhoneNumber.trim() === '' ||
            mainFee.trim() === '' ||
            extraFee.trim() === '' ||
            gtvtFee.trim() === '' ||
            vatFee.trim() === '' ||
            weight.trim() === ''
        ) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }
    
        // Prepare data to be sent to the server
        const requestData = {
            nameSender: senderFullName,
            addressSender: senderAddress,
            phoneSender: senderPhoneNumber,
            nameReceiver: receiverFullName,
            addressReceiver: receiverAddress,
            phoneReceiver: receiverPhoneNumber,
            type: shipmentType,
            weight: weight,
            mainPrice: mainFee,
            secondPrice: extraFee,
            GTVT: gtvtFee,
            VAT: vatFee,
            IdUser: userID,
            Senddate: sendDateTime.toISOString(),
        };

    
        try {
            // Send a POST request to the server
            const response = await fetch('http://localhost:3001/goods/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });
    
            // Handle the response from the server
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData.message); // Log success message
                alert('Đã thêm đơn hàng!');
                navigate(`/orders`)

            } else {
                console.error('Failed to create order:', response.statusText);
                alert('Thêm đơn hàng thất bại!Vui lòng kiểm tra lại thông tin!');
                return;
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };
    

    return (
        <div className='add'>
            <Sidebar />
            <form onSubmit={handleAddClick}>
                <div style={{ overflowY: 'auto', height: '100vh' }}>
                    <div className="title">
                        Create order
                    </div>
                    <div className="row">
                        <div className="content2">
                            <div className="form-group">
                                <InputLabel htmlFor="senderFullName">Họ tên người gửi</InputLabel>
                                <input id="senderFullName" value={senderFullName} onChange={e => setSenderFullName(e.target.value)} className="form-control" />
                            </div>

                            <div className="form-group">
                                <InputLabel htmlFor="senderAddress">Địa chỉ người gửi</InputLabel>
                                <input id="senderAddress" value={senderAddress} onChange={e => setSenderAddress(e.target.value)} className="form-control" />
                            </div>

                            <div className="form-group">
                                <InputLabel htmlFor="senderPhoneNumber">Số điện thoại người gửi</InputLabel>
                                <input id="senderPhoneNumber" value={senderPhoneNumber} onChange={e => setSenderPhoneNumber(e.target.value)} className="form-control" />
                            </div>
                        </div>

                        <div className="content2">
                            <div className="form-group">
                                <InputLabel htmlFor="receiverFullName">Họ tên người nhận</InputLabel>
                                <input id="receiverFullName" value={receiverFullName} onChange={e => setReceiverFullName(e.target.value)} className="form-control" />
                            </div>

                            <div className="form-group">
                                <InputLabel htmlFor="receiverAddress">Địa chỉ người nhận</InputLabel>
                                <input id="receiverAddress" value={receiverAddress} onChange={e => setReceiverAddress(e.target.value)} className="form-control" />
                            </div>

                            <div className="form-group">
                                <InputLabel htmlFor="receiverPhoneNumber">Số điện thoại người nhận</InputLabel>
                                <input id="receiverPhoneNumber" value={receiverPhoneNumber} onChange={e => setReceiverPhoneNumber(e.target.value)} className="form-control" />
                            </div>
                        </div>

                        <div className="content2">
                            <div className="form-group">
                                <InputLabel htmlFor="shipmentType">Loại hàng hóa</InputLabel>
                                <Select id="shipmentType" value={shipmentType} onChange={e => setShipmentType(e.target.value)} className="form-control">
                                    <MenuItem value="document">Tài liệu</MenuItem>
                                    <MenuItem value="goods">Hàng hóa</MenuItem>
                                </Select>
                            </div>
                            <div className="form-group">
                                <InputLabel htmlFor="weight">Khối lượng</InputLabel>
                                <input id="weight" value={weight} onChange={e => setWeight(e.target.value)} className="form-control" />
                            </div>
                            
                            <div className="form-group">
                                <div style = {{marginLeft: "20px"}}>
                                    <InputLabel htmlFor="sendDateTime">Ngày giờ gửi</InputLabel>
                                </div>
                                <DatePicker id="sendDateTime" selected={sendDateTime} onChange={date => setSendDateTime(date)} showTimeSelect dateFormat="Pp" className="form-control" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="content2">
                            <div className="form-group">
                                <InputLabel htmlFor="mainFee">Cước chính</InputLabel>
                                <input id="mainFee" value={mainFee} onChange={e => setMainFee(e.target.value)} className="form-control" />
                            </div>

                            <div className="form-group">
                                <InputLabel htmlFor="extraFee">Phụ phí</InputLabel>
                                <input id="extraFee" value={extraFee} onChange={e => setExtraFee(e.target.value)} className="form-control" />
                            </div>

                            <div className="form-group">
                                <InputLabel htmlFor="gtvtFee">Cước gtvt</InputLabel>
                                <input id="gtvtFee" value={gtvtFee} onChange={e => setGtvtFee(e.target.value)} className="form-control" />
                            </div>

                            <div className="form-group">
                                <InputLabel htmlFor="vatFee">Cước VAT</InputLabel>
                                <input id="vatFee" value={vatFee} onChange={e => setVatFee(e.target.value)} className="form-control" />
                            </div>
                        </div>

                    </div>

                    <div className="card-footer">
                        <button type="submit" className="btn1">Add</button>
                        <button className="btn2"><Link to={'/orders'} style={{ textDecoration: 'none', color: 'grey' }}>Back</Link></button>
                    </div>
                    
                </div>
                
            </form>
            
        </div>
    );
};

export default DonHangNew;

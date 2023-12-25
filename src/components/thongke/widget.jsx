import React, { useState, useEffect } from 'react';
import './widget.scss';
import sendIcon from './image/box.png';
import receiveIcon from './image/received.png';
import orderIcon from './image/order.png';
import successIcon from './image/success.png';
import returnIcon from './image/return.png';

const Widget = ({ officeID, type}) => {
    const [giatri, setGiatri] = useState({
        tongNhanTQ: 0,
        tongGuiTQ: 0,
        tongTQ: 0,
        tongSuccess: 0,
        tongReturn: 0,
    });

    useEffect(() => {
        const fetchData = async (officeID) => {
            try {
                const response = await fetch('http://localhost:3001/thongke/all', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: officeID }),
                });

                const responseData = await response.json();
    
                setGiatri({
                    tongNhanTQ: responseData.receive,
                    tongGuiTQ: responseData.send,
                    tongTQ: responseData.all,
                    tongSuccess: responseData.success,
                    tongReturn: responseData.return,
                });
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
    
        fetchData(officeID); 
    
    }, [officeID]);

    let data;

    switch (type) {
        case 'nhan':
            data = {
                title: 'TỔNG ĐƠN NHẬN',
                counter: giatri.tongNhanTQ,
                icon: (<img  
                    src={receiveIcon}
                    alt="Receive Icon"
                    style={{ width: '50px', height: '50px' }}
                />),
            };
            break;
        case 'gui':
            data = {
                title: 'TỔNG ĐƠN GỬI',
                counter: giatri.tongGuiTQ,
                icon: (<img  
                    src={sendIcon}
                    alt="Send Icon"
                    style={{ width: '50px', height: '50px' }}
                />),
            };
            break;

        case 'thanhcong':
            data = {
                title: 'TỔNG ĐƠN GỬI THÀNH CÔNG',
                counter: giatri.tongSuccess,
                icon: (<img  
                    src={successIcon}
                    alt="Success Icon"
                    style={{ width: '50px', height: '50px' }}
                />),
            };
            break;

        case 'tralai':
            data = {
                title: 'TỔNG ĐƠN GỬI TRẢ LẠI',
                counter: giatri.tongReturn,
                icon: (<img  
                    src={returnIcon}
                    alt="Return Icon"
                    style={{ width: '50px', height: '50px' }}
                />),
            };
            break;
       
        default:
            data = {
                title: 'TỔNG ĐƠN HÀNG',
                counter: giatri.tongTQ,
                icon: (<img  
                    src={orderIcon}
                    alt="Order Icon"
                    style={{ width: '50px', height: '50px' }}
                />),
            };
            break;
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">
                    {numberWithCommas(data.counter)}
                </span>    
            </div>
            <div className="right">
                {data.icon}
            </div>
        </div>
    );
};

export default Widget;

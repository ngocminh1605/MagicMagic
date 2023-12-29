import React, { useState, useEffect } from 'react';
import './widget.scss';
import sendIcon from './image/box.png';
import receiveIcon from './image/received.png';
import orderIcon from './image/order.png';
import successIcon from './image/success.png';
import returnIcon from './image/return.png';
import employeeIcon from './image/employee.png';
import TKIcon from './image/gather.png';
import GDIcon from './image/transfer.png';

const Widget = ({ officeID, type}) => {
    // State để lưu trữ giá trị các chỉ số thống kê
    const [giatri, setGiatri] = useState({
        tongNhanTQ: 0,
        tongGuiTQ: 0,
        tongTQ: 0,
        tongSuccess: 0,
        tongReturn: 0,
        tongNV1: 0,
        tongNV2: 0,
        tongTK: 0,
        tongGD: 0,
    });

    useEffect(() => {
        // Hàm fetch dữ liệu từ máy chủ khi có sự thay đổi trong officeID
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
    
                // Cập nhật state với dữ liệu mới
                setGiatri(prevState => ({
                    ...prevState,
                    tongNhanTQ: responseData.receive,
                    tongGuiTQ: responseData.send,
                    tongTQ: responseData.all,
                    tongSuccess: responseData.success,
                    tongReturn: responseData.return,
                }));
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
    
        // Hàm fetch dữ liệu nhân viên từ tất cả các chi nhánh
        const fetchEmployeeAll = async () => {
            try {
                const response = await fetch('http://localhost:3001/thongke/employee', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                const responseData = await response.json();
    
                // Cập nhật state với dữ liệu mới
                setGiatri(prevState => ({
                    ...prevState,
                    tongNV1: responseData.employee,
                }));
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
    
        // Hàm fetch dữ liệu nhân viên từ chi nhánh cụ thể (theo officeID)
        const fetchEmployeeLead = async (officeID) => {
            try {
                const response = await fetch('http://localhost:3001/thongke/employee', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ officeID: officeID }),
                });
    
                const responseData = await response.json();
    
                // Cập nhật state với dữ liệu mới
                setGiatri(prevState => ({
                    ...prevState,
                    tongNV2: responseData.employee,
                }));
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
    
         // Hàm fetch dữ liệu về số điểm giao dịch và số điểm tập kết
        const fetchOffice = async () => {
            try {
                const response = await fetch('http://localhost:3001/thongke/office', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                const responseData = await response.json();
    
                // Cập nhật state với dữ liệu mới
                setGiatri(prevState => ({
                    ...prevState,
                    tongGD: responseData.gd,
                    tongTK: responseData.tk,
                }));
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
    
        fetchData(officeID);
        fetchEmployeeAll();
        fetchEmployeeLead(officeID);
        fetchOffice();
    
    }, [officeID]);
    
    // Biến data chứa thông tin cần hiển thị dựa vào type được truyền vào
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

        case 'officeGD':
            data = {
                title: 'SỐ ĐIỂM GIAO DỊCH',
                counter: giatri.tongGD,
                icon: (<img  
                    src={GDIcon}
                    alt="GD Icon"
                    style={{ width: '50px', height: '50px' }}
                />),
            };
            break;

        case 'officeTK':
            data = {
                title: 'SỐ ĐIỂM TẬP KẾT',
                counter: giatri.tongTK,
                icon: (<img  
                    src={TKIcon}
                    alt="TK Icon"
                    style={{ width: '50px', height: '50px' }}
                />),
            };
            break;
        case 'allEmployee':
            data = {
                title: 'TỔNG SỐ NHÂN VIÊN',
                counter: giatri.tongNV1,
                icon: (<img  
                    src={employeeIcon}
                    alt="Employee Icon"
                    style={{ width: '50px', height: '50px' }}
                />),
            };
            break;

        case 'employee':
            data = {
                title: 'TỔNG SỐ NHÂN VIÊN',
                counter: giatri.tongNV2,
                icon: (<img  
                    src={employeeIcon}
                    alt="Employee Icon"
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

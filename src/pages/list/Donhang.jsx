import React from 'react';
import "./congvieclist.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import OrdersTable from '../../components/table/OrdersTable';
// import ChucVuTable from "../../components/datatable/ChucVuTable";

const DonHang = () =>
{
    return (
        <div className="list">
            <Sidebar />
                <div className="container">
                    <div className='title'>Orders</div>
                    <OrdersTable />
                </div>
            </div>
    );
};

export default DonHang;
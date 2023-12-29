import React, { useState } from 'react';
import "./congvieclist.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import OrdersTable from '../../components/table/OrdersTable';

const DonHang = () => {
  const [officeID, setOfficeID] = useState(null);
  const [userID, setUserID] = useState(null);
  const [title, setTitle] = useState(null);

  return (
    <div className="list">
      <Sidebar setOfficeID={setOfficeID} setUserID={setUserID} setTitle={setTitle}/>
      <div className="container">
        <div className='title'>Đơn hàng</div>
        <OrdersTable officeID={officeID} userID={userID} title={title}/>
      </div>
    </div>
  );
};

export default DonHang;

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import "./congvieclist.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import OrdersTable from '../../components/table/OrdersTable';
import DonHangNew from '../new/DonHangNew';

const DonHang = () => {
  const [officeID, setOfficeID] = useState(null);
  const [userID, setUserID] = useState(null);
  const {} = useParams();

  return (
    <div className="list">
      <Sidebar setOfficeID={setOfficeID} setUserID={setUserID} />
      <div className="container">
        <div className='title'>Orders</div>
        <OrdersTable officeID={officeID} userID={userID} />
      </div>
    </div>
  );
};

export default DonHang;

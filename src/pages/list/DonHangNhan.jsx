import React, { useState } from 'react';
import "./congvieclist.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import NhanDon from '../../components/table/NhanDon';


const DonHangNhan = () => {
  const [officeID, setOfficeID] = useState(null);

  return (
    <div className="list">
      <Sidebar setOfficeID={setOfficeID}/>
      <div className="container">
        <div className='title'>Nhận đơn hàng</div>
        <NhanDon officeID={officeID}/>
      </div>
    </div>
  );
};

export default DonHangNhan;

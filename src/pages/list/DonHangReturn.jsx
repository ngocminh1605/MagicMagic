import React, { useState } from 'react';
import "./congvieclist.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import ReturnTable from '../../components/table/ReturnTable';


const DonHangReturn = () => {
  const [officeID, setOfficeID] = useState(null);

  return (
    <div className="list">
      <Sidebar setOfficeID={setOfficeID}/>
      <div className="container">
        <div className='title'>Xác nhận hàng chuyển đến người nhận</div>
        <ReturnTable officeID={officeID}/>
      </div>
    </div>
  );
};

export default DonHangReturn;

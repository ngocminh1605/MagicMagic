import React, { useState } from 'react';
import "./congvieclist.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import ConfirmTable from '../../components/table/ConfirmTable';

const ConfirmDon = () => {
  const [officeID, setOfficeID] = useState(null);

  return (
    <div className="list">
      <Sidebar setOfficeID={setOfficeID}/>
      <div className="container">
        <div className='title'>Tạo đơn chuyển hàng</div>
        <ConfirmTable officeID={officeID} />
      </div>
    </div>
  );
};

export default ConfirmDon;

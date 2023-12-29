import React from 'react';
import "./congvieclist.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import OfficeTable from '../../components/table/OfficeTable';

const PhongBanList = () =>
{
    return (
        <div className="list">
            <Sidebar />
                <div className="container">
                    <div className='title'>Phòng ban</div>
                    <OfficeTable />
                </div>
            </div>
    );
};

export default PhongBanList;
import React from 'react';
import "./congvieclist.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import OfficeTable from '../../components/table/OfficeTable';
// import PhongBanTable from "../../components/datatable/PhongBanTable";
// import PhongBanNew from "../new/PhongBanNew";

const PhongBanList = () =>
{
    return (
        <div className="list">
            <Sidebar />
                <div className="container">
                    <div className='title'>Office</div>
                    <OfficeTable />
                </div>
            </div>
    );
};

export default PhongBanList;
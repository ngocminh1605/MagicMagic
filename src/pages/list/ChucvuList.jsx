import React from 'react';
import "./congvieclist.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import ChucVuTable from '../../components/table/ChucvuTable';

const ChucvuList = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="container">
                <div className='title'>Các chức vụ</div>
                <ChucVuTable />
            </div>
        </div>
    );
};

export default ChucvuList;
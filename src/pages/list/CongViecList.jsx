import React from 'react';
import "./congvieclist.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import CongviecTable from "../../components/datatable/CongViecTable";
// import CongViecNew from "../new/CongViecNew";

const CongViecList = () =>
{
    return (
        <div className="list">
            <Sidebar/>
            <div className="listContainer">
                <Navbar/>

            </div>
        </div>
    );
};

export default CongViecList;
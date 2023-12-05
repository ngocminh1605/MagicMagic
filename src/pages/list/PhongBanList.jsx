import React from 'react';
import "./congvieclist.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import PhongBanTable from "../../components/datatable/PhongBanTable";
// import PhongBanNew from "../new/PhongBanNew";

const PhongBanList = () =>
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

export default PhongBanList;
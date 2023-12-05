import React from 'react';
import "./congvieclist.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import ChucVuTable from "../../components/datatable/ChucVuTable";

const ChucVuList = () =>
{
    return (
        <div className="list">
            <Sidebar/>
            <div className="listContainer">
                <Navbar/>

                {/* <ChucVuTable/> */}

            </div>
        </div>
    );
};

export default ChucVuList;
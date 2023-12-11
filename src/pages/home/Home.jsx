import React from 'react';
import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from '../../components/thongke/widget';
import DonHangChart from '../../components/thongke/chart';
const Home = () =>
{

    return (
        <div className="home">
            <Sidebar/>
            <div className="homeContainer">
                <div className="widgets">
                    <Widget type="nhansu"/>
                    <Widget type="phongban"/>
                    <Widget type="duan"/>
                    <Widget type="chamcong"/>
                </div>
                <DonHangChart/>
            </div>
        </div>
    );
};

export default Home;
import React from 'react';
import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
//import Navbar from "../../components/navbar/Navbar";

const Home = () =>
{

    return (
        <div className="home">
            <Sidebar/>
            <div className="homeContainer">
                {/* <Navbar/> */}
                {/* <div className="widgets">
                    <Widget type="nhansu"/>
                    <Widget type="phongban"/>
                    <Widget type="duan"/>
                    <Widget type="luong"/>
                    {/*<Widget type="chamcong"/>
                    </div>*/}
            </div>
        </div>
    );
};

export default Home;
import React, { useState } from 'react';
import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from '../../components/thongke/widget';
import Chart from '../../components/thongke/chart';
import TableGD from '../../components/thongke/tableGD';
import TableTK from '../../components/thongke/tableTK';
const Home = () => {
    const [title, setTitle] = useState(null);
    const [officeID, setOfficeID] = useState(null);
    return (
        <div className="home">
            <Sidebar setTitle={setTitle} setOfficeID={setOfficeID}/>
            <div className="homeContainer" style={{ overflowY: 'auto', height: '100vh' }}>
                <div className="widgets">
                    {<Widget officeID={officeID} type="nhan" />}
                    {<Widget officeID={officeID} type="gui" />}
                    {<Widget officeID={officeID} type="tong"/>}
                    {title === 'Trưởng điểm giao dịch' && <Widget officeID={officeID} type="employee"/>}
                    {title === 'Trưởng điểm tập kết' && <Widget officeID={officeID} type="employee" />}
                </div>

                {title === 'admin' && 
                    <div className="widgets">
                        {<Widget officeID={officeID} type="officeGD" />}
                        {<Widget officeID={officeID} type="officeTK" />}
                        {<Widget officeID={officeID} type="allEmployee"/>}
                </div>
                }

                {title === 'Nhân viên giao dịch' &&
                    <div className="widgets">
                        {<Widget officeID={officeID} type="thanhcong" />}
                        {<Widget officeID={officeID} type="tralai" />}
                    </div>
                }

                {title === 'admin' && <Chart />}
                
                {title === 'admin' && 
                    <div className="tables">
                        <div className="table">
                            Điểm Giao dịch
                            <TableGD/>
                        </div>
                        <div className="table">
                            Điểm Tập kết
                            <TableTK/>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Home;
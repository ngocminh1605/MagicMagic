import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NhanVienList from "./pages/list/NhanVienList";
import PhongBanList from "./pages/list/PhongBanList";
import DonHang from "./pages/list/Donhang";
import DonHangNhan from "./pages/list/DonHangNhan";
import ConfirmDon from "./pages/list/ConfirmDon"
import Login from "./login/signup/login";
import NhanVienNew from "./pages/new/NhanVienNew";
import ChucvuList from "./pages/list/ChucvuList";
import './App.css';
import DonHangNew from "./pages/new/DonHangNew";
import DonHangPrint from "./pages/new/DonHangPrint";

import NhanVienEdit from "./pages/edit/NhanVienEdit"
import DonHangChuyen from "./pages/new/DonHangChuyen";
import Main from "./pages/main/main"


function App() {
    return (
        <div className="App">
            <div className="AppGlass">
                <BrowserRouter>
                    <Routes>
                        <Route path="/">
                            <Route index element={<Main />} />
                            <Route index path="login"  element={<Login />} />
                            <Route index path="home" element={<Home />} />
                            <Route path="nhanvien">
                                <Route index element={<NhanVienList />} />

                                {/* <Route path=":nhanvienID" element={<NhanVienSingle/>}/>
                            <Route path="edit/:nhanvienID" element={<NhanVienNew/>}/>
                             <Route path="new" element={<NhanVienNew/>}/> */}
                                <Route path="add" element={<NhanVienNew />} />
                                <Route path="edit/:userID" element={<NhanVienEdit/>} />
                            </Route>
                            <Route path="office">
                                <Route index element={<PhongBanList />} />
                                {/* <Route path=":phongbanID" element={<PhongBanSingle/>}/>
                            <Route path="new" element={<PhongBanNew/>}/> */}
                            </Route>
                            <Route path="orders">
                                <Route index element={<DonHang />} />

                                <Route path="add/:userID" element={<DonHangNew />} />
                                <Route path="view/:goodID" element={<DonHangPrint />} />
                            </Route>
                            <Route path="position">
                                <Route index element={<ChucvuList />} />

                                {/* <Route path=":chucvuID" element={<ChucVuSingle/>}/>
                            <Route path="new" element={<ChucVuNew/>}/> */}
                            </Route>
                            <Route path="create">
                                <Route index element={<ConfirmDon />} />

                                <Route path="transfer/:goodID" element={<DonHangChuyen/>}/>
                            </Route>

                            <Route path="receive">
                                <Route index element={<DonHangNhan />} />
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;

import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NhanVienList from "./pages/list/NhanVienList";
import PhongBanList from "./pages/list/PhongBanList";
import DonHang from "./pages/list/Donhang";
import Login from "./login/signup/login";
import NhanVienNew from "./pages/new/NhanVienNew";
import ChucvuList from "./pages/list/ChucvuList";
import './App.css';
import DonHangNew from "./pages/new/DonHangNew";
import { useEffect } from "react";

function App() {
    return (
        <div className="App">
            <div className="AppGlass">
                <BrowserRouter>
                    <Routes>
                        <Route path="/">
                            <Route index element={<Login />} />
                            <Route index path="home" element={<Home />} />
                            <Route path="nhanvien">
                                <Route index element={<NhanVienList />} />

                                {/* <Route path=":nhanvienID" element={<NhanVienSingle/>}/>
                            <Route path="edit/:nhanvienID" element={<NhanVienNew/>}/>
                             <Route path="new" element={<NhanVienNew/>}/> */}
                                <Route path="add" element={<NhanVienNew />} />
                            </Route>
                            <Route path="office">
                                <Route index element={<PhongBanList />} />
                                {/* <Route path=":phongbanID" element={<PhongBanSingle/>}/>
                            <Route path="new" element={<PhongBanNew/>}/> */}
                            </Route>
                            <Route path="orders">
                                <Route index element={<DonHang />} />
                                {/* <Route path=":chucvuID" element={<ChucVuSingle/>}/>
                            <Route path="new" element={<ChucVuNew/>}/> */}
                            </Route>
                            <Route path="position">
                                <Route index element={<ChucvuList />} />
                            </Route>
                            <Route path="create">
                                <Route index element={<DonHangNew />} />
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;

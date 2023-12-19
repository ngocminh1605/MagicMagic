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
import DonHangPrint from "./pages/new/DonHangPrint";
import NhanVienEdit from "./components/table/edit";
import NhanVienDetail from "./components/table/view";
import Main from "./pages/main/main"
import EditProfile from "./components/table/editProfile"

function App() {
    return (
        <div className="App">
            <div className="AppGlass">
                <BrowserRouter>
                    <Routes>
                        <Route path="/">
                            <Route index element={<Main />} />
                            <Route index path="login"  element={<Login />} />
                            <Route index path="profile" element={<EditProfile/>}/>
                            <Route index path="home" element={<Home />} />
                            <Route path="nhanvien">
                                <Route index element={<NhanVienList />} />

                                {/* <Route path=":nhanvienID" element={<NhanVienSingle/>}/>
                            <Route path="edit/:nhanvienID" element={<NhanVienNew/>}/>
                             <Route path="new" element={<NhanVienNew/>}/> */}
                                <Route path="add" element={<NhanVienNew />} />
                                <Route path="edit" element={<NhanVienEdit />} />
                                <Route path="detail" element={<NhanVienDetail />} />

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

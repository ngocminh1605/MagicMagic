import React, {useState, useEffect, createContext} from 'react';
import "./chamcongtable.scss"
import {DataGrid, gridClasses} from '@mui/x-data-grid';
import axios from 'axios';
import Button from '@mui/material/Button';

const LuongTable = () =>
{
    const [rows, setRows] = useState([]);

    const columns = [
        {
            field: 'luongId', headerName: 'Lương ID', minWidth: 150, flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'ngayTinhLuong', headerName: 'Ngày Tính Lương', minWidth: 150, flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'nhanVienId', headerName: 'Nhân Viên ID', minWidth: 150, flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'hoNhanVien', headerName: 'Họ Nhân Viên', minWidth: 150, flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'tenNhanVien', headerName: 'Tên Nhân Viên', minWidth: 200, flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'phongBan', headerName: 'Phòng Ban', minWidth: 200, flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'chucVu', headerName: 'Chức Vụ', minWidth: 200, flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'heSoChucVu', headerName: 'Hệ Số Chức Vụ', minWidth: 200, flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'congViec', headerName: 'Công Việc', minWidth: 200, flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'heSoCongViec', headerName: 'Hệ Số Công Việc', minWidth: 200, flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'soNgayLam', headerName: 'Ngày Làm', minWidth: 200, flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'soNgayNghiCP', headerName: 'Ngày Nghỉ CP', minWidth: 200, flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'soNgayNghiKP', headerName: 'Ngày Nghỉ KP', minWidth: 200, flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'thuongDuAn', headerName: 'Thưởng Dự Án', minWidth: 200, flex: 1, headerAlign: 'center',
            align: 'center'
        },

        {
            field: 'luongCanBan', headerName: 'Lương Căn Bản', minWidth: 200, flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'luongThucLanh', headerName: 'Lương Thực Lãnh', minWidth: 200, flex: 1, headerAlign: 'center',
            align: 'center'
        },
    ];

    function numberWithCommas(x)
    {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }


    useEffect(async () =>
    {
        const result = await axios('http://localhost:8080/api/luong');
        let rowData = result.data.map(items =>
        {
            return {
                id: items.luongId,
                luongId: items.luongId,
                ngayTinhLuong: items.ngayTinhLuong,
                nhanVienId: items.nhanVien.nhanVienId,
                hoNhanVien: items.nhanVien.hoNhanVien,
                tenNhanVien: items.nhanVien.tenNhanVien,
                phongBan: items.nhanVien.phongBan.tenPhongBan,
                chucVu: items.nhanVien.chucVu.tenChucVu,
                heSoChucVu: items.nhanVien.chucVu.heSoChucVu,
                congViec: items.nhanVien.congViec.tenCongViec,
                heSoCongViec: items.nhanVien.congViec.heSoCongViec,
                soNgayLam: items.soNgayLam,
                soNgayNghiCP: items.soNgayNghiCP,
                soNgayNghiKP: items.soNgayNghiKP,
                thuongDuAn: items.thuongDuAn,
                luongCanBan: numberWithCommas(items.nhanVien.luongCanBan),
                luongThucLanh: numberWithCommas(items.luongThucLanh),
                ...items
            }
        });
        console.log("Lấy đc từ API ", rowData);
        setRows(rowData);
    }, []);

    //// Tính Lương
    const tinhLuong = () =>
    {
        axios.post("http://localhost:8080/api/luong/tinhluong").then(res =>
        {
            console.log("res: ", res)
            if (res.data === "Fail")
            {
                alert("Tính lương thất bại! Không tồn tại nhân viên.")
            } else if (res.data === "Conflict")
            {
                alert("Tính lương thất bại! Đã tính lương tháng trước.")
            } else
            {
                let rowData = res.data.map(items =>
                {
                    return {
                        id: items.luongId,
                        luongId: items.luongId,
                        ngayTinhLuong: items.ngayTinhLuong,
                        nhanVienId: items.nhanVien.nhanVienId,
                        hoNhanVien: items.nhanVien.hoNhanVien,
                        tenNhanVien: items.nhanVien.tenNhanVien,
                        phongBan: items.nhanVien.phongBan.tenPhongBan,
                        chucVu: items.nhanVien.chucVu.tenChucVu,
                        heSoChucVu: items.nhanVien.chucVu.heSoChucVu,
                        congViec: items.nhanVien.congViec.tenCongViec,
                        heSoCongViec: items.nhanVien.congViec.heSoCongViec,
                        soNgayLam: items.soNgayLam,
                        soNgayNghiCP: items.soNgayNghiCP,
                        soNgayNghiKP: items.soNgayNghiKP,
                        thuongDuAn: items.thuongDuAn,
                        luongCanBan: numberWithCommas(items.nhanVien.luongCanBan),
                        luongThucLanh: numberWithCommas(items.luongThucLanh)
                    }
                });
                setRows((preState) => [...preState, ...rowData])
                alert("Tính lương thành công!")
            }
        }).then(`OK`).catch(err => alert(`Tính lương thất bại! ${err}.`))
        console.log("------------->", rows);
    }

    return (

        <div className="datatable">
            <div className="addNew">
                <Button className="link" onClick={tinhLuong}>Tính Lương</Button>
            </div>

            <DataGrid className="chinhmauCC"
                      rows={rows}
                      columns={columns}
                      pageSize={16}
                      rowsPerPageOptions={[100]}
                      isRowSelectable={() => false}
                      sx={{
                          boxShadow: 2,

                          "& .MuiDataGrid-columnHeaders": {
                              backgroundColor: '#09203f',
                              backgroundImage: 'linear-gradient(250deg, #537895 15%, #32516F 60%)',
                              fontSize: 16,
                              color: '#ffffff',
                              borderRadius: 2
                          },

                          "& .MuiDataGrid-row": {
                              color: '#32516F',
                              fontWeight: 'bold',
                              fontSize: 16,

                              "&:nth-of-type(n)": {
                                  backgroundColor: 'white',
                                  "&:hover": {
                                      backgroundColor: 'rgba(184,198,219,0.87)'
                                  }
                              },
                              "&:nth-of-type(2n)": {
                                  backgroundColor: 'rgba(215,222,238,0.47)',
                                  "&:hover": {
                                      backgroundColor: 'rgba(184,198,219,0.87)'
                                  }
                              }
                          }
                      }}
            />
        </div>
    );
};

export default LuongTable;
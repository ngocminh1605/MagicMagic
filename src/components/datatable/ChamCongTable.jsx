import React, {useState, useEffect, createContext} from 'react';
import "./chamcongtable.scss"
import {DataGrid, gridClasses} from '@mui/x-data-grid';
import axios from 'axios';
import Button from '@mui/material/Button';
import ChamCongNew from "../../pages/new/ChamCongNew";

export const ChucNangContext = createContext(); // Object gồm Provider và Consumer

const ChamCongTable = () =>
{
    const [rows, setRows] = useState([]);
    const [dk, setDk] = useState({
        flag: false,
        chucnang: 0,
        dlCC: {}
    })
    console.log("ban đàu", dk.flag, dk.chucnang, dk.dlCC);

    const resetFlag = (value) =>
    {
        setDk({...dk, flag: value});
    }

    const columns = [
        {
            field: 'chamCongId', headerName: 'Chấm Công ID', minWidth: 150, flex: 1, headerAlign: 'center',
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
            field: 'ngayChamCong', headerName: 'Ngày Chấm Công', minWidth: 180, flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'tenTrangThai', headerName: 'Trạng Thái', minWidth: 180, flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'control', headerName: 'Chức năng', minWidth: 200, flex: 1, headerAlign: 'center',
            align: 'center',
            renderCell: (params) =>
            {
                return (
                    <div className="cellAction">
                        <Button className="update" onClick={() =>
                        {
                            return suaCongViec(params.row)
                        }}>Sửa</Button>

                        <Button className="delete" onClick={(e) =>
                        {
                            e.stopPropagation();
                            xoaChamCong(params.row)
                        }}>Xóa</Button>
                    </div>
                );
            },
        },
    ];


    useEffect(async () =>
    {
        const result = await axios('http://localhost:8080/api/chamcong');

        let rowData = result.data.map(items =>
        {
            return {
                id: items.chamCongId,
                chamCongId: items.chamCongId,
                nhanVienId: items.nhanVien.nhanVienId,
                hoNhanVien: items.nhanVien.hoNhanVien,
                tenNhanVien: items.nhanVien.tenNhanVien,
                ngayChamCong: items.ngayChamCong,
                tenTrangThai: matchTenTrangThai(items.trangThaiChamCong.tenTrangThai),
                ...items
            }
        });
        console.log("Lấy đc từ API ", rowData);

        setRows(rowData);
    }, []);

    const matchTenTrangThai = (tenTT) =>
    {
        // let tentt;
        switch (tenTT)
        {
            case "1":
                return "Đi Làm";
            case "2":
                return "Nghỉ có Phép";
            case "3":
                return "Nghỉ Không Phép";
        }
    }

    //// Cấp phát
    const capPhatCC = () =>
    {
        axios.post("http://localhost:8080/api/chamcong/capphat").then(res =>
        {
            let rowData = res.data.map(items =>
            {
                return {
                    id: items.chamCongId,
                    chamCongId: items.chamCongId,
                    nhanVienId: items.nhanVien.nhanVienId,
                    hoNhanVien: items.nhanVien.hoNhanVien,
                    tenNhanVien: items.nhanVien.tenNhanVien,
                    ngayChamCong: items.ngayChamCong,
                    tenTrangThai: matchTenTrangThai(items.trangThaiChamCong.tenTrangThai),
                    ...items
                }
            });
            // for (let item of rowData)
            // {
            //     setRows((previous) =>
            //     {
            //         return [...previous, item]
            //     })
            // }
            setRows((preState) => [...preState, ...rowData])
        }).then(`OK`).catch(err => alert(`Thêm thất bài r huhu1!! ${err}`))
        console.log("------------->", rows);
    }

/////Thêm Chấm Công
    const themChamCong = () =>
    {
        setDk({
            ...dk,
            flag: true,
            chucnang: 1
        })
    }

    const themData = (dlMoi) =>
    {
        let rowData = dlMoi.map(items =>
        {
            return {
                id: items.chamCongId,
                chamCongId: items.chamCongId,
                nhanVienId: items.nhanVien.nhanVienId,
                hoNhanVien: items.nhanVien.hoNhanVien,
                tenNhanVien: items.nhanVien.tenNhanVien,
                ngayChamCong: items.ngayChamCong,
                tenTrangThai: matchTenTrangThai(items.trangThaiChamCong.tenTrangThai),
                ...items
            }
        });
        setRows((preState) => [...preState, ...rowData])
        console.log("------------->", rows);
    }


///Sửa Chấm Công
    const suaCongViec = (cc) =>
    {
        console.log("dl lấy đc", cc);
        setDk({
            flag: true,
            chucnang: 2,
            dlCC: cc
        })
    }

    const resetData = (dlmoi) =>
    {
        let temp = rows.findIndex((obj => obj.chamCongId === dlmoi.chamCongId));
        console.log("Trước update!!: ", rows[temp]);
        rows[temp].tenTrangThai = matchTenTrangThai(dlmoi.trangThaiChamCong.tenTrangThai);
        console.log("SAu update: ", rows[temp])
        setRows(rows);
    }


////Xóa Chấm Công

    const xoaChamCong = (cc) =>
    {
        axios.put(`http://localhost:8080/api/chamcong/remove/${cc.chamCongId}`, cc)
            .then(res =>
                {
                    alert("Đã xóa chấm công này!!")
                }
            )
            .catch(err => alert(`Xóa thất bai!! ${err}`))
        setRows(rows.filter((a) => a.chamCongId !== cc.chamCongId));
    }

    return (

        <div className="datatable">
            <div className="addNew">
                {/*<Link to="/congviec/new" style={{textDecoration: "none"}}>*/}
                {/*</Link>*/}
                <Button className="link" style={{marginRight: '10px'}} onClick={capPhatCC}>Cấp phát</Button>
                <Button className="link" onClick={themChamCong}>Thêm</Button>
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
            {console.log("Sau mỗi làn  thây đôi đk", dk)}
            <ChucNangContext.Provider value={dk}>
                <ChamCongNew resetFlag={resetFlag} themData={themData} resetData={resetData}/>
            </ChucNangContext.Provider>

        </div>
    );
};

export default ChamCongTable;
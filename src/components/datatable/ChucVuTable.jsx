import React, {useState, useEffect} from 'react';
import "./chucvutable.scss"
import {DataGrid, gridClasses} from '@mui/x-data-grid';
import axios from 'axios';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import ChucVuNew from "../../pages/new/ChucVuNew";

const ChucvuTable = () =>
{
    const [item, setItem] = useState([]);
    const [value, setValue] = useState({
        flag: false,
        dlCV: {
            id: 0,
            idCv: '',
            tenCv: '',
            hsCv: '',
            statusCV: 1
        }
    });
    const [rows, setRowData] = useState([]);
    const [chucNang, setChucNang] = useState(0);

    const resetFlag = (value) =>
    {
        setValue(value);
    }

    const columns = [
        {
            field: 'chucVuId', headerName: 'Mã Chức Vụ', flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'tenChucVu', headerName: 'Tên Chức Vụ', flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'heSoChucVu', headerName: 'Hệ Số Chức Vụ', flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'control', headerName: 'Chức năng', flex: 1, headerAlign: 'center',
            align: 'center',
            renderCell: (params) =>
            {
                return (
                    <div className="cellAction">
                        <Link to={`/chucvu/${params.row.chucVuId}`}
                              state={
                                  {

                                      cvID: `${params.row.chucVuId}`,
                                      cvName: `${params.row.tenChucVu}`,
                                      cvHeso: `${params.row.heSoChucVu}`,
                                      cvStatus: `${params.row.status}`
                                  }
                              }
                              thuoctinh={100}
                              style={{textDecoration: "none"}}>
                            <Button variant="outlined" className="view"
                            >Xem</Button>
                        </Link>

                        <Button className="update" onClick={() =>
                        {
                            return suaChucVu(params.row)
                        }}>Sửa</Button>

                        <Button className="delete" onClick={() =>
                        {
                            return xoaChucVu(params.row)
                        }}>Xóa</Button>
                    </div>
                );
            },
        },
    ];


    useEffect(async () =>
    {
        const result = await axios('http://localhost:8080/api/chucvu');

        let rowData = result.data.map(items =>
        {
            return {
                id: items.chucVuId,
                ...items
            }
        });
        console.log("Lấy đc từ API ", rowData);
        setRowData(rowData);
    }, []);

///////Thêm Chức Vụ
    const themChucVu = () =>
    {
        setChucNang(2);
        setValue({...value, flag: true});
        console.log("Dl cần thêm ", value);
    }

    const themData = (dlMoi) =>
    {
        setRowData((previous) =>
        {
          return [...previous,{
              ...dlMoi,
              id: dlMoi.chucVuId,
          }]
        });
        console.log("------------->",rows);
    }


/////Sửa Chức Vụ
    const suaChucVu = (cv) =>
    {
        console.log("dl lấy đc", cv);
        setChucNang(1);
        setValue({
            flag: true, ...cv
        });
    }

    const resetData = (dlmoi) =>
    {
        let temp = rows.findIndex((obj => obj.chucVuId === dlmoi.chucVuId));
        console.log("Trước update!!: ", rows[temp]);
        rows[temp].tenChucVu = dlmoi.tenChucVu;
        rows[temp].heSoChucVu = dlmoi.heSoChucVu;
        console.log("Sau update: ", rows[temp])
        setRowData(rows);
    }


///////////////Xóa Chức Vụ
    const xoaChucVu = (cv) =>
    {
        console.log("Lấy đc idCV là ", cv);
        ktraCV(cv);
    }

    const ktraCV = async (cv) =>
    {
        const result = await axios.get(
            `http://localhost:8080/api/chucvu/nvchucvu/${cv.chucVuId}`);
        const rowData = result.data.map(items =>
        {
            return {
                id: items.nhanVienId,
                nhanVienId: items.nhanVienId,
                hoNhanVien: items.hoNhanVien,
                tenNhanVien: items.tenNhanVien,
                ngayVaoLam: items.ngayVaoLam,
                tenPhongBan: items.phongBan.tenPhongBan,
                tenChucVu: items.chucVu.tenChucVu,
                status: items.status
            }
        });
        // console.log(rowData.length);
        {
            rowData.length > 0 ? alert("Bạn không thể xóa chức vụ có nhân viên đang làm!!") : xoaCV(cv)
        }
    }

    const xoaCV = (cv) =>
    {
        // event.preventDefault();
        // const newCv = {...cv, status: 0};
        axios.put(`http://localhost:8080/api/chucvu/remove/${cv.chucVuId}`, cv)
            .then(res => alert("Đã xóa chức vụ này!!"))
            .catch(err => alert(`Xóa thất bai!! ${err}`))
        const newRows = rows.filter((a) =>
        {
            if (a.chucVuId === cv.chucVuId)
            {
                return false;
            }
            return true;
        });
        console.log("Dl mới là ", newRows);
        setRowData(newRows);
    }


    return (
        <div className="datatable">

            <div className="addNew">
                {/*<Link to="/chucvu/new" style={{textDecoration: "none"}}>*/}
                {/*</Link>*/}
                <Button className="link" onClick={themChucVu}>Thêm</Button>
            </div>

            <DataGrid className="chinhmau"
                      rows={rows}
                      columns={columns}
                      pageSize={8}
                      rowsPerPageOptions={[100]}
                      isRowSelectable={() => true}
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

            {/*{console.log("ban đàu dã render", value)}*/}
            <ChucVuNew giatri={value} resetFlag={resetFlag} resetData={resetData} chucNang={chucNang}
                         themData={themData}/>

        </div>
    );
};

export default ChucvuTable;
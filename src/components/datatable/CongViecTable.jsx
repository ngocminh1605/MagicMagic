import React, {useState, useEffect} from 'react';
import "./congviectable.scss"
import {DataGrid, gridClasses} from '@mui/x-data-grid';
import axios from 'axios';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import CongViecNew from "../../pages/new/CongViecNew";

const CongviecTable = () =>
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
    console.log("ban đàu", value, rows);


    const columns = [
        {
            field: 'congViecId', headerName: 'Công việc ID', flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'tenCongViec', headerName: 'Tên Công Việc', flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'heSoCongViec', headerName: 'Hệ Số Công Việc', flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'control', headerName: 'Chức năng', flex: 1, headerAlign: 'center',
            align: 'center',
            renderCell: (params) =>
            {
                return (
                    <div className="cellAction">
                        <Link to={`/congviec/${params.row.congViecId}`}
                              state={
                                  {

                                      cvID: `${params.row.congViecId}`,
                                      cvName: `${params.row.tenCongViec}`,
                                      cvHeso: `${params.row.heSoCongViec}`,
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
                            return suaCongViec(params.row)
                        }}>Sửa</Button>

                        <Button className="delete" onClick={() =>
                        {
                            return xoaCongViec(params.row)
                        }}>Xóa</Button>
                    </div>
                );
            },
        },
    ];


    useEffect(async () =>
    {
        const result = await axios('http://localhost:8080/api/congviec');

        let rowData = result.data.map(items =>
        {
            return {
                id: items.congViecId,
                ...items
            }
        });
        console.log("Lấy đc từ API ", rowData);
        // rowData.push({id: 26, congViecId: 26, tenCongViec: 'g', heSoCongViec: 0.36, status: 1});
        setRowData(rowData);
    }, []);

///////Thêm Công Việc
    const themCongViec = () =>
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
              id: dlMoi.congViecId,
          }]
        });
        console.log("------------->",rows);
    }


/////Sửa Công Việc
    const suaCongViec = (cv) =>
    {
        console.log("dl lấy đc", cv);
        setChucNang(1);
        setValue({
            flag: true, ...cv
        });
    }

    const resetData = (dlmoi) =>
    {
        let temp = rows.findIndex((obj => obj.congViecId === dlmoi.congViecId));
        console.log("Trước update!!: ", rows[temp]);
        rows[temp].tenCongViec = dlmoi.tenCongViec;
        rows[temp].heSoCongViec = dlmoi.heSoCongViec;
        console.log("SAu update: ", rows[temp])
        setRowData(rows);
    }


///////////////Xóa Công Việc
    const xoaCongViec = (cv) =>
    {
        console.log("Lấy đc idCV là ", cv);
        ktraCV(cv);
    }

    const ktraCV = async (cv) =>
    {
        const result = await axios.get(
            `http://localhost:8080/api/congviec/nvcongviec/${cv.congViecId}`);
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
            rowData.length > 0 ? alert("Bạn không thể xóa công việc có nhân viên đang làm!!") : xoaCV(cv)
        }
    }

    const xoaCV = (cv) =>
    {
        // event.preventDefault();
        // const newCv = {...cv, status: 0};
        axios.put(`http://localhost:8080/api/congviec/remove/${cv.congViecId}`, cv)
            .then(res => alert("Đã xóa công việc này!!"))
            .catch(err => alert(`Xóa thất bai!! ${err}`))
        const newRows = rows.filter((a) =>
        {
            if (a.congViecId === cv.congViecId)
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
                {/*<Link to="/congviec/new" style={{textDecoration: "none"}}>*/}
                {/*</Link>*/}
                <Button className="link" onClick={themCongViec}>Thêm</Button>
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
            <CongViecNew giatri={value} resetFlag={resetFlag} resetData={resetData} chucNang={chucNang}
                         themData={themData}/>

        </div>
    );
};

export default CongviecTable;
import React, {useState, useEffect} from 'react';
import "./congviectable.scss"
import {DataGrid, gridClasses} from '@mui/x-data-grid';
import axios from 'axios';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import PhongBanNew from "../../pages/new/PhongBanNew";

const PhongbanTable = () =>
{
    const [item, setItem] = useState([]);
    const [value, setValue] = useState({
        flag: false,
        dlPB: {
            id: 0,
            idPb: '',
            tenPb: '',
            sdtPb: '',
            statusPB: 1
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
            field: 'phongBanId', headerName: 'Phòng Ban ID', flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'tenPhongBan', headerName: 'Tên Phòng Ban', flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'sdtPhongBan', headerName: 'SDT Phòng Ban', flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'control', headerName: 'Chức năng', flex: 1, headerAlign: 'center',
            align: 'center',
            renderCell: (params) =>
            {
                return (
                    <div className="cellAction">
                        <Link to={`/phongban/${params.row.phongBanId}`}
                              state={
                                  {

                                      pbID: `${params.row.phongBanId}`,
                                      pbName: `${params.row.tenPhongBan}`,
                                      pbSDT: `${params.row.sdtPhongBan}`,
                                      pbStatus: `${params.row.status}`
                                  }
                              }
                              thuoctinh={100}
                              style={{textDecoration: "none"}}>
                            <Button variant="outlined" className="view"
                            >Xem</Button>
                        </Link>

                        <Button className="update" onClick={() =>
                        {
                            return suaPhongBan(params.row)
                        }}>Sửa</Button>

                        <Button className="delete" onClick={() =>
                        {
                            return xoaPhongBan(params.row)
                        }}>Xóa</Button>
                    </div>
                );
            },
        },
    ];


    useEffect(async () =>
    {
        const result = await axios('http://localhost:8080/api/phongban');

        let rowData = result.data.map(items =>
        {
            return {
                id: items.phongBanId,
                ...items
            }
        });
        console.log("Lấy đc từ API ", rowData);
        // rowData.push({id: 26, congViecId: 26, tenCongViec: 'g', heSoCongViec: 0.36, status: 1});
        setRowData(rowData);
    }, []);

///////Thêm Công Việc
    const themPhongBan = () =>
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
                id: dlMoi.phongBanId,
            }]
        });
        console.log("------------->",rows);
    }


/////Sửa Công Việc
    const suaPhongBan = (pb) =>
    {
        console.log("dl lấy đc", pb);
        setChucNang(1);
        setValue({
            flag: true, ...pb
        });
    }

    const resetData = (dlmoi) =>
    {
        let temp = rows.findIndex((obj => obj.phongBanId === dlmoi.phongBanId));
        console.log("Trước update!!: ", rows[temp]);
        rows[temp].tenPhongBan = dlmoi.tenPhongBan;
        rows[temp].sdtPhongBan = dlmoi.sdtPhongBan;
        console.log("Sau update: ", rows[temp])
        setRowData(rows);
    }


///////////////Xóa Công Việc
    const xoaPhongBan = (pb) =>
    {
        console.log("Lấy đc idCV là ", pb);
        ktraPB(pb);
    }

    const ktraPB = async (pb) =>
    {
        const result = await axios.get(
            `http://localhost:8080/api/phongban/nvpb/${pb.phongBanId}`);
        const rowData = result.data.map(items =>
        {
            return {
                id: items.phongBanId,
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
            rowData.length > 0 ? alert("Bạn không thể xóa phòng ban có nhân viên đang làm!!") : xoaPB(pb)
        }
    }

    const xoaPB = (pb) =>
    {
        // event.preventDefault();
        // const newCv = {...cv, status: 0};
        axios.put(`http://localhost:8080/api/phongban/remove/${pb.phongBanId}`, pb)
            .then(res => alert("Đã xóa phòng ban này!!"))
            .catch(err => alert(`Xóa thất bai!! ${err}`))
        const newRows = rows.filter((a) =>
        {
            if (a.phongBanId === pb.phongBanId)
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
                <Button className="link" onClick={themPhongBan}>Thêm</Button>
            </div>

            <DataGrid className="chinhmau"
                      rows={rows}
                      columns={columns}
                      pageSize={8}
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

            {/*{console.log("ban đàu dã render", value)}*/}
            <PhongBanNew giatri={value} resetFlag={resetFlag} resetData={resetData} chucNang={chucNang}
                         themData={themData}/>

        </div>
    );
};

export default PhongbanTable;
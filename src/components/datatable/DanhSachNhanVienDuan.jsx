import React, {useState, useEffect} from 'react';
import "./nhanvien_chamcong.scss"
import {DataGrid} from '@mui/x-data-grid';
import axios from 'axios';
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import DeleteIcon from '@mui/icons-material/Delete';
// import {Link} from 'react-router-dom'


const DanhSachNhanVienDuan = (props) =>
{
    // const [listAPI, setListAPI] = useState([]);
    const [rows, setRowData] = useState([]);
    const columns = [
        {
            field: 'duAnId',
            headerName: 'Dự Án ID',
            minWidth: 120,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'tenDuAn',
            headerName: 'Tên Dự Án',
            minWidth: 180,
            flex: 1,
            headerAlign: 'center',
            rowAlign: 'center',
            align: 'center'
        },
        {
            field: 'thuongDuAn', headerName: 'Thưởng Dự Án', minWidth: 150, flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'ngayBatDau', headerName: 'Ngày Bắt Đầu', minWidth: 150, flex: 1, headerAlign: 'center',
            align: 'center'
        },
        {
            field: 'ngayKetThuc', headerName: 'Ngày Kết Thúc', minWidth: 180, flex: 1, headerAlign: 'center',
            align: 'center'
        },
    ];

    console.log("DS ", rows);

    useEffect(async () =>
    {
        // console.log("id nhân đc là ", props.id);

        const result = await axios(
            `http://localhost:8080/api/nhanvienduan`);
        const rowData = result.data.filter((item) => item.nhanVien.nhanVienId === props.id).map(items =>
        {
            return {
                id: items.duAn.duAnId,
                duAnId: items.duAn.duAnId,
                tenDuAn: items.duAn.tenDuAn,
                thuongDuAn: items.duAn.thuongDuAn,
                ngayBatDau: items.duAn.ngayBatDau,
                ngayKetThuc: items.duAn.ngayKetThuc,
            }
        });
        setRowData(rowData);
    }, []);


    return (
        <div className="datatableCC">
            <DataGrid className="chinhmauCCNV" style={{marginTop: '30px'}}
                      rows={rows}
                      columns={columns}
                      pageSize={4}
                      rowsPerPageOptions={[100]}
                      disableSelectionOnClick={true}
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

export default DanhSachNhanVienDuan;
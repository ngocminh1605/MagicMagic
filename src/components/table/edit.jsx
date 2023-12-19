// import React, { useMemo, useState } from 'react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-quartz.css';
// import './NhanvienTable.scss';
// import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
// import "ag-grid-community/styles/ag-grid.css"; // Core CSS
// import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
// import { createRoot } from 'react-dom/client';
// import { Button, IconButton } from '@mui/material';
// import { useNavigate } from 'react-router-dom';


// const OfficeTable = () => {
//   const navigate = useNavigate();
//   const handleEditClick = (params) => {
//     console.log('Edit clicked for row:', params.data);
//   };

//   const handleDeleteClick = (params) => {
//     console.log('Delete clicked for row:', params.data);
//   };

//   const ActionButtonsRenderer = (props) => (
//     <div style={{ justifyContent: "space-between" }}>
//       {/* Check if the icons are visible */}
//       {/* {EditIcon && <IconButton onClick={() => handleEditClick(props)}><EditIcon /></IconButton>}
//       {DeleteIcon && <IconButton onClick={() => handleDeleteClick(props)}><DeleteIcon /></IconButton>} */}
//       <Button
//         style={{
//           textTransform: 'none',
//           backgroundColor: 'green',
//           color: 'white',
//           width: 60,
//           marginRight: 15,
//           borderRadius: 20,
//           height: 35,
//         }}
//       >
//         View
//       </Button>
//       <Button
//         style={{
//           textTransform: 'none',
//           backgroundColor: 'orange',
//           color: 'white',
//           width: 60,
//           marginRight: 15,
//           borderRadius: 20,
//           height: 35,
//         }}
//       >
//         Edit
//       </Button>
//       <Button
//         style={{
//           textTransform: 'none',
//           backgroundColor: "crimson",
//           color: 'white',
//           width: 60,
//           marginRight: 15,
//           borderRadius: 20,
//           height: 35,
//         }}
//       >
//         Delete
//       </Button>
//     </div>
//   );
//   // Row Data: The data to be displayed.
//   const [rowData, setRowData] = useState([
//     { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
//     { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
//     { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
//     { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
//     { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
//     { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
//     { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
//     { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
//     { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
//     { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
//     { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
//     { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
//     { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
//     { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
//     { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
//     { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
//     { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
//     { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },
//     { fullName: 'linh ph', gender: 'female', birth: '2 / 8 / 2003', phone: '0963282003', email: 'linhph@gmail.com', iden: '123243', start: '10 / 12 / 2023', officeid: 'office1', position: 'boss1' },


//   ]);

//   // Column Definitions: Defines & controls grid columns.
//   const [colDefs, setColDefs] = useState([
//     { field: "fullName" },
//     { field: "gender" },
//     { field: "birth" },
//     { field: "phone" },
//     { field: "email" },
//     { field: "iden" },
//     { field: "start" },
//     { field: "officeid" },
//     { field: "position" },
//     {
//       headerName: "Action",
//       minWidth: 250,
//       cellRenderer: ActionButtonsRenderer, // Sử dụng trực tiếp hàm renderer
//     },
//   ]);

//   const defaultColDef = useMemo(() => ({
//     filter: true,
//   }));
//   const gridOptions = {
//     // domLayout: 'autoHeight',
//     headerHeight: 45,
//     rowHeight: 45,
//     suppressHorizontalScroll: false,
//     PaginationPanel: true,
//   };
//   return (
//     // Container with theme & dimensions
//     <div
//       className={
//         "ag-theme-quartz ag-theme-acmecorp"
//       }
//       style={{ width: '100%', height: '70%', flexDirection: "column" }}
//     >
//       <Button
//         // onClick={() => navigate('/nhanvien/add')}
//         style={{
//           textTransform: 'none',
//           backgroundColor: "#FF9AA2",
//           color: 'white',
//           width: 70,
//           marginRight: 15,
//           borderRadius: 10,
//           height: 40,
//           marginLeft: 'auto',
//           display: "flex",
//           marginBottom: 15
//         }}
//       >
//         Add
//       </Button>
//       <AgGridReact
//         rowData={rowData}
//         columnDefs={colDefs}
//         defaultColDef={defaultColDef}
//         pagination={true}
//         gridOptions={gridOptions}
//       />
//     </div>
//   );
// }
// export default OfficeTable;

import React, { useState } from 'react';
import '../../pages/new/nhanviennew.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import { axiosInstance } from '../../constant/axios';


const NhanVienEdit = () => {
  const [username, setUsername] = useState('ely');
  const [password, setPassword] = useState('ely');
  const [email, setEmail] = useState('ely@gmail.com');
  const [office, setOffice] = useState('1');
  const [position, setPosition] = useState('Trưởng điểm');
  const navigate = useNavigate();

  const IsValidate = () => {
      let isProceed = true;
      let errorMessage = 'Please enter the value in ';
      if (!username) {
          isProceed = false;
          errorMessage += 'Username';
      }

      if (!password) {
          isProceed = false;
          errorMessage += 'Password';
      }

      if (!email) {
          isProceed = false;
          errorMessage += 'Email';
      }

      if (!isProceed) {
          // setAlert({ status: 'error', title: 'Error', description: 'Please enter the value in' });
      } else {
          if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
              isProceed = false;
              // setAlert({ status: 'error', title: 'Error', description: 'Please enter a valid email' });
          }
      }

      return isProceed;
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!IsValidate()) {
          return;
      }
      try {
          const response = await axiosInstance.post('users/register', {
              username: username,
              password: password,
              email: email,
              officeID: office,
              Title: position,
          });
          if (response.status === 201) {
              navigate('/nhanvien');
          } else {
              // Registration failed
              console.log("fails");
          }
      } catch (error) {

          console.error('Error during registration:', error);

      }
  };

  return (
      <div className="add">
          <Sidebar />
          <div className="container">
              <div className="title">Employee</div>
              
              <form className="offset-lg-1 col-lg-8" onSubmit={handleSubmit}>
                  <div className="row">
                      <div className="content2">
                          <div className="form-group">
                              <InputLabel htmlFor="username">User Name <span className="errmsg">*</span></InputLabel>
                              <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" />
                          </div>

                          <div className="form-group">
                              <InputLabel htmlFor="password">Password <span className="errmsg">*</span></InputLabel>
                              <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
                          </div>
                      </div>

                      <div className="content1">
                          <div className="form-group2">
                              <InputLabel htmlFor="email">Email <span className="errmsg">*</span></InputLabel>
                              <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                          </div>
                      </div>

                      <div className="content2">

                          <div className="form-group">
                              <InputLabel htmlFor="office">Office <span className="errmsg">*</span></InputLabel>
                              <select id="office" value={office} onChange={(e) => setOffice(e.target.value)} className="form-control">
                                  <option value="">-- Select Office --</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                              </select>
                          </div>

                          <div className="form-group">
                              <InputLabel htmlFor="position">Position <span className="errmsg">*</span></InputLabel>
                              <select id="position" value={position} onChange={(e) => setPosition(e.target.value)} className="form-control">
                                  <option value="">-- Select Title--</option>
                                  <option value="Trưởng điểm">Trưởng điểm</option>
                                  <option value="Nhân viên giao dịch">Nhân viên giao dịch</option>
                                  <option value="Nhân viên tập kết">Nhân viên tập kết</option>
                              </select>
                          </div>
                      </div>
                  </div>

                  <div className="card-footer">
                      <button type="submit" className="btn1" onClick={handleSubmit}>Save</button>
                      <button className="btn2"><Link to={'/nhanvien'} style={{ textDecoration: 'none', color: 'grey' }}>Cancel</Link></button>
                  </div>
              </form>
          </div>
      </div>
  );
};
export default NhanVienEdit;

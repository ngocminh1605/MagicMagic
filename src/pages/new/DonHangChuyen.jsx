import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem } from '@mui/material';
import "./donhangchuyen.scss";
import { useNavigate } from 'react-router-dom';

const DonHangChuyen = ({ goodID, officeID, closePopup }) => { 
  const navigate = useNavigate();
  
  const [orderInfo, setOrderInfo] = useState({});
  const [officeInfo, setOfficeInfo] = useState({});
  const [options, setOptions] = useState([]);
  const [officeSelected, setOfficeSelected] = useState('');

  
  useEffect(() => {
    async function fetchOrderInfo() {
      try {
        const response = await fetch('http://localhost:3001/goods/infoOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ goodID: goodID }),
        });

        if (response.ok) {
          const data = await response.json();
          const orderData = data.data;
          setOrderInfo(orderData);
        } else {
          console.error('Failed to fetch order information. Server responded with:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching order information:', error);
      }
    };
   
    async function fetchOption() {
      try {
        if (officeID !== null) {
          const response = await fetch('http://localhost:3001/office/options', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ officeID: officeID, goodID: goodID }),
          });

          if (response.ok) {
            const data = await response.json();
            const officeData = data.data;
            const option = data.option;

            setOfficeInfo(officeData);
            setOptions(option);
          } else {
            console.error('Failed to fetch option information:', response.status, response.statusText);
          }
        }
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    }
  
    async function fetchData() {
      await fetchOrderInfo();
      await fetchOption();
    }

    fetchData();
    if (options.length > 0) {
      setOfficeSelected(options[0].ID_office);

    }

  }, [goodID, officeID]);

  const handleAddClick = async (e) => {
    //e.preventDefault();

    const requestData = {
      goodID: goodID, 
      officeIDSend: officeID, 
      officeIDWait: officeSelected,
    };

    try {
      const response = await fetch('http://localhost:3001/transfer/sendAndWait', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.message); 
        alert('Tạo đơn chuyển hàng thành công!');
        return;

      } else {
        console.error('Failed to create order:', response.statusText);
        alert('Tạo đơn chuyển thất bại! Vui lòng kiểm tra lại thông tin!');
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
    
  };

  const handleChangeOffice = (event) => {
    //event.stopPropagation();
    const selectedValue = event.target.value;
    console.log(selectedValue)
    setOfficeSelected(selectedValue);
  };
  

  return (
    <div>
      <form onSubmit={handleAddClick}>
        <div>
          <div className="title">
            Tạo đơn chuyển hàng
          </div>
          {orderInfo.length > 0 && (
            <>
              Mã đơn hàng: {orderInfo[0].QR_code} <br />
              Địa chỉ người gửi: {orderInfo[0].Address_sender} <br />
              Địa chỉ người nhận: {orderInfo[0].Address_receiver} <br />
            </>
          )}

          {officeInfo.length > 0 && (
            <>
              Tên office hiện tại: {officeInfo[0].Name} <br />
              Địa chỉ hiện tại: {officeInfo[0].Address} <br />
            </>
          )}

          {options.destination && (
            <div  style={{ marginLeft: '5px', color: 'gray' }}>
              Chuyển đến người nhận tại: {options.destination}
            </div>
          )}

          {Array.isArray(options) && options.length > 0 && (
            <div className="form-group" style={{width: "450px",flexDirection:"column",marginLeft:"-20px",marginTop:"-18px"}}>
              <label htmlFor="officeSelect">Office chuyển đến</label>
              <select
                id="officeSelect"
                value={officeSelected}
                onChange={handleChangeOffice}
                //onClick={handleChangeOffice}
                onBeforeInput={handleChangeOffice}
              >
                {setOfficeSelected(options[0].ID_office)}
                {options.map((option) => (
                  <option key={option.ID_office} value={option.ID_office} >
                    {option.Name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="card-footers" style = {{flex:1,}}>
            <button type="submit" className="btn-modal btn1 ">Confirm</button>
            <button onClick={closePopup} className='btn1 btn-modal'>Close</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DonHangChuyen;

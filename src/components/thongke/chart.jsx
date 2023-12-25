import React, { useState, useEffect } from 'react';
import './chart.scss';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';

const Chart = ({ officeID }) => {
    const [data, setData] = useState([]);
    const [year, setYear] = useState(2023);

    useEffect(() => {
        const fetchAll = async (officeID) => {
            try {
                const response = await fetch('http://localhost:3001/thongke/byMonth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({id: officeID}),
                });

                const responseData = await response.json();
    
                const allMonthsData = Array.from({ length: 12 }, (_, index) => ({
                    month: "Tháng " + (index + 1).toString(), 
                    total: 0,
                    send: 0,
                    receive: 0,
                }));

                if (responseData.all[year]) {
                    responseData.all[year].forEach(({ month, total }) => {
                        const monthIndex = parseInt(month, 10) - 1; 
                        allMonthsData[monthIndex].total = total;
                    });
                }

                if (responseData.send[year]) {
                    responseData.send[year].forEach(({ month, total }) => {
                        const monthIndex = parseInt(month, 10) - 1;
                        allMonthsData[monthIndex].send = total;
                    });
                }

                if (responseData.receive[year]) {
                    responseData.receive[year].forEach(({ month, total }) => {
                        const monthIndex = parseInt(month, 10) - 1;
                        allMonthsData[monthIndex].receive = total;
                    });
                }

                setData(allMonthsData);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchAll(officeID);
    }, [year, officeID]);

    const handleInputChange = (e) => {
        setYear(e.target.value);
    };

    return (
        <div className="chart-container">
            <div className="chart" style={{ width: '80vw', marginLeft: '15px', height: '100%' }}>
                <div className="titleChart">
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Năm</InputLabel>
                            <Select
                                style={{ color: '#6076BE', fontWeight: '500px' }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={year}
                                label="Năm"
                                onChange={handleInputChange}
                            >
                                <MenuItem value={2023} style={{ color: '#6076BE', fontWeight: '500px' }}>2023</MenuItem>
                                <MenuItem value={2024} style={{ color: '#6076BE', fontWeight: '500px' }}>2024</MenuItem>
                                <MenuItem value={2025} style={{ color: '#6076BE', fontWeight: '500px' }}>2025</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <br />

                <ResponsiveContainer width="100%" height={450}>
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" stroke='#6076BE' />
                        <YAxis stroke='#6076BE' />
                        <Tooltip />
                        <Legend align='right' />
                        <Line type="monotone" dataKey="send" name="Số đơn đã gửi" stroke="#6076BE" />
                        <Line type="monotone" dataKey="receive" name="Số đơn đã nhận" stroke="#FEBC3B" />
                        <Line type="monotone" dataKey="total" name="Tổng số đơn" stroke='#FF6178' />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Chart;

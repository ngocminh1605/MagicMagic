import React, { useState, useEffect } from 'react';
import './chart.scss';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';

const DonHangChart = () => {
    const [data, setData] = useState([]);
    const [year, setYear] = useState(2022);

    useEffect(() => {
        // Mock data for demonstration
        const mockData = [
            { month: 'Tháng 1', soNgayDiLam: 20, soNgayNghiCP: 5, soNgayNghiKP: 3 },
            { month: 'Tháng 2', soNgayDiLam: 18, soNgayNghiCP: 4, soNgayNghiKP: 2 },
            { month: 'Tháng 3', soNgayDiLam: 34, soNgayNghiCP: 4, soNgayNghiKP: 2 },
            { month: 'Tháng 4', soNgayDiLam: 13, soNgayNghiCP: 4, soNgayNghiKP: 2 },
            { month: 'Tháng 5', soNgayDiLam: 12, soNgayNghiCP: 4, soNgayNghiKP: 2 },
            { month: 'Tháng 6', soNgayDiLam: 23, soNgayNghiCP: 4, soNgayNghiKP: 2 },
            { month: 'Tháng 7', soNgayDiLam: 10, soNgayNghiCP: 4, soNgayNghiKP: 2 },
            { month: 'Tháng 8', soNgayDiLam: 9, soNgayNghiCP: 4, soNgayNghiKP: 2 },
            { month: 'Tháng 9', soNgayDiLam: 16, soNgayNghiCP: 4, soNgayNghiKP: 2 },
            { month: 'Tháng 10', soNgayDiLam: 10, soNgayNghiCP: 4, soNgayNghiKP: 2 },
            { month: 'Tháng 11', soNgayDiLam: 20, soNgayNghiCP: 4, soNgayNghiKP: 2 },
            { month: 'Tháng 12', soNgayDiLam: 13, soNgayNghiCP: 4, soNgayNghiKP: 2 },

        ];

        setData(mockData);
    }, [year]);

    const handleInputChange = (e) => {
        setYear(e.target.value);
    };

    return (
        <div className="chart">
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
                            <MenuItem value={2021} style={{ color: '#6076BE', fontWeight: '500px' }}>2021</MenuItem>
                            <MenuItem value={2022} style={{ color: '#6076BE', fontWeight: '500px' }}>2022</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <br />

            <ResponsiveContainer width="100%" height={400}>
                <BarChart
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
                    <Bar dataKey="soNgayDiLam" name="Số đơn đã gửi" stackId="a" fill="#6076BE" stroke="#6076BE" />
                    <Bar dataKey="soNgayNghiCP" name="Số đơn đã nhận" stackId="a" fill="#FEBC3B" stroke="#FEBC3B" />
                    <Bar dataKey="soNgayNghiKP" name="Số đơn đã hoàn" stackId="a" fill='#FF6178' stroke="#FF6178" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DonHangChart;

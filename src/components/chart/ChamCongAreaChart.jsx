import React, {useState, useEffect, createContext} from 'react';
import "./thuongthangareachart.scss"
// import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import axios from "axios";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';

const ChamCongAreaChart = () =>
{
    const [data, setData] = useState([]);
    const [year, setYear] = useState(2022);
    console.log("Năm là ", year, data);

    useEffect(async () =>
    {
        const result = await axios(`http://localhost:8080/api/chamcong/thongke/${year}`);
        setData(result.data);
    }, [year]);

    const handleInputChange = (e) =>
    {
        setYear(e.target.value);
    };

    return (
        <div className="chart">
            <div className="titleChart">
                <Box sx={{minWidth: 120}}>  {/* Select của Material UI*/}
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Năm</InputLabel>
                        <Select
                            style={{color: '#6076BE', fontWeight: '500px'}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={year}
                            label="Năm"
                            onChange={handleInputChange}
                        >
                            <MenuItem value={2021} style={{color: '#6076BE', fontWeight: '500px'}}>2021</MenuItem>
                            <MenuItem value={2022} style={{color: '#6076BE', fontWeight: '500px'}}>2022</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <br/>

            {/* StackbarChart của Rechartjs*/}
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
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="month" stroke='#6076BE'/>
                    <YAxis stroke='#6076BE'/>
                    <Tooltip/>
                    <Legend align='right'/>
                    <Bar dataKey="soNgayDiLam" name="Số ngày đi làm" stackId="a" fill="#6076BE" stroke="#6076BE"/>
                    <Bar dataKey="soNgayNghiCP" name="Số ngày nghỉ có phép" stackId="a" fill="#FEBC3B"
                         stroke="#FEBC3B"/>
                    <Bar dataKey="soNgayNghiKP" name="Số ngày nghỉ không phép" stackId="a" fill='#FF6178'
                         stroke="#FF6178"/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChamCongAreaChart;
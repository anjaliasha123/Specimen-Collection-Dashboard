import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchData = createAsyncThunk(
    'data/fetch' , async ()=>{
        const response = await axios.get('http://localhost:9090/zikaDashboard/herp');
        pause(5000);
        return response.data;
    }
);

const pause = (duration)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve, duration)
    });
}
export {fetchData};
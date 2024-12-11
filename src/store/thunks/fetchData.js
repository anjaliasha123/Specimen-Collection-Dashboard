import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchData = createAsyncThunk(
    'data/fetch' , async (collection)=>{
        const response = await axios.get(`http://localhost:9090/zikaDashboard/${collection}`);
        await pause(8000);
        return response.data;
    }
);

const pause = (duration)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve, duration)
    });
}
export {fetchData};
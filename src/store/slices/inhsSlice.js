import { createSlice } from "@reduxjs/toolkit";
import {fetchData} from '../thunks/fetchData';

const inhsSlice = createSlice({
    name: 'inhsdata',
    initialState: {
        data: null,
        collectionName: 'herp',
        isLoading: false,
        error: null,
        selectedFeatureToEdit: null
    },
    extraReducers(builder){
        builder.addCase(
            fetchData.pending, (state, action)=>{
                state.isLoading = true;
            }
        );
        builder.addCase(
            fetchData.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.data = action.payload;
            }
        );
        builder.addCase(
            fetchData.rejected, (state, action)=>{
                state.isLoading = true;
                state.error = error;
            }
        );
    }
});

export const inhsReducer = inhsSlice.reducer;
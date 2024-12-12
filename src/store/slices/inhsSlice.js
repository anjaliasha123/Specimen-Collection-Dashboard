import { createSlice } from "@reduxjs/toolkit";
import {fetchData} from '../thunks/fetchData';

const itemsDummy = {
    type: "FeatureCollection",
    features: [
        {
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -83.2142,
                    35.11419
                ]
            },
            "properties": {
                "country": "United States",
                "phylum": "Chordata",
                "scientificName": "Plethodon jordani",
                "genus": "Plethodon",
                "state": "North Carolina",
                "family": "Plethodontidae",
                "kingdom": "Animalia",
                "class": "Amphibia"
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -87.73791,
                    40.13832
                ]
            },
            "properties": {
                "country": "United States",
                "phylum": "Chordata",
                "scientificName": "Ambystoma opacum",
                "genus": "Ambystoma",
                "state": "Illinois",
                "family": "Ambystomatidae",
                "kingdom": "Animalia",
                "class": "Amphibia"
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -82.8982,
                    32.0909
                ]
            },
            "properties": {
                "country": "United States",
                "phylum": "Chordata",
                "scientificName": "Nerodia taxispilota",
                "genus": "Nerodia",
                "state": "Georgia",
                "family": "Colubridae",
                "kingdom": "Animalia",
                "class": "Reptilia"
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -89.43808,
                    37.50383
                ]
            },
            "properties": {
                "country": "United States",
                "phylum": "Chordata",
                "scientificName": "Nerodia cyclopion",
                "genus": "Nerodia",
                "state": "Illinois",
                "family": "Colubridae",
                "kingdom": "Animalia",
                "class": "Reptilia"
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -84.49361,
                    31.47494
                ]
            },
            "properties": {
                "country": "United States",
                "phylum": "Chordata",
                "scientificName": "Farancia abacura",
                "genus": "Farancia",
                "state": "Georgia",
                "family": "Colubridae",
                "kingdom": "Animalia",
                "class": "Reptilia"
            },
            "type": "Feature"
        },
    ],
};
const inhsSlice = createSlice({
    name: 'inhsdata',
    initialState: {
        data: itemsDummy,
        collectionName: 'herp',
        isLoading: false,
        error: null,
        selectedFeatureToView: null,
    },
    reducers: {
        setSelectedFeatureToView: (state, action)=>{
            state.selectedFeatureToView = action.payload;
            console.log('state selected:', state.selectedFeatureToView);
        }
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
                // console.log(action.payload);
                // console.log("success")
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
export const {setSelectedFeatureToView} = inhsSlice.actions;
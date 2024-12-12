import MapView from '../components/MapView';
import LocationSearch from '../components/LocationSearch';
import { useThunk } from '../hooks/useThunk';
import { fetchData } from '../store/index';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import Skeleton from '../components/utility/Skeleton';
import { GoSync } from 'react-icons/go';

function HomePage() {
    

    const [doFetchData, isLoadingData, isLoadingError] = useThunk(fetchData);

    const { data } = useSelector((state) => {
        return state.inhs;
    });
    useEffect(() => {
        // doFetchData();
    }, []);

    let content;
    if (isLoadingData) content = <Skeleton times={10} className="h-10 w-full" />;
    else if (isLoadingError) content = <div>Error loading data...</div>
    else content =  <LocationSearch />;
    return (
        <div className="h-screen w-screen grid grid-cols-2 gap-4">
            {isLoadingData && <div className="col-span-1 p-2"> Loading Map Contents... <GoSync className='animate-spin'/></div>}
            {!isLoadingData && <MapView data={data} className="col-span-1 p-2" />}
            <div className="col-span-1 p-2">
                {content}
            </div>
            {/* {console.log(data)} */}
        </div>
    );
}
export default HomePage;
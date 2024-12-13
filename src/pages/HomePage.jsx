import MapView from '../components/MapView';
import LocationSearch from '../components/LocationSearch';
import { useThunk } from '../hooks/useThunk';
import { fetchData } from '../store/index';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useContext } from 'react';
import Skeleton from '../components/utility/Skeleton';
import { GoSync } from 'react-icons/go';
import { AuthContext } from "../helper/KeycloakProvider";

function HomePage() {
    
    const { isAuthenticated, login, logout } = useContext(AuthContext);
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
        <>
        {
            isAuthenticated &&
            <div className="h-screen w-screen grid grid-cols-2 gap-4">
            {isLoadingData && <div className="col-span-1 p-2"> Loading Map Contents... <GoSync className='animate-spin'/></div>}
            {!isLoadingData && <MapView data={data} className="col-span-1 p-2" />}
            <div className="col-span-1 p-2">
                {content}
            </div>
            {/* {console.log(data)} */}
        </div>
        }
        {/* {!isAuthenticated && <div><GoSync className='animate-spin'/></div>} */}
        </>
    );
}
export default HomePage;
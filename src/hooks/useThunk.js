import { useDispatch } from "react-redux";
import { useState, useCallback } from "react";

function useThunk(thunk){
    const [isLoading, setIsLoading] = useState(false);
    const [loadingError, setLoadingError] = useState(null);
    const dispatch = useDispatch();
    const runThunk = useCallback(
        (arg)=>{
            setIsLoading(true);
            dispatch(thunk(arg))
            .unwrap()
            .catch((err)=>setLoadingError(err))
            .finally(()=>setIsLoading(false));
        }
        , [dispatch, thunk]);
    return [runThunk, isLoading, loadingError];
}

export {useThunk};

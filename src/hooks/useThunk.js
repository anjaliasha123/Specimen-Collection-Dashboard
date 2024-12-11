import { useDispatch } from "react-redux";
import { useState, useCallback } from "react";

function useThunk(thunk){
    const [isLoading, setLoading] = useState(false);
    const [loadingError, setLoadingError] = useState(null);

    const dispatch = useDispatch();
    const runThunk = useCallback(()=>{
        (arg)=>{
            setLoading(true);
            dispatch(thunk(arg))
            .unwrap()
            .catch(err=>setLoadingError(err))
            .finally(()=>setLoading(false));
        }
    }, [dispatch, thunk]);

    return [runThunk, isLoading, loadingError];
}

import Card from "./utility/Card";
import { useSelector } from "react-redux";

export default function LocationSearch() {
    const {selectedFeatureToView} = useSelector((state) => {
        return state.inhs;
    });
    return (
        <div>
            {selectedFeatureToView && <Card data={selectedFeatureToView}/>}
        </div>
    )
}
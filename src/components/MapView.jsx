import { useEffect, useRef, useState } from "react";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import { Style, Circle, Fill, Stroke, Text } from "ol/style";
import { Map, View, Overlay } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { fromLonLat } from "ol/proj";
import Legend from "./Legend";
import Cluster from "ol/source/Cluster";
import ToolTip from "./ToolTip";
import { useDispatch} from "react-redux";
import { setSelectedFeatureToView } from "../store/slices/inhsSlice";

function MapView({ data }) {
    // console.log('checking data: ',data);
    const mapRef = useRef(null);
    const selectedFeatureRef = useRef(null);
    const [tooltipData, setTooltipData] = useState({ visible: false, x: 0, y: 0, content: "" });
    const dispatch = useDispatch();
    // Styling
    const classColors = {
        Amphibia: '#719bde',
        Reptilia: '#dab082',
        Insecta: 'gray'
    };
    const styleFunction = (feature) => {
        // console.log(feature);
        const featureClass = feature.get("features")[0].values_.class; // Get the class property
        const color = classColors[featureClass] || 'grey'; // Get color based on class
        return new Style({
            image: new Circle({
                radius: 5,
                fill: new Fill({ color: color }),
                stroke: new Stroke({ color: 'red', width: 1 })
            })
        });
    };
    // Cluster styling
    const clusterStyle = (feature) => {
        const size = feature.get("features").length; // Number of features in the cluster
        if (size === 1) return styleFunction(feature);
        return new Style({
            image: new Circle({
                radius: Math.min(20, size * 2), // Dynamically scale radius
                fill: new Fill({ color: "rgba(255, 153, 0, 0.6)" }),
                stroke: new Stroke({ color: "rgba(255, 153, 0, 1)", width: 1 }),
            }),
            text: new Text({
                text: size.toString(), // Display the number of features in the cluster
                fill: new Fill({ color: "#fff" }),
                stroke: new Stroke({ color: "#000", width: 2 }),
            }),
        });
    };
    const selectedStyle = new Style({
        image: new Circle({
            radius: 9,
            fill: new Fill({ color: "red" }),
            stroke: new Stroke({ color: "yellow", width: 2 }),
        }),
    });

    const handleClose = () => {
        // setPopup(false);
        // setSelectedProperties(null);
        // setSubList([]);
        if (selectedFeatureRef.current) {
            selectedFeatureRef.current.setStyle(styleFunction(selectedFeatureRef.current));
            selectedFeatureRef.current.setStyle(clusterStyle(selectedFeatureRef.current));
            selectedFeatureRef.current = null;
            dispatch(setSelectedFeatureToView(null));
        }
    }

    useEffect(() => {
        const fineDataSource = new VectorSource({
            features: new GeoJSON().readFeatures(data,
                {
                    dataProjection: "EPSG:4326",
                    featureProjection: "EPSG:3857"
                }
            )
        });
        const clusterSource = new Cluster({
            distance: 40, // Clustering distance in pixels
            source: fineDataSource,
        });
        const fineDataLayer = new VectorLayer({
            source: fineDataSource,
            style: styleFunction
        });
        const clusterLayer = new VectorLayer({
            source: clusterSource,
            style: (feature) => clusterStyle(feature),
        });

        const map = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({ source: new OSM() }),
                clusterLayer
            ],
            view: new View({
                center: fromLonLat([-83.2142, 35.11419]),
                zoom: 2
            }),
        });
        // Handle feature click event
        map.on("click", (evt) => {
            let clickedFeature = map.forEachFeatureAtPixel(evt.pixel, (feature) => feature);
            if (clickedFeature) {
                console.log(clickedFeature.values_.features.length)
                if (clickedFeature.values_.features.length === 1) {
                    const properties = clickedFeature.getProperties().features[0].getProperties()
                    if (selectedFeatureRef.current && clickedFeature === selectedFeatureRef.current) {
                        handleClose();
                    } else {
                        if (selectedFeatureRef.current) {
                            selectedFeatureRef.current.setStyle(styleFunction(selectedFeatureRef.current));
                        }
                        clickedFeature.setStyle(selectedStyle);
                        selectedFeatureRef.current = clickedFeature;
                        dispatch(setSelectedFeatureToView({...properties, geometry: ''}));
                    }
                 } //else {
                //     handleClose();
                // }
            } else {
                handleClose();
            }

        });

        // Handle pointer move
        map.on("pointermove", (evt) => {

            const feature = map.forEachFeatureAtPixel(evt.pixel, (feature) => feature);
            if (feature) {
                const properties = feature.getProperties();
                if (properties.features.length == 1) {
                    var pixel = map.getEventPixel(evt.originalEvent);
                    var hit = map.hasFeatureAtPixel(pixel);
                    map.getViewport().style.cursor = hit ? 'pointer' : '';
                    const properties = feature.getProperties();
                    const [x, y] = evt.coordinate;
                    let content = properties.features[0].getProperties();
                    setTooltipData({
                        visible: true,
                        x: evt.pixel[0] + 10, // Screen coordinates for position
                        y: evt.pixel[1] - 10,
                        content: content,
                    });
                }
            } else {
                setTooltipData((prev) => ({ ...prev, visible: false }));
                map.getViewport().style.cursor = '';
            }
        })
        return () => { map.setTarget(null) };
    }, [data]);

    return (

        <div className="row">
            <div id="map" ref={mapRef} className="column">
                <Legend classColors={classColors} />
                {tooltipData.visible && (
                    <ToolTip
                        style={{
                            top: `${tooltipData.y}px`,
                            left: `${tooltipData.x}px`,
                            position: "absolute",
                        }}
                        content={tooltipData.content}
                        classColors={classColors}
                    />
                )}
            </div>
        </div>

    )
}
export default MapView;
import './App.css'
import MapView from './components/MapView';
import LocationSearch from './components/LocationSearch';

function App() {
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
    return (
        <div className="h-screen w-screen grid grid-cols-2 gap-4">
                <MapView data={itemsDummy} className="col-span-1 p-2" />
            <div className="col-span-1 p-2">
                <LocationSearch />
            </div>
        </div>
    );
}

export default App;

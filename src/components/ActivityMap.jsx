import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./ActivityMap.css";

function ActivityMap({ latitude, longitude, location }) {

    // Don't show a map if the activity has no coordinates.
    if (!latitude || !longitude) {
        return null;
    }

    const position = [latitude, longitude];

    return (
        <div className="activity-map">

            <MapContainer
                key={`${position[0]}-${position[1]}`}
                center={position}
                zoom={16}
                scrollWheelZoom={true}
                className="activity-map-container"
            >

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={position}>
                    <Popup>
                        {location}
                    </Popup>
                </Marker>

            </MapContainer>

        </div>
    );
}

export default ActivityMap;
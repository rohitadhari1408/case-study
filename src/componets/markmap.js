
import { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
    width: "400px",
    height: "400px",
};

const Markmap = () => {

    const [open, setOpen] = useState(false);
    const [coords, setCoords] = useState({});
    const [distance, setDistance] = useState(0);

    const handleCloseMap = () => {
        setOpen(!open);
    };

    const handleLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude, accuracy } = position.coords;
                setCoords({ lat: latitude, lng: longitude });
                setDistance(accuracy);
            });
        }
    };

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyDPTg-kMHMwwU1rNdwb6ZzYEs0x_yeOL9E",
        libraries,
    });

    if (loadError) {
        return <div>Error loading maps</div>;
    }
    if (!isLoaded) {
        return <div>Loading maps ...</div>;
    }
    return (
        <div>
            <div>
                <div className="relative flex items-center justify-center mt-[10%]">
                    <button
                        className="bg-blue-500 text-white border-none cursor-pointer font-semibold p-[10px] mr-[20px]"
                        onClick={handleLocation}
                    >
                        Get Location
                    </button>
                    <button
                        className="bg-red-500 text-white border-none cursor-pointer font-semibold p-[10px]"
                        onClick={handleCloseMap}
                    >
                        Show Map
                    </button>
                    {open && (
                        <div className="absolute top-0 right-0  z-1 shadow-xl w-[800px] h-[500px] p-[10px]">
                            <button
                                className="bg-red-500 text-white border-none cursor-pointer font-semibold p-[10px] m-[20px]"
                                onClick={handleCloseMap}
                            >
                                Close Map
                            </button>

                            <span>Accuracy {distance} : Metres</span>

                            {isLoaded && (
                                <GoogleMap
                                    mapContainerStyle={mapContainerStyle}
                                    center={coords}
                                    zoom={10}
                                >
                                    <Marker position={coords} />
                                </GoogleMap>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Markmap

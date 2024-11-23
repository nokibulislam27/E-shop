import { MapContainer, TileLayer } from 'react-leaflet';
import { Marker, Popup } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';

const ContactInfo = () => {
    const contact = {
        address: "123 Book St, Book City, 12345",
        phone: "(123) 456-7890",
        email: "support@litlaunge.com"
    };

    useEffect(() => {
        // Ensuring Leaflet initializes correctly
        if (typeof window !== 'undefined') {
            import('leaflet');
        }
    }, []);

    return (
        <div className="container px-6 py-16 mx-auto">
            <h2 className="text-4xl font-bold text-center mb-10 text-gray-700">Contact Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left Section - Contact Info */}
                <div className="space-y-6">
                    <p className="text-lg text-[#333]">
                        If you have any questions, concerns, or feedback, feel free to get in touch with us. We’re here to help!
                    </p>
                    <div className="space-y-4">
                        <p className="text-lg text-[#666]">
                            <span className="font-semibold text-[#333]">Address:</span> {contact.address}
                        </p>
                        <p className="text-lg text-[#666]">
                            <span className="font-semibold text-[#333]">Phone:</span> <a href={`tel:${contact.phone}`} className="text-[#ff6a00]">{contact.phone}</a>
                        </p>
                        <p className="text-lg text-[#666]">
                            <span className="font-semibold text-[#333]">Email:</span> <a href={`mailto:${contact.email}`} className="text-[#ff6a00]">{contact.email}</a>
                        </p>
                    </div>
                </div>

                {/* Right Section - Map / Location */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-semibold text-[#333]">Our Location</h3>
                    <p className="text-lg text-[#666]">We are located at the address mentioned above. Feel free to visit us or reach out using the details provided.</p>
                    <div className="bg-gray-200 h-48 rounded-lg">
                        <MapContainer
                            center={[23.964142, 91.118301]} // Center of the map
                            zoom={13} // Zoom level
                            scrollWheelZoom={false} // Optional for scroll zoom
                            style={{ height: "100%", width: "100%" }} // Full container size for map
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={[51.505, -0.09]}>
                                <Popup>
                                    We are here! <br /> 123 Book St, Book City, 12345
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;

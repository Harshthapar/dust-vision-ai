import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Search, School, Building2 } from "lucide-react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const pollutionZones = [
  { lat: 28.6139, lng: 77.209, radius: 600, aqi: 185, name: "Central Delhi Construction Zone", color: "#ef4444" },
  { lat: 28.6329, lng: 77.2195, radius: 400, aqi: 142, name: "Highway Expansion Site", color: "#f97316" },
  { lat: 28.5955, lng: 77.1985, radius: 350, aqi: 98, name: "Metro Station Work", color: "#eab308" },
  { lat: 28.625, lng: 77.225, radius: 250, aqi: 65, name: "Residential Area", color: "#22c55e" },
];

const sensitiveAreas = [
  { lat: 28.618, lng: 77.215, type: "school" as const, name: "Delhi Public School" },
  { lat: 28.608, lng: 77.205, type: "hospital" as const, name: "City General Hospital" },
  { lat: 28.628, lng: 77.198, type: "school" as const, name: "Green Valley Academy" },
  { lat: 28.6, lng: 77.22, type: "hospital" as const, name: "Metro Health Center" },
];

const punjabZones = [
  { lat: 30.7333, lng: 76.7794, radius: 500, aqi: 168, name: "Chandigarh Industrial Belt", color: "#ef4444" },
  { lat: 31.326, lng: 75.5762, radius: 450, aqi: 155, name: "Jalandhar Construction Zone", color: "#ef4444" },
  { lat: 30.9, lng: 75.857, radius: 400, aqi: 132, name: "Ludhiana Highway Expansion", color: "#f97316" },
  { lat: 31.6340, lng: 74.8723, radius: 350, aqi: 145, name: "Amritsar Development Site", color: "#f97316" },
  { lat: 30.3398, lng: 76.3869, radius: 300, aqi: 88, name: "Patiala Residential Area", color: "#eab308" },
];

const punjabSensitive = [
  { lat: 30.74, lng: 76.77, type: "school" as const, name: "Punjab Engineering College" },
  { lat: 31.32, lng: 75.59, type: "hospital" as const, name: "Civil Hospital Jalandhar" },
  { lat: 30.91, lng: 75.85, type: "school" as const, name: "Ludhiana Public School" },
  { lat: 31.64, lng: 74.88, type: "hospital" as const, name: "Guru Nanak Hospital Amritsar" },
];

const cities: Record<string, { center: [number, number]; zoom: number }> = {
  "delhi": { center: [28.6139, 77.209], zoom: 13 },
  "new delhi": { center: [28.6139, 77.209], zoom: 13 },
  "mumbai": { center: [19.076, 72.8777], zoom: 12 },
  "bangalore": { center: [12.9716, 77.5946], zoom: 12 },
  "new york": { center: [40.7128, -74.006], zoom: 12 },
  "london": { center: [51.5074, -0.1278], zoom: 12 },
  "punjab": { center: [30.9, 75.85], zoom: 9 },
  "chandigarh": { center: [30.7333, 76.7794], zoom: 13 },
  "ludhiana": { center: [30.9, 75.857], zoom: 13 },
  "amritsar": { center: [31.634, 74.8723], zoom: 13 },
  "jalandhar": { center: [31.326, 75.5762], zoom: 13 },
  "patiala": { center: [30.3398, 76.3869], zoom: 13 },
};

const MapRecenter = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const PollutionMap = () => {
  const [center, setCenter] = useState<[number, number]>([28.6139, 77.209]);
  const [zoom, setZoom] = useState(13);
  const [search, setSearch] = useState("");

  const allZones = [...pollutionZones, ...punjabZones];
  const allSensitive = [...sensitiveAreas, ...punjabSensitive];

  const handleSearch = () => {
    const key = search.toLowerCase().trim();
    if (cities[key]) {
      setCenter(cities[key].center);
      setZoom(cities[key].zoom);
      setSearch("");
    }
  };

  return (
    <section id="map" className="relative px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px w-8 bg-primary" />
            <span className="text-primary font-mono text-xs tracking-widest uppercase">
              Geo-Intelligence
            </span>
            <div className="h-px w-8 bg-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Pollution Heat Map
          </h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto text-sm">
            Interactive map showing construction pollution zones and sensitive areas
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-2xl overflow-hidden"
        >
          {/* Search bar */}
          <div className="p-4 border-b border-border/50 flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search city (Delhi, Mumbai, London...)"
                className="w-full bg-muted/50 border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:brightness-110 transition-all"
            >
              Search
            </button>
          </div>

          {/* Map */}
          <div className="h-[400px] sm:h-[480px]">
            <MapContainer
              center={center}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
              className="z-0"
            >
              <MapRecenter center={center} />
              <TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
              {pollutionZones.map((zone, i) => (
                <CircleMarker
                  key={i}
                  center={[zone.lat, zone.lng]}
                  radius={zone.radius / 30}
                  fillColor={zone.color}
                  fillOpacity={0.35}
                  stroke
                  color={zone.color}
                  weight={1.5}
                >
                  <Popup>
                    <div className="text-xs">
                      <strong>{zone.name}</strong>
                      <br />AQI: {zone.aqi}
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
              {sensitiveAreas.map((area, i) => (
                <CircleMarker
                  key={`s-${i}`}
                  center={[area.lat, area.lng]}
                  radius={6}
                  fillColor={area.type === "school" ? "#3b82f6" : "#ef4444"}
                  fillOpacity={0.8}
                  stroke
                  color="#ffffff"
                  weight={1.5}
                >
                  <Popup>
                    <div className="text-xs">
                      <strong>{area.name}</strong>
                      <br />{area.type === "school" ? "🏫 School" : "🏥 Hospital"}
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>

          {/* Legend */}
          <div className="p-4 border-t border-border/50 flex flex-wrap gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              High Pollution Zone
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-orange-500/60" />
              Moderate Zone
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              Low Zone
            </div>
            <div className="flex items-center gap-1.5">
              <School className="w-3 h-3 text-blue-400" />
              School
            </div>
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3 h-3 text-red-400" />
              Hospital
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PollutionMap;

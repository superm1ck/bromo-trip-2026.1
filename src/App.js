import React, { useState, useEffect, useRef } from "react";
import {
  CheckCircle2,
  ListTodo,
  Map as MapIcon,
  Thermometer,
  Droplets,
  Waves,
  Mountain,
  Zap,
  HeartPulse,
  Smartphone,
  Info,
  Navigation,
  MapPin,
  Clock,
  Plane,
  LogOut,
  User,
  Lock,
  Smile,
  Plus,
  ChevronLeft,
  Trash2,
  ShieldCheck,
  Eraser,
  Edit3,
  X,
  AlertTriangle,
  Camera,
  Sun,
  Coffee,
} from "lucide-react";

// --- Default Initial Data ---
const DEFAULT_CHECKLIST = [
  {
    id: "c-1",
    title: "Transit & Travel (3 Sets)",
    icon: "smartphone",
    items: [
      { id: "i-1", text: "Comfortable T-shirt" },
      { id: "i-2", text: "Travel trousers/Stretchy pants" },
      { id: "i-3", text: "Light hoodie/Cardigan" },
      { id: "i-4", text: "Casual sneakers/Slip-ons" },
    ],
  },
  {
    id: "c-2",
    title: "Waterfall Trekking (2 Sets)",
    icon: "waves",
    items: [
      { id: "i-5", text: "Quick-dry T-shirt" },
      { id: "i-6", text: "Board shorts/Leggings" },
      { id: "i-7", text: "Swimwear (Under layer)" },
      { id: "i-8", text: "Trekking sandals (High grip)" },
      { id: "i-9", text: "Poncho/Raincoat" },
    ],
  },
  {
    id: "c-3",
    title: "Volcano Climbing (2 Base + 1 Outer)",
    icon: "thermometer",
    items: [
      { id: "i-10", text: "Heat-tech base layer" },
      { id: "i-11", text: "Fleece/Heavy sweater" },
      { id: "i-12", text: "Windbreaker/Puffer" },
      { id: "i-13", text: "Beanie/Wool hat" },
      { id: "i-14", text: "Hiking gloves" },
      { id: "i-15", text: "Neck gaiter/Buff" },
      { id: "i-16", text: "Sturdy hiking boots" },
      { id: "i-17", text: "Thick wool socks" },
    ],
  },
  {
    id: "c-4",
    title: "Post-Trek Recovery (2 Sets)",
    icon: "droplets",
    items: [
      { id: "i-18", text: "Dry cotton T-shirt" },
      { id: "i-19", text: "Clean shorts/Sweatpants" },
      { id: "i-20", text: "Fresh dry socks" },
      { id: "i-21", text: "Light slippers" },
      { id: "i-22", text: "Microfiber travel towel" },
    ],
  },
  {
    id: "c-5",
    title: "Electronics & Gear",
    icon: "zap",
    items: [
      { id: "i-23", text: "Universal Adapter (Type C/F)" },
      { id: "i-24", text: "Power Bank (10,000mAh+)" },
      { id: "i-25", text: "Dry Bag (10-20L)" },
      { id: "i-26", text: "Clear zip bags (Dust protection)" },
    ],
  },
  {
    id: "c-6",
    title: "Health & Care",
    icon: "heart",
    items: [
      { id: "i-27", text: "Sunscreen (SPF 50+)" },
      { id: "i-28", text: "Motion Sickness Pills" },
      { id: "i-29", text: "Pain Relief (Ibuprofen)" },
      { id: "i-30", text: "Digestive/Charcoal Meds" },
      { id: "i-31", text: "High-energy snacks" },
      { id: "i-32", text: "Antihistamine" },
      { id: "i-33", text: "Lip Balm" },
    ],
  },
];

const DEFAULT_TODO = [
  {
    id: "t-1",
    category: "PHASE 1: BEFORE FLIGHT",
    items: [
      { id: "ti-1", text: "Indonesian Auto Gate (3 days before)" },
      { id: "ti-2", text: "Exchange 3.9m - 5.0m IDR (Cash)" },
      { id: "ti-3", text: "Activate eSIM/Roaming Package" },
      { id: "ti-4", text: "Save Offline Google Maps" },
    ],
  },
  {
    id: "t-2",
    category: "PHASE 2: ON THE GROUND",
    items: [
      { id: "ti-5", text: "Stock up 1.5L water & snacks" },
      { id: "ti-6", text: "Double check gas mask seal (Ijen)" },
      { id: "ti-7", text: 'Prep "Dry Bag" for Madakaripura' },
      { id: "ti-8", text: "Check tires/Jeep condition (Bromo)" },
    ],
  },
  {
    id: "t-3",
    category: "PHASE 3: AFTER TRIP",
    items: [
      { id: "ti-9", text: "Vinegar laundry soak for sulfur smell" },
      { id: "ti-10", text: "Deep clean hiking boots" },
      { id: "ti-11", text: 'Submit "Arin Tour" feedback' },
    ],
  },
];

const profileColors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-purple-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-indigo-500",
];

const getColor = (name) => {
  if (!name) return "bg-indigo-500";
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
  return profileColors[hash % profileColors.length];
};

// --- Main App Component ---
const App = () => {
  const [currentUser, setCurrentUser] = useState(() =>
    localStorage.getItem("east_java_active_user")
  );
  const [activeTab, setActiveTab] = useState("plan");
  const [checkState, setCheckState] = useState({});
  const [showSafetyModal, setShowSafetyModal] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    const saved = localStorage.getItem(`east_java_app_state_${currentUser}`);
    if (saved) setCheckState(JSON.parse(saved));
    else setCheckState({});
  }, [currentUser]);

  const toggleCheck = (id) => {
    const newState = { ...checkState, [id]: !checkState[id] };
    setCheckState(newState);
    if (currentUser) {
      localStorage.setItem(
        `east_java_app_state_${currentUser}`,
        JSON.stringify(newState)
      );
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCheckState({});
    localStorage.removeItem("east_java_active_user");
  };

  if (!currentUser) {
    return (
      <AuthView
        onLogin={(user) => {
          setCurrentUser(user);
          localStorage.setItem("east_java_active_user", user);
        }}
      />
    );
  }

  const tabs = [
    { id: "plan", label: "Trip Plan", icon: MapIcon },
    { id: "checklist", label: "Checklist", icon: CheckCircle2 },
    { id: "todo", label: "To-Do", icon: ListTodo },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-28 font-sans selection:bg-indigo-100">
      {/* App Header */}
      <header className="bg-indigo-900 text-white p-6 shadow-xl rounded-b-[2.5rem] relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/30 rounded-full blur-3xl" />
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center relative z-10 gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between">
            <div>
              <h1 className="text-2xl font-black flex items-center gap-2 tracking-tight">
                <Mountain className="w-8 h-8 text-indigo-300" /> EAST JAVA
              </h1>
              <p className="opacity-90 text-[10px] font-bold uppercase tracking-widest mt-1 italic text-indigo-200">
                20-24 April 2026 • The Grand Loop
              </p>
            </div>

            <div className="flex items-center gap-2.5 bg-indigo-800/40 pl-2 pr-5 py-2 rounded-[1.25rem] border border-indigo-400/20 backdrop-blur-md shadow-sm self-start sm:self-auto">
              <div
                className={`w-8 h-8 rounded-lg ${getColor(
                  currentUser
                )} flex items-center justify-center relative overflow-hidden shadow-inner shrink-0`}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50" />
                <Smile size={20} className="text-white drop-shadow-md" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[9px] font-bold uppercase tracking-widest text-indigo-300 leading-none mb-1">
                  Traveler
                </span>
                <span className="text-sm font-black text-white tracking-wide leading-none">
                  {currentUser}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 absolute sm:relative top-0 right-0">
            <button
              onClick={() => setShowSafetyModal(true)}
              className="relative flex items-center gap-2 bg-gradient-to-tr from-red-600 to-orange-500 p-2.5 sm:px-4 rounded-2xl shadow-[0_0_15px_rgba(220,38,38,0.5)] border border-red-400/50 hover:shadow-[0_0_25px_rgba(220,38,38,0.8)] transition-all hover:scale-105 group"
              title="Critical Safety Warnings"
            >
              <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-200 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white border-2 border-red-500"></span>
              </span>
              <AlertTriangle
                size={18}
                className="text-white"
                strokeWidth={2.5}
              />
              <span className="text-[10px] font-black text-white hidden sm:block uppercase tracking-widest drop-shadow-md">
                Alerts
              </span>
            </button>
            <button
              onClick={handleLogout}
              className="bg-white/10 p-2.5 rounded-2xl backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all flex items-center gap-2 group"
              title="Logout"
            >
              <LogOut
                size={18}
                className="text-indigo-200 group-hover:text-white transition-colors"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-md mx-auto p-4">
        {activeTab === "plan" && <PlanView />}
        {activeTab === "checklist" && (
          <ChecklistView
            toggleCheck={toggleCheck}
            checkState={checkState}
            currentUser={currentUser}
          />
        )}
        {activeTab === "todo" && (
          <TodoView
            toggleCheck={toggleCheck}
            checkState={checkState}
            currentUser={currentUser}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-white/95 backdrop-blur-xl border border-slate-200/50 px-4 py-3 flex justify-around shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-3xl z-40">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 transition-all duration-300 w-16 ${
                activeTab === tab.id
                  ? "text-indigo-600 scale-105"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <div
                className={`p-2 rounded-2xl transition-colors ${
                  activeTab === tab.id ? "bg-indigo-50 shadow-inner" : ""
                }`}
              >
                <Icon size={20} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
              </div>
              <span className="text-[9px] font-black uppercase tracking-tighter">
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Safety Modal Overlay */}
      {showSafetyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-gradient-to-br from-red-500 to-orange-500 p-7 rounded-[3rem] shadow-2xl max-w-sm w-full relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowSafetyModal(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/20 p-2 rounded-full backdrop-blur-md transition-colors"
            >
              <X size={20} />
            </button>
            <div className="flex items-center gap-3 text-white mb-6">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                <AlertTriangle className="text-white" size={24} />
              </div>
              <h3 className="font-black uppercase text-sm tracking-tighter underline decoration-2">
                Critical Safety
              </h3>
            </div>
            <div className="space-y-3">
              <div className="bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-sm text-white">
                <p className="text-xs font-black leading-tight flex items-center gap-2">
                  <Zap size={14} /> JEWELRY WARNING
                </p>
                <p className="text-[10px] font-bold opacity-90 mt-1.5 leading-relaxed">
                  Sulfur gas at Ijen turns Silver & Gold black permanently.
                  Leave all jewelry at home or at the hotel.
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-sm text-white">
                <p className="text-xs font-black leading-tight flex items-center gap-2">
                  <Info size={14} /> CONTACT LENSES
                </p>
                <p className="text-[10px] font-bold opacity-90 mt-1.5 leading-relaxed">
                  Volcanic dust + Lenses = Severely scratched eyes. Wear glasses
                  during hikes (especially Bromo).
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-sm text-white">
                <p className="text-xs font-black leading-tight flex items-center gap-2">
                  <Plane size={14} /> NO SULFUR ON PLANES
                </p>
                <p className="text-[10px] font-bold opacity-90 mt-1.5 leading-relaxed">
                  Sulfur carvings are restricted by airlines as a flammable
                  hazard. Do not buy them as souvenirs.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Interactive Map Component ---
const InteractiveMap = ({ selectedDay }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const layerGroup = useRef(null);

  const locations = {
    DMK: {
      lat: 13.9126,
      lng: 100.6018,
      label: "Bangkok (DMK)",
      color: "#eab308",
    },
    SUB: {
      lat: -7.3796,
      lng: 112.7871,
      label: "Surabaya (SUB)",
      color: "#3b82f6",
    },
    Tumpaksewu: {
      lat: -8.2315,
      lng: 112.9161,
      label: "Tumpaksewu",
      color: "#10b981",
    },
    Ijen: {
      lat: -8.0583,
      lng: 114.2428,
      label: "Kawah Ijen",
      color: "#f97316",
    },
    Bromo: { lat: -7.9226, lng: 112.961, label: "Mt. Bromo", color: "#f97316" },
    Madakaripura: {
      lat: -7.8322,
      lng: 113.0076,
      label: "Madakaripura",
      color: "#10b981",
    },
  };

  const routes = {
    1: [
      {
        from: "DMK",
        to: "SUB",
        time: "4h 15m Flight",
        period: "08:20-12:35",
        isFlight: true,
      },
      {
        from: "SUB",
        to: "Tumpaksewu",
        time: "4h Drive",
        period: "13:30-17:30",
        isFlight: false,
      },
    ],
    2: [
      {
        from: "Tumpaksewu",
        to: "Ijen",
        time: "3h Drive",
        period: "12:30-15:30",
        isFlight: false,
      },
    ],
    3: [
      {
        from: "Ijen",
        to: "Bromo",
        time: "5h Drive",
        period: "11:00-16:00",
        isFlight: false,
      },
    ],
    4: [
      {
        from: "Bromo",
        to: "Madakaripura",
        time: "1h Drive",
        period: "10:00-11:00",
        isFlight: false,
      },
      {
        from: "Madakaripura",
        to: "SUB",
        time: "2h Drive",
        period: "14:00-16:00",
        isFlight: false,
      },
    ],
    5: [
      {
        from: "SUB",
        to: "DMK",
        time: "4h 10m Flight",
        period: "13:40-17:50",
        isFlight: true,
      },
    ],
  };

  useEffect(() => {
    let interval;
    const loadLeaflet = async () => {
      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }
      if (!document.getElementById("leaflet-js")) {
        const script = document.createElement("script");
        script.id = "leaflet-js";
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        document.head.appendChild(script);
      }
      interval = setInterval(() => {
        if (window.L && mapRef.current) {
          clearInterval(interval);
          initializeMap();
        }
      }, 100);
    };
    loadLeaflet();
    return () => {
      if (interval) clearInterval(interval);
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  const initializeMap = () => {
    if (mapInstance.current || !mapRef.current) return;
    const L = window.L;
    mapInstance.current = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
    }).setView([-7.9, 113.5], 8);
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 18 }
    ).addTo(mapInstance.current);
    L.control.zoom({ position: "bottomleft" }).addTo(mapInstance.current);
    layerGroup.current = L.featureGroup().addTo(mapInstance.current);
    updateMapContent(selectedDay);
  };

  useEffect(() => {
    if (window.L && mapInstance.current) updateMapContent(selectedDay);
  }, [selectedDay]);

  const updateMapContent = (day) => {
    const L = window.L;
    const map = mapInstance.current;
    const group = layerGroup.current;
    if (!map || !group) return;
    group.clearLayers();

    const dayRoutes = routes[day] || [];
    const activeLocs = new Set();
    dayRoutes.forEach((r) => {
      activeLocs.add(r.from);
      activeLocs.add(r.to);
    });

    dayRoutes.forEach((r) => {
      const from = locations[r.from];
      const to = locations[r.to];
      if (from && to && from !== to) {
        const isFlight = r.isFlight;
        const lineColor = isFlight ? "#eab308" : "#4f46e5";
        const weight = isFlight ? 3 : 4;
        L.polyline(
          [
            [from.lat, from.lng],
            [to.lat, to.lng],
          ],
          {
            color: lineColor,
            weight: weight,
            dashArray: isFlight ? "4, 10" : "6, 8",
          }
        ).addTo(group);
        const dy = to.lat - from.lat;
        const dx = to.lng - from.lng;
        const angle = Math.atan2(dx, dy) * (180 / Math.PI);
        const arrowLat = from.lat + dy * 0.8;
        const arrowLng = from.lng + dx * 0.8;
        L.marker([arrowLat, arrowLng], {
          icon: L.divIcon({
            className: "map-custom-element",
            html: `<div style="transform: rotate(${angle}deg); filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.3)); width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;"><svg width="20" height="20" viewBox="0 0 24 24" fill="${lineColor}" stroke="white" stroke-width="2"><polygon points="12,2 20,20 12,16 4,20" /></svg></div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          }),
          interactive: false,
        }).addTo(group);
        const midLat = (from.lat + to.lat) / 2;
        const midLng = (from.lng + to.lng) / 2;
        const len = Math.sqrt(dx * dx + dy * dy);
        const badgeLat = midLat + (dx / len) * 0.15;
        const badgeLng = midLng + (-dy / len) * 0.15;
        L.marker([badgeLat, badgeLng], {
          icon: L.divIcon({
            className: "map-custom-element",
            html: `<div style="width: 160px; height: 40px; display: flex; align-items: center; justify-content: center; background: transparent;"><div style="background-color: ${
              isFlight ? "#fef08a" : "#fcd34d"
            }; color: #0f172a; padding: 5px 12px; border-radius: 12px; font-size: 10px; font-weight: 900; white-space: nowrap; border: 2px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.3); font-family: sans-serif; display: flex; align-items: center; justify-content: center; gap: 6px; pointer-events: none;"><span>${
              isFlight ? "✈️" : "🚗"
            }</span><span>${r.time} (${r.period})</span></div></div>`,
            iconSize: [160, 40],
            iconAnchor: [80, 20],
          }),
          interactive: false,
        }).addTo(group);
      }
    });

    Object.entries(locations).forEach(([key, loc]) => {
      const isActive = activeLocs.has(key);
      const isHub =
        (key === "SUB" || key === "DMK") &&
        isActive &&
        (day === 1 || day === 5);
      const size = isHub ? 28 : 14;
      L.marker([loc.lat, loc.lng], {
        icon: L.divIcon({
          className: "map-custom-element",
          html: `<div style="background-color: ${
            loc.color
          }; width: ${size}px; height: ${size}px; border-radius: 50%; border: 3px solid white; box-shadow: ${
            isActive ? "0 0 15px rgba(0,0,0,0.5)" : "0 2px 5px rgba(0,0,0,0.2)"
          }; transform: scale(${
            isActive ? 1.2 : 1
          }); transition: all 0.3s; display: flex; align-items: center; justify-content: center; color: white;">${
            isHub
              ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L3 8l5.5 4L5 15.5 3 15l-1 1 3 3 1-1-.5-2 3.5-3.5L16 21l1.2-.7-.6-2.5 1.2-1.2z"/></svg>'
              : ""
          }</div>`,
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        }),
      }).addTo(group);
      L.marker([loc.lat, loc.lng], {
        icon: L.divIcon({
          className: "map-custom-element",
          html: `<div style="transform: translate(-50%, ${
            isHub ? 18 : 12
          }px); display: inline-block;"><div style="background-color: rgba(255,255,255,${
            isActive ? 0.95 : 0.7
          }); color: ${
            isActive ? "#0f172a" : "#475569"
          }; padding: 3px 8px; border-radius: 6px; font-size: 10px; font-weight: 800; white-space: nowrap; box-shadow: 0 2px 5px rgba(0,0,0,0.15); font-family: sans-serif; transition: all 0.3s;">${
            loc.label
          }</div></div>`,
          iconSize: [0, 0],
          iconAnchor: [0, 0],
        }),
        interactive: false,
      }).addTo(group);
    });

    if (dayRoutes.length > 0) {
      const b = [];
      dayRoutes.forEach((r) => {
        if (locations[r.from])
          b.push([locations[r.from].lat, locations[r.from].lng]);
        if (locations[r.to]) b.push([locations[r.to].lat, locations[r.to].lng]);
      });
      map.flyToBounds(b, { padding: [40, 40], duration: 1.2 });
    } else {
      map.flyTo([-7.9, 113.5], 8, { duration: 1 });
    }
  };

  return (
    <div className="w-full bg-slate-200 rounded-[2rem] p-1 border-[4px] border-white relative overflow-hidden shadow-inner">
      <style>{`.map-custom-element { background: transparent !important; border: none !important; }`}</style>
      <div
        ref={mapRef}
        className="w-full h-72 rounded-[1.5rem] z-10 bg-slate-200"
        style={{ isolation: "isolate" }}
      />
      <div className="absolute inset-0 flex items-center justify-center -z-10 bg-slate-100">
        <span className="text-xs font-bold text-slate-400 animate-pulse flex items-center gap-2">
          <MapPin size={14} className="animate-bounce" /> Loading Live
          Terrain...
        </span>
      </div>
    </div>
  );
};

// --- Plan & Itinerary Component ---
const PlanView = () => {
  const [selectedDay, setSelectedDay] = useState(1);

  // Custom local paths injected here
  const itineraryDetails = {
    1: {
      title: "Arrival & The Journey South",
      location: "Bangkok to Tumpaksewu",
      date: "20 April 2026",
      img: "/image_8af913.jpg",
      events: [
        { time: "08:20", desc: "Depart from DMK via Thai Lion Air SL0268." },
        {
          time: "12:35",
          desc: "Arrival at SUB. Pass immigration & collect baggage.",
        },
        { time: "13:30", desc: "Meet Guide and depart from Surabaya." },
        { time: "17:30", desc: "Check-in at homestay & rest." },
      ],
    },
    2: {
      title: "The Thousand Waterfalls",
      location: "Tumpaksewu & Teras Semeru",
      date: "21 April 2026",
      img: "/image_8af973.jpg",
      events: [
        {
          time: "07:00",
          desc: "Trek down to Teras Semeru viewpoint & Waterfall base.",
        },
        {
          time: "12:30",
          desc: "3-Hour drive east to Bondowoso (Ijen Basecamp).",
        },
        { time: "15:30", desc: "Check-in at hotel. Rest early." },
      ],
    },
    3: {
      title: "Blue Fire & Acid Lake",
      location: "Kawah Ijen (Midnight Hike)",
      date: "22 April 2026",
      img: "/image_8afc78.jpg",
      events: [
        { time: "00:00", desc: "Drive to Paltuding (Ijen Basecamp)." },
        { time: "02:00", desc: "Start trekking up Ijen Crater." },
        { time: "04:00", desc: "Descend to observe Blue Fire." },
        { time: "06:00", desc: "Sunrise viewing over the acid lake." },
        { time: "11:00", desc: "5-Hour drive to Cemoro Lawang (Bromo base)." },
      ],
    },
    4: {
      title: "Volcanoes & Waterfalls",
      location: "Mount Bromo & Madakaripura",
      date: "23 April 2026",
      img: ["/image_8afcf7.jpg", "/image_8b0075.jpg"],
      events: [
        { time: "02:30", desc: "Depart via 4WD Jeep to Kingkong Hill." },
        { time: "04:30", desc: "Mount Bromo Sunrise." },
        { time: "06:30", desc: "Hike to Bromo Crater Rim." },
        { time: "11:00", desc: "Trek to Madakaripura Waterfall." },
        { time: "16:00", desc: "Drop off in Surabaya." },
      ],
    },
    5: {
      title: "Departure",
      location: "Surabaya to Bangkok",
      date: "24 April 2026",
      img: "/image_8b010d.jpg",
      events: [
        {
          time: "10:30",
          desc: "Transfer to Juanda International Airport (SUB).",
        },
        { time: "13:40", desc: "Depart SUB on Thai Lion Air SL0269." },
        { time: "17:50", desc: "Arrival in Bangkok. Safe journey!" },
      ],
    },
  };
  const currentDay = itineraryDetails[selectedDay];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-[2.5rem] p-5 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-black text-slate-800 text-lg flex items-center gap-2">
            <Navigation size={22} className="text-indigo-600" /> Route Map
          </h2>
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            {[1, 2, 3, 4, 5].map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDay(d)}
                className={`w-9 h-9 rounded-xl text-xs font-black transition-all ${
                  selectedDay === d
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                D{d}
              </button>
            ))}
          </div>
        </div>
        <InteractiveMap selectedDay={selectedDay} />
      </div>

      <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100 animate-in slide-in-from-bottom-4">
        <div className="relative h-56 w-full flex bg-slate-900 overflow-hidden">
          {Array.isArray(currentDay.img) ? (
            currentDay.img.map((s, i) => (
              <img
                key={i}
                src={s}
                className="w-1/2 h-full object-cover border-r border-slate-800"
                alt="Location"
              />
            ))
          ) : (
            <img
              src={currentDay.img}
              className="w-full h-full object-cover"
              alt="Location"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <h2 className="text-xl font-black leading-tight drop-shadow-md">
              {currentDay.title}
            </h2>
            <p className="text-xs font-bold text-indigo-200 flex items-center gap-1 mt-1 drop-shadow-md">
              <MapPin size={12} /> {currentDay.location}
            </p>
          </div>
        </div>
        <div className="p-6">
          <div className="relative border-l-2 border-indigo-100 ml-2 space-y-6">
            {currentDay.events.map((e, idx) => (
              <div key={idx} className="relative pl-6">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-indigo-500 ring-4 ring-white" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-black text-indigo-600">
                    {e.time}
                  </span>
                  <span className="text-sm font-medium text-slate-700">
                    {e.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Checklist Component ---
const ChecklistView = ({ toggleCheck, checkState, currentUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingIconId, setEditingIconId] = useState(null);
  const [data, setData] = useState(() => {
    const s = localStorage.getItem(`east_java_checklist_data_${currentUser}`);
    return s ? JSON.parse(s) : DEFAULT_CHECKLIST;
  });
  useEffect(() => {
    localStorage.setItem(
      `east_java_checklist_data_${currentUser}`,
      JSON.stringify(data)
    );
  }, [data, currentUser]);

  const IconMap = {
    smartphone: <Smartphone className="text-blue-500" />,
    waves: <Waves className="text-emerald-500" />,
    thermometer: <Thermometer className="text-orange-500" />,
    droplets: <Droplets className="text-indigo-500" />,
    zap: <Zap className="text-yellow-500" />,
    heart: <HeartPulse className="text-pink-500" />,
    camera: <Camera className="text-purple-500" />,
    sun: <Sun className="text-amber-500" />,
    coffee: <Coffee className="text-stone-500" />,
    default: <CheckCircle2 className="text-slate-500" />,
  };

  const updateSectionTitle = (secId, newTitle) =>
    setData(data.map((s) => (s.id === secId ? { ...s, title: newTitle } : s)));
  const updateSectionIcon = (secId, newIcon) =>
    setData(data.map((s) => (s.id === secId ? { ...s, icon: newIcon } : s)));
  const deleteSection = (secId) => setData(data.filter((s) => s.id !== secId));
  const addSection = () =>
    setData([
      ...data,
      {
        id: `c-${Date.now()}`,
        title: "New Category",
        icon: "default",
        items: [],
      },
    ]);

  const updateItemText = (secId, itemId, newText) =>
    setData(
      data.map((s) =>
        s.id === secId
          ? {
              ...s,
              items: s.items.map((i) =>
                i.id === itemId ? { ...i, text: newText } : i
              ),
            }
          : s
      )
    );
  const deleteItem = (secId, itemId) =>
    setData(
      data.map((s) =>
        s.id === secId
          ? { ...s, items: s.items.filter((i) => i.id !== itemId) }
          : s
      )
    );
  const addItem = (secId) =>
    setData(
      data.map((s) =>
        s.id === secId
          ? {
              ...s,
              items: [...s.items, { id: `i-${Date.now()}`, text: "New Item" }],
            }
          : s
      )
    );

  return (
    <div className="space-y-4 pb-4 animate-in fade-in">
      <div className="flex justify-between items-center px-2 mb-2">
        <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">
          Packing List
        </h2>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            setEditingIconId(null);
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
            isEditing
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
          }`}
        >
          {isEditing ? <CheckCircle2 size={14} /> : <Edit3 size={14} />}
          {isEditing ? "Done" : "Edit Mode"}
        </button>
      </div>

      {data.map((section) => (
        <div
          key={section.id}
          className={`bg-white rounded-[2.5rem] shadow-sm border transition-all ${
            isEditing
              ? "border-indigo-200 overflow-visible relative z-30"
              : "border-slate-100 overflow-hidden relative z-10"
          }`}
        >
          <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3 w-full relative">
              <div className="relative">
                <div
                  onClick={() =>
                    isEditing &&
                    setEditingIconId(
                      editingIconId === section.id ? null : section.id
                    )
                  }
                  className={`bg-white p-2 rounded-2xl shadow-sm border border-slate-100 shrink-0 ${
                    isEditing
                      ? "cursor-pointer hover:bg-slate-50 ring-2 ring-indigo-200"
                      : ""
                  }`}
                >
                  {IconMap[section.icon] || IconMap["default"]}
                </div>
                {isEditing && editingIconId === section.id && (
                  <div className="absolute top-14 left-0 bg-white border border-slate-200 shadow-2xl rounded-2xl p-3 grid grid-cols-5 gap-2 z-[60] w-[240px] animate-in zoom-in-95">
                    {Object.keys(IconMap).map((iconKey) => (
                      <button
                        key={iconKey}
                        onClick={() => {
                          updateSectionIcon(section.id, iconKey);
                          setEditingIconId(null);
                        }}
                        className={`p-2 rounded-xl flex items-center justify-center transition-all ${
                          section.icon === iconKey
                            ? "bg-indigo-50 ring-2 ring-indigo-500/50"
                            : "hover:bg-slate-100"
                        }`}
                        title={iconKey}
                      >
                        {IconMap[iconKey]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {isEditing ? (
                <input
                  value={section.title}
                  onChange={(e) =>
                    updateSectionTitle(section.id, e.target.value)
                  }
                  className="font-black text-indigo-900 text-xs uppercase tracking-tight bg-transparent border-b border-indigo-300 focus:border-indigo-600 outline-none w-full py-1"
                />
              ) : (
                <h2 className="font-black text-slate-800 text-xs uppercase tracking-tight">
                  {section.title}
                </h2>
              )}
            </div>
            {isEditing && (
              <button
                onClick={() => deleteSection(section.id)}
                className="ml-2 p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors shrink-0"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>

          <div className="p-3 grid grid-cols-1 gap-1">
            {section.items.map((item) => (
              <div
                key={item.id}
                className={`flex items-center gap-4 p-3 rounded-2xl transition-all ${
                  isEditing
                    ? "bg-slate-50"
                    : checkState[item.id]
                    ? "bg-slate-50 opacity-60"
                    : "hover:bg-indigo-50/50 cursor-pointer"
                }`}
                onClick={() => !isEditing && toggleCheck(item.id)}
              >
                <div
                  className={`w-6 h-6 rounded-xl border-2 flex items-center justify-center shrink-0 transition-all ${
                    checkState[item.id] && !isEditing
                      ? "bg-emerald-500 border-emerald-500 shadow-lg scale-90"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  {checkState[item.id] && !isEditing && (
                    <CheckCircle2 size={16} className="text-white" />
                  )}
                </div>
                {isEditing ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      value={item.text}
                      onChange={(e) =>
                        updateItemText(section.id, item.id, e.target.value)
                      }
                      className="text-xs font-bold tracking-tight text-slate-700 bg-transparent border-b border-slate-300 focus:border-indigo-500 outline-none w-full py-1"
                    />
                    <button
                      onClick={() => deleteItem(section.id, item.id)}
                      className="p-1 text-red-400 hover:bg-red-50 rounded-md transition-colors shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ) : (
                  <span
                    className={`text-xs font-bold tracking-tight ${
                      checkState[item.id]
                        ? "text-slate-400 line-through"
                        : "text-slate-700"
                    }`}
                  >
                    {item.text}
                  </span>
                )}
              </div>
            ))}
            {isEditing && (
              <button
                onClick={() => addItem(section.id)}
                className="flex items-center justify-center gap-1.5 p-3 mt-1 rounded-2xl border-2 border-dashed border-indigo-200 text-indigo-500 hover:bg-indigo-50 transition-colors text-xs font-bold"
              >
                <Plus size={14} /> Add Item
              </button>
            )}
          </div>
        </div>
      ))}

      {isEditing && (
        <button
          onClick={addSection}
          className="w-full flex items-center justify-center gap-2 p-4 rounded-[2rem] bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors text-sm font-black uppercase tracking-widest shadow-sm"
        >
          <Plus size={18} /> Add Category Block
        </button>
      )}
    </div>
  );
};

// --- Todo Component ---
const TodoView = ({ toggleCheck, checkState, currentUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(() => {
    const s = localStorage.getItem(`east_java_todo_data_${currentUser}`);
    return s ? JSON.parse(s) : DEFAULT_TODO;
  });
  useEffect(() => {
    localStorage.setItem(
      `east_java_todo_data_${currentUser}`,
      JSON.stringify(data)
    );
  }, [data, currentUser]);

  const updateCategoryTitle = (blockId, newTitle) =>
    setData(
      data.map((b) => (b.id === blockId ? { ...b, category: newTitle } : b))
    );
  const deleteCategory = (blockId) =>
    setData(data.filter((b) => b.id !== blockId));
  const addCategory = () =>
    setData([
      ...data,
      { id: `t-${Date.now()}`, category: "NEW TIMELINE PHASE", items: [] },
    ]);
  const updateItemText = (blockId, itemId, newText) =>
    setData(
      data.map((b) =>
        b.id === blockId
          ? {
              ...b,
              items: b.items.map((i) =>
                i.id === itemId ? { ...i, text: newText } : i
              ),
            }
          : b
      )
    );
  const deleteItem = (blockId, itemId) =>
    setData(
      data.map((b) =>
        b.id === blockId
          ? { ...b, items: b.items.filter((i) => i.id !== itemId) }
          : b
      )
    );
  const addItem = (blockId) =>
    setData(
      data.map((b) =>
        b.id === blockId
          ? {
              ...b,
              items: [
                ...b.items,
                { id: `ti-${Date.now()}`, text: "New Action Item" },
              ],
            }
          : b
      )
    );

  return (
    <div className="space-y-8 mt-2 px-2 animate-in fade-in pb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">
          Action Items
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
            isEditing
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
          }`}
        >
          {isEditing ? <CheckCircle2 size={14} /> : <Edit3 size={14} />}
          {isEditing ? "Done" : "Edit Mode"}
        </button>
      </div>

      {data.map((group) => (
        <div
          key={group.id}
          className={`space-y-4 ${
            isEditing
              ? "p-4 bg-slate-100 rounded-[2.5rem] border border-slate-200"
              : ""
          }`}
        >
          <div className="flex items-center justify-between px-3">
            <div className="font-black text-[10px] uppercase tracking-[0.4em] text-indigo-400 flex items-center gap-3 w-full">
              <div className="w-8 h-[2px] bg-indigo-200 rounded-full shrink-0" />
              {isEditing ? (
                <input
                  value={group.category}
                  onChange={(e) =>
                    updateCategoryTitle(group.id, e.target.value)
                  }
                  className="bg-transparent border-b border-indigo-300 focus:border-indigo-600 outline-none w-full py-1 text-indigo-600"
                />
              ) : (
                group.category
              )}
            </div>
            {isEditing && (
              <button
                onClick={() => deleteCategory(group.id)}
                className="ml-2 p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors shrink-0 bg-white shadow-sm"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>

          <div className="space-y-3">
            {group.items.map((item) => (
              <div
                key={item.id}
                onClick={() => !isEditing && toggleCheck(item.id)}
                className={`flex items-center gap-4 p-5 rounded-[2.2rem] border-2 transition-all ${
                  isEditing
                    ? "bg-white border-slate-200"
                    : checkState[item.id]
                    ? "bg-slate-100 border-transparent shadow-none cursor-pointer"
                    : "bg-white border-white shadow-xl shadow-indigo-500/5 cursor-pointer"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                    checkState[item.id] && !isEditing
                      ? "bg-indigo-600 border-indigo-600"
                      : "border-slate-200"
                  }`}
                >
                  {checkState[item.id] && !isEditing && (
                    <CheckCircle2 size={18} className="text-white" />
                  )}
                </div>
                {isEditing ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      value={item.text}
                      onChange={(e) =>
                        updateItemText(group.id, item.id, e.target.value)
                      }
                      className="text-sm font-black tracking-tight text-slate-700 bg-transparent border-b border-slate-300 focus:border-indigo-500 outline-none w-full py-1"
                    />
                    <button
                      onClick={() => deleteItem(group.id, item.id)}
                      className="p-1.5 text-red-400 hover:bg-red-50 rounded-md transition-colors shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : (
                  <span
                    className={`text-sm font-black tracking-tight leading-tight ${
                      checkState[item.id]
                        ? "line-through text-slate-400"
                        : "text-slate-800"
                    }`}
                  >
                    {item.text}
                  </span>
                )}
              </div>
            ))}
            {isEditing && (
              <button
                onClick={() => addItem(group.id)}
                className="w-full flex items-center justify-center gap-1.5 p-4 rounded-[2rem] border-2 border-dashed border-indigo-300 text-indigo-500 hover:bg-indigo-50 transition-colors text-xs font-bold uppercase tracking-widest"
              >
                <Plus size={16} /> Add Task
              </button>
            )}
          </div>
        </div>
      ))}
      {isEditing && (
        <button
          onClick={addCategory}
          className="w-full flex items-center justify-center gap-2 p-5 rounded-[2.5rem] bg-indigo-600 text-white hover:bg-indigo-700 transition-colors text-sm font-black uppercase tracking-widest shadow-lg shadow-indigo-200"
        >
          <Plus size={20} /> Add Timeline Phase
        </button>
      )}
    </div>
  );
};

// --- Auth & Admin Panel Component ---
const AuthView = ({ onLogin }) => {
  const [viewMode, setViewMode] = useState("select");
  const [selectedUser, setSelectedUser] = useState(null);
  const [username, setUsername] = useState("");
  const [passcode, setPasscode] = useState("");
  const [adminPasscode, setAdminPasscode] = useState("");
  const [error, setError] = useState("");
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [modalConfig, setModalConfig] = useState(null);

  const accounts = JSON.parse(
    localStorage.getItem("east_java_accounts") || "{}"
  );
  const accountList = Object.keys(accounts);

  const ADMIN_MASTER_CODE = "9999";

  const handlePasscodeChange = (e) => {
    const val = e.target.value;
    if (val === "" || (/^\d+$/.test(val) && val.length <= 4)) {
      setPasscode(val);
      setError("");
      if (viewMode === "login" && val.length === 4) {
        if (accounts[selectedUser] === val) onLogin(selectedUser);
        else {
          setError("Incorrect passcode.");
          setPasscode("");
        }
      }
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setError("");
    if (username.trim().length < 3)
      return setError("Name must be at least 3 characters.");
    if (passcode.length !== 4)
      return setError("Passcode must be exactly 4 digits.");
    if (accounts[username]) return setError("Profile already exists.");

    accounts[username] = passcode;
    localStorage.setItem("east_java_accounts", JSON.stringify(accounts));
    localStorage.setItem(
      `east_java_checklist_data_${username}`,
      JSON.stringify(DEFAULT_CHECKLIST)
    );
    localStorage.setItem(
      `east_java_todo_data_${username}`,
      JSON.stringify(DEFAULT_TODO)
    );
    onLogin(username);
  };

  const handleAdminAuth = (e) => {
    e.preventDefault();
    if (adminPasscode === ADMIN_MASTER_CODE) {
      setViewMode("admin_panel");
      setAdminPasscode("");
      setError("");
    } else {
      setError("Invalid admin credentials.");
      setAdminPasscode("");
    }
  };

  const executeModalAction = () => {
    if (!modalConfig) return;
    const { type, name } = modalConfig;
    if (type === "clear") {
      localStorage.removeItem(`east_java_app_state_${name}`);
      localStorage.removeItem(`east_java_checklist_data_${name}`);
      localStorage.removeItem(`east_java_todo_data_${name}`);
    } else if (type === "delete") {
      const accs = JSON.parse(
        localStorage.getItem("east_java_accounts") || "{}"
      );
      delete accs[name];
      localStorage.setItem("east_java_accounts", JSON.stringify(accs));
      localStorage.removeItem(`east_java_app_state_${name}`);
      localStorage.removeItem(`east_java_checklist_data_${name}`);
      localStorage.removeItem(`east_java_todo_data_${name}`);
      setUpdateTrigger((prev) => prev + 1);
    }
    setModalConfig(null);
  };

  if (viewMode === "select") {
    return (
      <div className="min-h-screen bg-[#141414] flex flex-col items-center justify-center p-6 font-sans">
        <h1 className="text-3xl md:text-4xl text-white font-medium mb-10 text-center tracking-wide">
          Who's traveling?
        </h1>
        <div className="flex flex-wrap justify-center gap-6 max-w-2xl">
          {accountList.map((name) => (
            <div
              key={name}
              className="flex flex-col items-center cursor-pointer group w-24 md:w-28"
              onClick={() => {
                setSelectedUser(name);
                setViewMode("login");
                setError("");
                setPasscode("");
              }}
            >
              <div
                className={`w-24 h-24 md:w-28 md:h-28 rounded-md ${getColor(
                  name
                )} flex items-center justify-center border-4 border-transparent group-hover:border-white transition-all duration-300 relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50" />
                <Smile
                  size={48}
                  className="text-white opacity-90 drop-shadow-md"
                />
              </div>
              <span className="text-[#808080] mt-3 text-sm md:text-base font-medium group-hover:text-white transition-colors truncate w-full text-center">
                {name}
              </span>
            </div>
          ))}
          <div
            className="flex flex-col items-center cursor-pointer group w-24 md:w-28"
            onClick={() => {
              setViewMode("create");
              setError("");
              setUsername("");
              setPasscode("");
            }}
          >
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-md border-4 border-[#333333] flex items-center justify-center group-hover:border-white group-hover:bg-white/10 transition-all duration-300">
              <Plus
                size={48}
                className="text-[#808080] group-hover:text-white"
              />
            </div>
            <span className="text-[#808080] mt-3 text-sm md:text-base font-medium group-hover:text-white transition-colors">
              Add Profile
            </span>
          </div>
        </div>
        <button
          onClick={() => {
            setViewMode("admin_auth");
            setError("");
            setAdminPasscode("");
          }}
          className="mt-16 border border-[#808080] text-[#808080] hover:text-white hover:border-white px-6 py-2 uppercase tracking-widest text-sm transition-colors"
        >
          Manage Profiles
        </button>
      </div>
    );
  }

  if (viewMode === "admin_panel") {
    return (
      <div className="min-h-screen bg-[#141414] flex flex-col items-center p-8 font-sans relative">
        <h1 className="text-3xl text-white font-medium mb-10 tracking-wide">
          Manage Profiles
        </h1>
        <div className="w-full max-w-xl space-y-4 relative z-10">
          {accountList.length === 0 && (
            <p className="text-[#808080] text-center italic">
              No profiles exist on this device.
            </p>
          )}
          {accountList.map((name) => (
            <div
              key={name}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#1f1f1f] p-4 rounded-xl border border-[#333333] gap-4"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-md ${getColor(
                    name
                  )} flex items-center justify-center shrink-0`}
                >
                  <Smile size={24} className="text-white" />
                </div>
                <span className="text-white font-medium text-lg truncate">
                  {name}
                </span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() =>
                    setModalConfig({
                      type: "clear",
                      name: name,
                      title: "Clear Data?",
                      message: `Reset all checklist and task data for "${name}"?`,
                      confirmText: "Reset Data",
                      confirmColor:
                        "bg-amber-500 hover:bg-amber-600 text-white",
                    })
                  }
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 text-amber-500 bg-amber-500/10 hover:bg-amber-500 hover:text-white transition-colors px-4 py-2.5 rounded-lg text-[10px] font-bold uppercase"
                >
                  <Eraser size={16} /> Reset Memory
                </button>
                <button
                  onClick={() =>
                    setModalConfig({
                      type: "delete",
                      name: name,
                      title: "Delete Profile?",
                      message: `Permanently delete "${name}" and all their saved memory?`,
                      confirmText: "Delete Profile",
                      confirmColor: "bg-red-500 hover:bg-red-600 text-white",
                    })
                  }
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 text-red-500 bg-red-500/10 hover:bg-red-500 hover:text-white transition-colors px-4 py-2.5 rounded-lg text-[10px] font-bold uppercase"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setViewMode("select")}
          className="mt-12 bg-white text-black px-10 py-3 rounded-md font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors relative z-10"
        >
          Done
        </button>

        {modalConfig && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#1f1f1f] border border-[#333333] rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
              <h3 className="text-xl font-bold text-white mb-2">
                {modalConfig.title}
              </h3>
              <p className="text-sm text-[#808080] mb-6 leading-relaxed">
                {modalConfig.message}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setModalConfig(null)}
                  className="flex-1 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#333333] hover:bg-[#444444] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={executeModalAction}
                  className={`flex-1 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-lg ${modalConfig.confirmColor}`}
                >
                  {modalConfig.confirmText}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-sm bg-[#1f1f1f] border border-[#333333] rounded-2xl p-8 shadow-2xl relative">
        <button
          onClick={() => setViewMode("select")}
          className="absolute top-4 left-4 text-[#808080] hover:text-white transition-colors flex items-center gap-1"
        >
          <ChevronLeft size={20} />{" "}
          <span className="text-xs uppercase tracking-wider font-bold">
            Back
          </span>
        </button>

        <div className="text-center mb-8 mt-6">
          {viewMode === "login" && (
            <>
              <div
                className={`w-20 h-20 mx-auto rounded-md ${getColor(
                  selectedUser
                )} flex items-center justify-center mb-4 relative overflow-hidden shadow-lg`}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50" />
                <Smile size={40} className="text-white drop-shadow-md" />
              </div>
              <h2 className="text-xl font-medium text-white mb-1">
                {selectedUser}
              </h2>
              <p className="text-xs text-[#808080] uppercase tracking-widest">
                Enter Passcode
              </p>
            </>
          )}
          {viewMode === "create" && (
            <>
              <div className="w-16 h-16 mx-auto rounded-md border-2 border-[#333333] flex items-center justify-center mb-4 bg-black/30">
                <Plus size={32} className="text-[#808080]" />
              </div>
              <h2 className="text-xl font-medium text-white">Create Profile</h2>
            </>
          )}
          {viewMode === "admin_auth" && (
            <>
              <div className="w-16 h-16 mx-auto rounded-md border-2 border-indigo-500/50 flex items-center justify-center mb-4 bg-indigo-500/10">
                <ShieldCheck size={32} className="text-indigo-400" />
              </div>
              <h2 className="text-xl font-medium text-white">Admin Access</h2>
              <p className="text-[10px] text-[#808080] uppercase tracking-widest mt-1">
                System Master Code: 9999
              </p>
            </>
          )}
        </div>

        <form
          onSubmit={
            viewMode === "create"
              ? handleCreate
              : viewMode === "admin_auth"
              ? handleAdminAuth
              : (e) => e.preventDefault()
          }
          className="space-y-5"
        >
          {viewMode === "create" && (
            <div>
              <label className="block text-[10px] font-bold uppercase text-[#808080] mb-2 tracking-widest">
                Profile Name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                className="w-full bg-[#333] border border-transparent text-white rounded-lg py-3 px-4 focus:outline-none focus:border-white transition-all font-medium placeholder:text-slate-500"
                placeholder="E.g. Explorer"
                autoFocus
              />
            </div>
          )}
          {viewMode !== "create" && viewMode !== "login" && (
            <div>
              <label className="block text-[10px] font-bold uppercase text-[#808080] mb-2 tracking-widest">
                Admin Passcode
              </label>
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                value={adminPasscode}
                onChange={(e) => {
                  setAdminPasscode(e.target.value);
                  setError("");
                }}
                className="w-full bg-[#333] border border-transparent text-white rounded-lg py-3 px-4 focus:outline-none focus:border-white transition-all font-black text-2xl tracking-[0.7em] text-center placeholder:text-slate-600"
                placeholder="••••"
                autoFocus
              />
            </div>
          )}
          {(viewMode === "create" || viewMode === "login") && (
            <div>
              <label className="block text-[10px] font-bold uppercase text-[#808080] mb-2 tracking-widest">
                {viewMode === "create" ? "Set 4-Digit Passcode" : "Passcode"}
              </label>
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                value={passcode}
                onChange={handlePasscodeChange}
                className="w-full bg-[#333] border border-transparent text-white rounded-lg py-3 px-4 focus:outline-none focus:border-white transition-all font-black text-2xl tracking-[0.7em] text-center placeholder:text-slate-600"
                placeholder="••••"
                autoFocus={viewMode === "login"}
              />
            </div>
          )}
          {error && (
            <div className="text-red-500 text-xs text-center font-medium bg-red-500/10 py-2 rounded-lg border border-red-500/20">
              {error}
            </div>
          )}
          {(viewMode === "create" || viewMode === "admin_auth") && (
            <button
              type="submit"
              className="w-full bg-white hover:bg-slate-200 text-black font-bold uppercase tracking-widest text-sm py-3 rounded-lg shadow-lg transition-all mt-6"
            >
              {viewMode === "admin_auth" ? "Authenticate" : "Save Profile"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default App;

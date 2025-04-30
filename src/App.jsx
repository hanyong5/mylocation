import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function App() {
  const [position, setPosition] = useState({
    lat: 37.5665, // 기본 위치 (서울시청)
    lng: 126.9780,
  });


  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      alert("위치 정보를 사용할 수 없습니다.");
    }
  }, []);
  
  
  return (
    <>
    <div className="w-full h-full">

    <Map 
      center={{ lat: position.lat, lng: position.lng }} 
      level={3} 
      style={{ width: "100vw", height: "100vh" }} 
    >
      <MapMarker position={position}>
        <div style={{ padding: "5px", color: "#000" }}>내 위치</div>
      </MapMarker>

    </Map>
    </div>

    </>
  );
}

export default App;

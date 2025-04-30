import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

function App() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [position, setPosition] = useState({
    lat: 37.5665, // 기본 위치 (서울시청)
    lng: 126.978,
  });

  useEffect(() => {
    // 카카오맵 스크립트 동적 로드
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=05222ace53571c8fbb636c91def0fbc2&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        setIsMapLoaded(true);
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      alert('위치 정보를 사용할 수 없습니다.');
    }
  }, []);

  if (!isMapLoaded) return <div>지도를 불러오는 중...</div>;

  return (
    <>
      <div>지도정보보기</div>
      <div className="w-full h-full">
        <Map
          center={{ lat: position.lat, lng: position.lng }}
          level={3}
          style={{ width: '100vw', height: '100vh' }}
        >
          <MapMarker position={position}>
            <div style={{ padding: '5px', color: '#000' }}>내 위치</div>
          </MapMarker>
        </Map>
      </div>
    </>
  );
}

export default App;

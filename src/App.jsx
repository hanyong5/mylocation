import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

function App() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [position, setPosition] = useState({
    lat: 37.5665, // 기본 위치 (서울시청)
    lng: 126.978,
  });

  useEffect(() => {
    const loadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        setIsMapLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=05222ace53571c8fbb636c91def0fbc2';
      
      script.onload = () => {
        setIsMapLoaded(true);
      };

      document.head.appendChild(script);
    };

    loadKakaoMap();

    return () => {
      const script = document.querySelector('script[src*="dapi.kakao.com"]');
      if (script) {
        document.head.removeChild(script);
      }
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

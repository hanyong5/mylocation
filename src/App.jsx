import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

function App() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [position, setPosition] = useState({
    lat: 37.5665, // 기본 위치 (서울시청)
    lng: 126.978,
  });

  // ✅ 위치 파라미터 처리 (최초 1회 실행)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const lat = params.get('lat');
      const lng = params.get('lng');

      if (lat && lng) {
        const parsedLat = parseFloat(lat);
        const parsedLng = parseFloat(lng);

        if (isNaN(parsedLat) || isNaN(parsedLng)) {
          throw new Error('유효하지 않은 위도/경도 값입니다.');
        }

        setPosition({ lat: parsedLat, lng: parsedLng });
      }
    } catch (error) {
      console.error('위치 정보 처리 중 오류 발생:', error);
    }
  }, []);

  // ✅ 카카오맵 스크립트 로딩
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?appkey=05222ace53571c8fbb636c91def0fbc2&autoload=false';
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

  if (!isMapLoaded) return <div>지도를 불러오는 중...</div>;

  return (
    <>
      <div>지도정보보기</div>
      <div className="w-full h-full">
        <Map center={position} level={3} style={{ width: '100vw', height: '100vh' }}>
          <MapMarker position={position} />
        </Map>
      </div>
    </>
  );
}

export default App;

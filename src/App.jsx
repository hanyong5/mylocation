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
      // watchPosition을 사용하여 위치 변경을 지속적으로 감지
      const watchId = navigator.geolocation.watchPosition(
        position => {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        error => {
          console.error('위치 정보를 가져오는데 실패했습니다:', error);
        },
        {
          enableHighAccuracy: true, // 높은 정확도 사용
          timeout: 5000, // 5초 타임아웃
          maximumAge: 0 // 캐시된 위치 정보 사용 안함
        }
      );

      // 컴포넌트 언마운트 시 위치 감시 중지
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
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
          <MapMarker position={position}></MapMarker>
        </Map>
      </div>
    </>
  );
}

export default App;

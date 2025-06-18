import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

function App() {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [facingMode, setFacingMode] = useState('user'); // 'user' (전면) 또는 'environment' (후면)
  const [rotation, setRotation] = useState(0); // 화면 회전 각도

  // 사진 찍기
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    console.log('이미지:', imageSrc);
  };

  // 카메라 전환 (전면/후면)
  const switchCamera = () => {
    setFacingMode(facingMode === 'user' ? 'environment' : 'user');
  };

  // 화면 회전
  const rotateScreen = () => {
    setRotation(prevRotation => (prevRotation + 90) % 360);
  };

  // 핸드폰에 사진 저장
  const downloadImage = () => {
    if (!capturedImage) {
      alert('먼저 사진을 찍어주세요!');
      return;
    }

    // 현재 시간을 파일명에 포함
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `photo-${timestamp}.jpg`;

    // 다운로드 링크 생성
    const link = document.createElement('a');
    link.href = capturedImage;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 모바일에서 공유 기능 사용 (지원하는 경우)
    if (
      navigator.share &&
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ) {
      // Base64 이미지를 Blob으로 변환
      fetch(capturedImage)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], filename, { type: 'image/jpeg' });
          navigator
            .share({
              title: '촬영한 사진',
              text: '웹캠으로 찍은 사진입니다.',
              files: [file],
            })
            .catch(err => {
              console.log('공유 기능을 사용할 수 없습니다:', err);
            });
        });
    }
  };

  // 웹캠 비디오 설정
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: facingMode,
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>사진 앱</h1>

      {/* 웹캠 컨테이너 */}
      <div
        style={{
          position: 'relative',
          marginBottom: '20px',
          transform: `rotate(${rotation}deg)`,
          transition: 'transform 0.3s ease',
        }}
      >
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}
        />
      </div>

      {/* 컨트롤 버튼들 */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <button
          onClick={capture}
          style={{
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          📸 사진 찍기
        </button>

        <button
          onClick={switchCamera}
          style={{
            padding: '12px 24px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          🔄 카메라 전환
        </button>

        <button
          onClick={rotateScreen}
          style={{
            padding: '12px 24px',
            backgroundColor: '#ffc107',
            color: 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          🔄 화면 회전
        </button>

        <button
          onClick={downloadImage}
          disabled={!capturedImage}
          style={{
            padding: '12px 24px',
            backgroundColor: capturedImage ? '#dc3545' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: capturedImage ? 'pointer' : 'not-allowed',
            fontSize: '16px',
          }}
        >
          💾 사진 저장
        </button>
      </div>

      {/* 촬영된 사진 표시 */}
      {capturedImage && (
        <div
          style={{
            marginTop: '20px',
            textAlign: 'center',
          }}
        >
          <h3>촬영된 사진</h3>
          <img
            src={capturedImage}
            alt="촬영된 사진"
            style={{
              maxWidth: '100%',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              marginTop: '10px',
            }}
          />
        </div>
      )}

      {/* 사용법 안내 */}
      <div
        style={{
          marginTop: '30px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '5px',
          fontSize: '14px',
        }}
      >
        <h4>📱 사용법:</h4>
        <ul style={{ textAlign: 'left' }}>
          <li>
            <strong>사진 찍기:</strong> 웹캠으로 현재 화면을 캡처합니다
          </li>
          <li>
            <strong>카메라 전환:</strong> 전면/후면 카메라를 전환합니다 (모바일에서만 작동)
          </li>
          <li>
            <strong>화면 회전:</strong> 웹캠 화면을 90도씩 회전시킵니다
          </li>
          <li>
            <strong>사진 저장:</strong> 촬영된 사진을 기기에 다운로드하거나 공유합니다
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;

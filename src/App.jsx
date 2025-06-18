import React, { useRef } from 'react';
import Webcam from 'react-webcam';

function App() {
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log('이미지:', imageSrc);
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{ width: '100%' }}
      />
      <button onClick={capture}>사진 찍기</button>
    </div>
  );
}

export default App;

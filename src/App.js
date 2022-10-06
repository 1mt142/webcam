import React, { useEffect, useRef } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  let videoRef = useRef(null);

  let photoRef = useRef(null);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        console.log(video);
        video.play();
      })
      .catch((err) => {
        console.error(err);
        // alert(err);
      });
  };

  const takePicture = () => {
    const width = 400;
    const height = width / (16 / 9);

    let video = videoRef.current;

    let photo = photoRef.current;

    photo.width = width;

    photo.height = height;

    let ctx = photo.getContext("2d");

    ctx.drawImage(video, 0, 0, width, height);
  };

  const clearImage = () => {
    let photo = photoRef.current;

    let ctx = photo.getContext("2d");

    ctx.clearRect(0, 0, photo.width, photo.height);
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const boxWithShapes = function () {
    return (
      <div className="empty-box">
        <div className="square"></div>
      </div>
    );
  };

  return (
    <div className="container">
      <video ref={videoRef} className="container"></video>
      <button onClick={takePicture} className="btn btn-danger container">
        Continue
      </button>

      <canvas className="container" ref={photoRef}></canvas>
      <div className="main-box">
        <div className="empty-box">
          <div className="square"></div>
        </div>

        <div className="empty-box">
          <div className="circle"></div>
        </div>

        <div className="empty-box">{/* <div className="circle"></div> */}</div>

        <div className="empty-box">
          <div className="triangle-up "></div>
        </div>
      </div>

      <button onClick={clearImage} className="btn btn-primary container">
        Clear Image
      </button>

      <br />
      <br />
    </div>
  );
}

export default App;

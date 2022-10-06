import React, { useEffect, useRef } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const TOTAL_SHAPE = 12;
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

  const Circle = function App() {
    return <div className="circle"></div>;
  };

  const Triangle = function App() {
    return <div className="triangle-up "></div>;
  };
  const Square = function App() {
    return <div className="square"></div>;
  };
  const EmptyBox = function App(props) {
    return <div className="empty-box">{props.children}</div>;
  };

  let newArray = [];
  for (let i = 0; i < 12; i++) {
    newArray.push(Math.floor(Math.random() * 4));
  }

  const objList = {
    0: <Circle />,
    1: <Triangle />,
    2: <Square />,
    3: "",
  };
  var item = Math.floor(Math.random() * 4);
  return (
    <div className="container">
      <div className="main-box">
        {newArray.map((data, index) => {
          return <EmptyBox key={index}>{objList[data]}</EmptyBox>;
        })}
      </div>
      <video ref={videoRef} className="container"></video>
      <button onClick={takePicture} className="btn btn-danger container">
        Continue
      </button>
      <canvas className="container" ref={photoRef}></canvas>
      <button onClick={clearImage} className="btn btn-primary container">
        Clear Image
      </button>

      <br />
      <br />
    </div>
  );
}

export default App;

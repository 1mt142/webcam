import React, { useEffect, useRef, useState ,useCallback} from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [chceckData,setCheckData]=useState(Math.floor(Math.random() * 3))
  const [changeColor,setChangeColor]=useState("black")
  const [data, setData] = useState([]);

  let ppp=[]
  let arr=[]

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

  let fArr=[]
  const ReturnData=useCallback(function (idx,arr,data) {
    if (chceckData=== arr[idx]) {
      ppp.splice(idx,1)
          console.log(ppp);
      
    }

    // console.log("idx:-->",idx,"arr:-->",arr,"Data:-->",data);
})
console.log("fArr",fArr);


  useEffect(() => {
    // getVideo();
    localStorage.setItem('session', JSON.stringify(null));

  }, []);

 

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
    const idx=props.idx;
    const arr=props.arr;
    const data=props.value;
    return <div onClick={()=>{
      if (chceckData===arr[idx]) {
        // if (ppp.includes(idx)) {
        //   alert("Win")
          arr.push(idx)
          var a = [idx];
          const ff= a.push(JSON.parse(localStorage.getItem('session')));
          const gg=JSON.parse(localStorage.getItem('session'))

          console.log("gg",gg);
         localStorage.setItem('session', JSON.stringify(a));
          ppp.splice(idx,1)
          console.log(ppp);
        // }
      }
      // return ReturnData(idx,arr,data)
    }} className="empty-box">{props.children}</div>;
  };


  let newArray = [];
  for (let i = 1; i <= 12; i++) {
    newArray.push(Math.floor(Math.random() * 4));
  }

  const objList = {
    0: <Circle />,
    1: <Triangle />,
    2: <Square />,
    3: "",
    4: "",
  };


  const findResult=function(){
    return newArray.map((x,idx)=>{
      if (x===chceckData) {
        ppp.push(idx)
      }

    })
  }
  findResult()

  console.log("Result",ppp);      
  console.log("Arr",arr);



  return (
    <div className="container">
            <span style={{padding:"30px"}}>Please select all {objList[chceckData]}</span>


      <div className="main-box stack-top">
        {newArray.map((data, index,arr) => {
          return <EmptyBox value={data} idx={index} arr={arr} key={index}>{objList[data]}</EmptyBox>;
        })}
      </div>

      <video ref={videoRef} className="container"></video>
      <button onClick={takePicture} className="btn btn-danger container">
        Continue
      </button>
      <canvas className="container" id="canvas-id" ref={photoRef}>
      <div className="main-box">
        {newArray.map((data, index) => {
          return <EmptyBox key={`${index}-${data}`}>{objList[data]}</EmptyBox>;
        })}
      </div>
      </canvas>

      <button onClick={clearImage} className="btn btn-primary container">
        Clear Image
      </button>
    </div>
  );
}

export default App;

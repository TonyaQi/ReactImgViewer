import React from 'react';
import ImgViewer from './components/ImgViewer';
import asset1 from './assets/video.mp4';
import asset2 from './assets/2.jpeg';
import asset3 from './assets/3.jpeg';
import asset4 from './assets/4.png';

import './App.css';

function App() {
  const imgList = [{src:asset1, type: 'video'}, {src:asset2, type: 'img'}, {src: asset3, type: 'img'}, {src: asset4, type: 'img'}];
  return (
    <div className="App">
      <div>Example</div>
      <div>
        {
          imgList.map(item => {
            return (
                <div>
                  <ImgViewer
                    src={item.src}
                    type={item.type}
                    className="img"
                  />
                </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;

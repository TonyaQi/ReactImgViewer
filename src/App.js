import React from 'react';
import MediaViewer from './components/MediaViewer';
import asset1 from './assets/video.mp4';
import asset2 from './assets/2.jpeg';
import asset3 from './assets/3.jpeg';
import asset4 from './assets/4.png';

import styles from './App.css';

function App() {
  const imgList = [{src:asset1, type: 'video'}, {src:asset2, type: 'img'}, {src: asset3, type: 'img'}, {src: asset4, type: 'img'}];
  return (
    <div className={styles.App}>
      <div>Example</div>
      <div className={styles.list}>
        {
          imgList.map(item => {
            return (
                <div className={styles.block}>
                  <MediaViewer
                    needOpen={true}
                    src={item.src}
                    type={item.type}
                    className={styles.img}
                    imgGroupKey={'example'}
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

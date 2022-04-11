import React from 'react';
import styles from './MediaScroll.less';

class MediaScroll extends React.Component{
    constructor(props) {
        super(props);

        let que = [];
        let curIndex = props.srcList.findIndex(item => item.src === props.src)

        que.push({
            src: (props.srcList[curIndex - 1] || {}).src,
            transform: -488
        })
        que.push({
            src: (props.srcList[curIndex] || {}).src,
            transform: 0
        })
        que.push({
            src: (props.srcList[curIndex + 1] || {}).src,
            transform: 488
        })
        this.state = {
            curIndex: curIndex,
            flag: -1,
            que: que,
            curTransform: 0
        }
    };

    goBack = () => {
        // let curQue = [...playQue];
        // // 当前正在播放的视图的引用
        // const current = curQue.find(item => item.index === playingIndex)    
        // // 即将播放的视图的引用
        // const nextCurrent = curQue.find(item => item.index === (playingIndex + step) % videoList.length);   
        // // 获取需要淘汰的视图的引用
        // let oldItem = curQue.find(item => item.index === (playingIndex - step) % videoList.length);
        // console.log(oldItem);

        // // 获取即将加入队列的视图的引用
        // let newItem = videoList[(playingIndex + step * (2 + videoList.length)) % videoList.length]
        // console.log(newItem);
        
        // // 覆盖
        // oldItem.src = newItem?.src;
        // oldItem.key = newItem?.key;

        // // 覆盖后的index为即将播放视图index的下2个 【0 1 2】3 4 (1 + 2) % 4 = 3 
        // oldItem.index = (playingIndex + step * (2 + videoList.length)) % videoList.length;
        // // 覆盖后的移动步数为当前播放视图的下2步
        // oldItem.transformCountIndex = (current.transformCountIndex + step * (2 + videoList.length)) % videoList.length * step;

        // console.log(curQue);
        // setPlayQue(curQue);
        // setWrapperTransform(-1 * nextCurrent.transformCountIndex * transformUnit);
        // setPlayingIndex((current.index + (1 + videoList.length) * step) % videoList.length);
        console.log(111);
        let oprIndex = 0;
        let cque = [...this.state.que];
        // let lastTransform = cque[this.state.flag]
        if(this.state.flag === -1) {
            oprIndex = 2;
        } else {
            oprIndex = (this.state.flag + 2) % 3
        }
        cque[oprIndex] = {
            src: (this.props.srcList[(this.state.curIndex + 1) % 3] || {}).src,
            transform: this.state.curTransform - 488 * 2
        }
        console.log(cque[oprIndex]);
        this.setState(pre => ({
            que: cque,
            curTransform: pre.curTransform + 488,
            curIndex: pre.curIndex - 1,
            flag: oprIndex
        }))
    }

    render(){
        const {curIndex} = this.state;
        console.log(curIndex);
        return (
            <div>
            <div
                className={
                    styles['scroll-container']
                }
            >
                <div
                    className={
                        styles['scroll-wrapper']
                    }
                    style={{
                        transform: `translate3d(${this.state.curTransform}px, 0, 0)`
                    }}
                >
                    {
                        this.state.que.map(item => (
                            <div
                                className={styles['scroll-item']}
                                style={{
                                    transform: `translate3d(${item.transform}px, 0, 0)`
                                }}
                            >
                                {
                                    item.src && 
                                    (item.src.includes('mp4') ? <video src={item.src}></video> : <img
                                        src={item.src}
                                    />)
                                }
                            </div>
                        ))
                    }
                </div>

            </div>

                <div
                    onClick={this.goBack}
                    style={{
                        position: 'absolute',
                        zIndex: 1023
                    }}
                >
                last    </div>
                <div
                    onClick={this.goNext}
                    style={{
                        position: 'absolute',
                        zIndex: 1023,
                        left: 20
                    }}
                >next</div>
            </div>
        )
    }
};

export default MediaScroll;
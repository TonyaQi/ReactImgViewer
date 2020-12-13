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
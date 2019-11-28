import React from 'react';
import styles from './MediaWindow.less';

class MediaWindow extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            src: props.src,
            type: props.type
        }
    }

    componentDidMount() {
        // 此处只是想练习计算
        // 由于都是静态图片 所有会直接加载
        // 面对是网络请求的情况时 建议先预设一个图片宽度不要实时获取
        // 或者在每个图片onload的时候去获取宽度
        setTimeout(() => {
            let currentIndex = this.props.srcList.findIndex(item => item.src === this.props.src);
            let dom = document.getElementsByClassName('media')[currentIndex];
            this.mediaList.style.transform = `translateX(${document.body.clientWidth / 2 - dom.offsetLeft - dom.clientWidth / 2}px)`;
        }, 100)
    }

    checkMedia = (e, media) => {
        e.stopPropagation();
        ((this.mediaList || {}).style || {}).transform = `translateX(${document.body.clientWidth / 2 - e.target.offsetLeft - e.target.clientWidth/2}px)`;
        this.setState({
            src: media.src,
            type: media.type
        })
    };

    lastMedia = (e) => {
        e.stopPropagation();
        let currentIndex = this.props.srcList.findIndex(item => item.src === this.state.src);
        if(currentIndex === 0) return;
        this.setState({
            src: this.props.srcList[currentIndex - 1].src,
            type: this.props.srcList[currentIndex - 1].type,
        }, () => {
            let dom = document.getElementsByClassName('media')[currentIndex-1];
            this.mediaList.style.transform = `translateX(${document.body.clientWidth / 2 - dom.offsetLeft - dom.clientWidth / 2}px)`;
        })
    };

    nextMedia = (e) => {
        e.stopPropagation();
        let currentIndex = this.props.srcList.findIndex(item => item.src === this.state.src);
        if(currentIndex === this.props.srcList.length) return;
        this.setState({
            src: this.props.srcList[currentIndex + 1].src,
            type: this.props.srcList[currentIndex + 1].type,
        }, () => {
            let dom = document.getElementsByClassName('media')[currentIndex+1];
            this.mediaList.style.transform = `translateX(${document.body.clientWidth / 2 - dom.offsetLeft - dom.clientWidth / 2}px)`;
        })
    };

    render() {
        const {onClose, srcList} = this.props;
        const {src, type} = this.state;
        return (
            <div className={styles.mask} onClick={onClose}>
                <div className={styles.row}>
                    <div className={styles.last} onClick={this.lastMedia}>{`<`}</div>
                    <div className={styles.media}>
                        {
                            type === 'video' ? (
                                <video
                                    src={src}
                                    controls={'controls'}
                                />
                            ) : (
                                <img
                                    src={src}
                                />
                            )
                        }
                    </div>
                    <div className={styles.next} onClick={this.nextMedia}>{`>`}</div>
                </div>
                <div className={styles.mediaRow}>
                    <div className={styles.mediaList} ref={mediaList => this.mediaList = mediaList}>
                        {
                            srcList.map(item => {
                                return (
                                    <div
                                        className='media'
                                        onClick={(e) => this.checkMedia(e, item)}
                                        data-src={item.src}
                                    >
                                        {
                                            item.type === 'video' ? (
                                                <video
                                                    src={item.src}
                                                />
                                            ) : (
                                                <img
                                                    src={item.src}
                                                />
                                            )
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default MediaWindow;

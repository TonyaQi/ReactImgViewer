import React from 'react';
import styles from './MediaWindow.less';

class MediaWindow extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            src: props.src,
            type: props.type,
            scale: 1,
            translateX: 0,
            translateY: 0,
            drag: false
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
        if(currentIndex >= this.props.srcList.length - 1) return;
        this.setState({
            src: this.props.srcList[currentIndex + 1].src,
            type: this.props.srcList[currentIndex + 1].type,
        }, () => {
            let dom = document.getElementsByClassName('media')[currentIndex+1];
            this.mediaList.style.transform = `translateX(${document.body.clientWidth / 2 - dom.offsetLeft - dom.clientWidth / 2}px)`;
        })
    };

    zoom = (e) => {
        if(!this.area) return;
        if(e.deltaY + e.deltaX < 0)
            {
                let scale = this.state.scale > 10 ? this.state.scale : this.state.scale * 1.1;
                this.area.style.transform = `scale(${scale}) translate(${this.state.translateX}px, ${this.state.translateY}px)`;
                this.setState({
                    scale: scale
                });
            }
        else
            {
                let scale = this.state.scale < 0.2 ? this.state.scale : this.state.scale * 0.9;
                this.area.style.transform = `scale(${scale}) translate(${this.state.translateX}px, ${this.state.translateY}px)`;
                this.setState({
                    scale: scale
                });
            }

        e.stopPropagation();
        if (e.cancelable) {
            // 判断默认行为是否已经被禁用
            if (!e.defaultPrevented) {
                e.preventDefault();
            }
        } else {
            e.returnValue = false
        }
    };

    handleMouseDown = (e) => {
        if (e.button !== 0) {
            return;
        }
        if (this.area) {
            this.setState({
                drag: true,
                mouseX: e.clientX,
                mouseY: e.clientY
            });
        }
    };

    handleMouseMove = (e) => {
        if(!this.state.drag) return;
        this.area.style.transform = `scale(${this.state.scale}) translate(${(this.state.translateX + e.clientX - this.state.mouseX) / this.state.scale}px, ${(this.state.translateY + e.clientY - this.state.mouseY) / this.state.scale}px)`;

        this.setState({
            translateX: this.state.translateX + e.clientX - this.state.mouseX,
            translateY: this.state.translateY + e.clientY - this.state.mouseY,
            mouseX: e.clientX,
            mouseY: e.clientY
        })
    };

    handleMouseUp = (e) => {
        this.setState({
            drag: false,
        });
        e.stopPropagation();
        e.preventDefault();
    };

    render() {
        const {onClose, srcList} = this.props;
        const {src, type} = this.state;
        return (
            <div className={styles.mask}
                 onClick={onClose}
                 onWheel={this.zoom}
            >
                <div
                    className={styles.row}
                    onMouseMove={this.handleMouseMove}
                >
                    <div className={styles.last} onClick={this.lastMedia}>{`<`}</div>
                    <div
                        id={'show'}
                        className={styles.media}
                        ref={area => this.area = area}
                    >
                        {
                            type === 'video' ? (
                                <video
                                    src={src}
                                    controls={'controls'}
                                />
                            ) : (
                                <img
                                    src={src}
                                    draggable={false}
                                    onClick={(e) => {e.stopPropagation()}}
                                    onMouseDown={this.handleMouseDown}
                                    onMouseMove={this.handleMouseMove}
                                    onMouseUp={this.handleMouseUp}
                                    ref={img => this.img = img}
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

import React from 'react';
import ReactDom from 'react-dom'
import MediaWindow from './MediaWindow.js';

class MediaViewer extends React.Component{
    static defaultProps = {
        type: 'img',
        controls: 'controls',
        needOpen: false
    };


    openModel = () => {
        const {imgGroupKey} = this.props;
        let mediaList = document.querySelectorAll(`[data-group=${imgGroupKey}]`);
        let srcList = [];
        mediaList.forEach(item => {
            srcList.push({src: item.getAttribute('src'), type: item.localName})
        });

        const div = document.createElement('div');
        document.body.appendChild(div);

        const onClose = () => {
            ReactDom.unmountComponentAtNode(div);
            if(div.parentNode) {
                div.parentNode.removeChild(div);
            }
        };

        ReactDom.render(<MediaWindow onClose={onClose} srcList={srcList} {...this.props}/>, div);
    };

    render() {
        const {type, src, controls, className, needOpen, imgGroupKey} = this.props;
        return (
            <>
                {
                    type === 'video' ? (
                        <video
                            src={src}
                            controls={controls}
                            className={className}
                            onClick={needOpen ? this.openModel : null}
                            data-group={imgGroupKey}
                        />
                    ) : (
                        <img
                            className={className}
                            src={src}
                            onClick={needOpen ? this.openModel : null}
                            data-group={imgGroupKey}
                        />
                    )
                }
            </>
        );
    }
}

export default MediaViewer;

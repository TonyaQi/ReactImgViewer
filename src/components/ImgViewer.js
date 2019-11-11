import React from 'react';

class ImgViewer extends React.Component{
    static defaultProps = {
        type: 'img',
        controls: 'controls'
    };

    render() {
        const {type, src, controls, className} = this.props;
        return (
            <>
                {
                    type === 'video' ? (
                        <video
                            src={src}
                            controls={controls}
                            className={className}
                        />
                    ) : (
                        <img
                            className={className}
                            src={src}
                        />
                    )
                }
            </>
        );
    }
}

export default ImgViewer;

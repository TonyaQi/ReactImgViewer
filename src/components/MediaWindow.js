import React from 'react';
import styles from './MediaWindow.less';

class MediaWindow extends React.Component{
    render() {
        const {onClose} = this.props;
        return (
            <div className={styles.mask} onClick={onClose}>

            </div>
        )
    }
}

export default MediaWindow;

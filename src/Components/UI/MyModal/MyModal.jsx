import React from 'react';
import styles from './MyModal.module.css'

const MyModal = ({children, visible, setVision}) => {

    const rootClasses = [styles.myModal]


    if (visible) {
        rootClasses.push(styles.active)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVision(false)}>
            <div className={styles.myModal__content} onClick={e => e.stopPropagation()}>
                {children}
            </div>

        </div>
    );
};

export default MyModal;
import { CustomItemBox } from '@/components/shared/WaterMainInfo';

import styles from './progress-bar.module.scss';

const ProgressBar = () => {
    const progress = 50;

    return (
        <CustomItemBox>
            <p className={styles.progressBarTitle}>Today</p>
            <div className={styles.progressBar}>
                <div
                    className={styles.progressBarFill}
                    style={{
                        width: `${progress}%`,
                        backgroundColor: progress < 100 ? '#9be1a0' : '#FABE4A',
                    }}
                >
                    <p
                        className={styles.percentNumber}
                        style={{ color: progress < 100 ? '#9be1a0' : '#FABE4A' }}
                    >
                        {progress < 100 ? `${progress}%` : 'done!'}
                    </p>
                    <div
                        className={styles.ball}
                        style={{
                            border: progress < 100 ? 'solid 1px #9be1a0' : 'solid 1px #FABE4A',
                        }}
                    ></div>
                </div>
            </div>
            <div className={styles.percentContainer}>
                <p className={styles.percent}>0%</p>
                <p className={styles.percent}>50%</p>
                <p className={styles.percent}>100%</p>
            </div>
        </CustomItemBox>
    );
};

export default ProgressBar;

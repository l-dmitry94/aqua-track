import { FC } from 'react';
import { useTranslations } from 'next-intl';

import { CustomItemBox } from '@/components/shared/WaterMainInfo';

import styles from './progress-bar.module.scss';

type ProgressBarTypes = {
    goal: number;
    totalWater: number;
};

const ProgressBar: FC<ProgressBarTypes> = ({ goal, totalWater }) => {
    const t = useTranslations('MainInfo');

    const calculatedPercentage = Math.round((totalWater / (goal * 1000)) * 100);
    const percentage = calculatedPercentage >= 100 ? 100 : calculatedPercentage;

    const lowWaterColor = '#9be1a0';
    const goalReachedColor = '#FABE4A';
    const currentColor = totalWater < goal * 1000 ? lowWaterColor : goalReachedColor;
    return (
        <CustomItemBox>
            <p className={styles.progressBarTitle}>{t('today')}</p>
            <div className={styles.progressBar}>
                <div
                    className={styles.progressBarFill}
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: currentColor,
                    }}
                >
                    <p className={styles.percentNumber} style={{ color: currentColor }}>
                        {totalWater < goal * 1000 ? `${percentage}%` : 'done!'}
                    </p>
                    <div
                        className={styles.ball}
                        style={{
                            border: `solid 1px ${currentColor}`,
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

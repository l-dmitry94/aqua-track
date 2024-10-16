import scss from './WaterLoader.module.scss';

const WaterLoader = () => {
    return (
        <div className={scss.overlay}>
            <div className={scss.circle}>
                <div className={scss.wave}></div>
            </div>
        </div>
    );
};

export default WaterLoader;

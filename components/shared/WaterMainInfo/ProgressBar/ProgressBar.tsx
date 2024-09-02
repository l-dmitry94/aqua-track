const ProgressBar = () => {
    return (
        <div>
            <p className="text-[14px] font-bold leading-[1]">Today</p>
            <p className="my-[8px] h-[8px] w-[174px] rounded-[8px] bg-green"></p>
            <div
                className="flex w-full items-center justify-between text-[10px] font-normal leading-[1]"
                style={{ color: 'rgba(47, 47, 47, 0.6);' }}
            >
                <p>0%</p>
                <p>50%</p>
                <p>100%</p>
            </div>
        </div>
    );
};

export default ProgressBar;

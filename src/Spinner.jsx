import React from 'react';
import { HashLoader } from 'react-spinners';

const CustomSpinner = ({ loading }) => {
    return (
        <div className="w-[100vw] ml-[50%] mt-[10%] h-auto">
            <div className="  z-10">
                <HashLoader color="#16A085" loading={loading} size={50} />
            </div>
        </div>

    );
};

export default CustomSpinner;
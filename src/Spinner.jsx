import React from 'react';
import { HashLoader } from 'react-spinners';

const CustomSpinner = ({ loading }) => {
    return (
        <div className="relative left-[40vw] top-[15vh]  z-10">
            <HashLoader color="#16A085" loading={loading} size={50} />
        </div>
    );
};

export default CustomSpinner;

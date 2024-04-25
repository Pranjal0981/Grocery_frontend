import React from 'react';
import { RotateLoader } from 'react-spinners';



const CustomSpinner = ({ loading }) => {
    return (
        <div className="absolute left-[50%] top-[50%] z-[-10]" >
            <RotateLoader color="#16A085" loading={loading} size={20} />
        </div>
    );
};

export default CustomSpinner;

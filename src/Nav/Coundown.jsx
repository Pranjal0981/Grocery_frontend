import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const TokenExpirationCountdown = () => {
    const tokenExpiration = useSelector(state => state.user.tokenExpiration);
  
    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            // Calculate remaining time until token expiration
            const currentTime = Date.now();
            const remainingTime = tokenExpiration - currentTime;
            // Check if the token has expired
            if (remainingTime <= 0) {
                setCountdown('Token expired');
                clearInterval(interval);
            } else {
                // Convert remaining time to minutes and seconds
                const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
                const seconds = Math.floor((remainingTime / 1000) % 60);

                // Format the countdown string
                const formattedCountdown = `${minutes}m ${seconds}s`;

                // Update the state with the formatted countdown
                setCountdown(formattedCountdown);
            }
        }, 1000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, [tokenExpiration]);

    return <div>{countdown}</div>;
};

export default TokenExpirationCountdown;

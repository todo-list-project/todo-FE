import React, { useState, useEffect } from 'react';
import './topbutton.scss';

const TopButton = () => {
    const [showButton, setShowButton] = useState(false);

    const scrollToTop = () => {
        window.scroll({
            top: 0,
            behavior: 'smooth',
        });
    };
    useEffect(() => {
        const handleShowButton = () => {
            if (window.scrollY > 500) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };
        window.addEventListener('scroll', handleShowButton);
        return () => {
            window.removeEventListener('scroll', handleShowButton);
        };
    }, []);

    return (
        showButton && (
            <div className="top-button">
                <button onClick={scrollToTop}>Top</button>
            </div>
        )
    );
};

export default TopButton;

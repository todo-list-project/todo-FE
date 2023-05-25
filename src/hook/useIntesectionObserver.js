import React, { useEffect, useState } from 'react';

const useIntesectionObserver = ({ onIntersection }) => {
    // console.log('onIntersection', onIntersection);
    const [target, setTarget] = useState(null);
    // console.log('target in', target);

    useEffect(() => {
        if (!target) return;
        // console.log('target out', target);

        const observer = new IntersectionObserver(onIntersection);
        observer.observe(target);
        return () => {
            target && observer.disconnect();
        };
    }, [onIntersection, target]);

    return { setTarget };
};

export default useIntesectionObserver;

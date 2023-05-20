import React, { useEffect, useState } from 'react';

const useIntesectionObserver = ({
    onIntersection,
    options = {
        root: null,
        rootMargin: '0px',
        threshold: 0,
    },
}) => {
    const [target, setTarget] = useState(null);
    console.log(target);

    useEffect(() => {
        if (!target) return;
        console.log('target', target);

        const observer = new IntersectionObserver(onIntersection, options);
        observer.observe(target);
        return () => {
            target && observer.disconnect();
        };
    }, [onIntersection, options, target]);

    return { setTarget };
};

export default useIntesectionObserver;

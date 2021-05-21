import React from 'react';
export const childrenOf = (element) => {
    if (typeof element === 'string') {
        return [];
    }
    //element is always an object, if the value of props is 'undefined' it returns [], if string returns [children], if Array returns array, neither just returns the element inside an array
    //tip: its object desconstructuring after props: (because the extracted value of props is an object with children property)
    const { props: { children } } = element;
    if (!children) {
        return [];
    }

    if (typeof children === 'string') {
        return [children];
    }
    if (Array.isArray(children)) {
        return children;
    }
    return [children];
};
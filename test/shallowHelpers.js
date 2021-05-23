import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

//Matcher Fn's (searches in the shallow render output for the passed type matches the element.type)
export const type = typeName => element => element.type === typeName;
export const id = id => element => element.props && element.props.id === id;
export const className = className => element => element.props.className === className;
export const click = element => element.props.onClick();


const elementsMatching = (element, matcherFn) => {
    if (matcherFn(element)) {
        return [element];
    }
    //if it doesn't match it will recursively search for it
    return childrenOf(element).reduce(
        (acc, child) => [
            ...acc,
            ...elementsMatching(child, matcherFn)
        ],
        []
    );
};

export const createShallowRenderer = () => {
    let renderer = new ShallowRenderer();
    
   
    return {                     //renders only element primitives, .getRenderOutput() actually returns the skeleton (ShallowRender)
        render: component => renderer.render(component),
        elementMatching: matcherFn => elementsMatching(renderer.getRenderOutput(), matcherFn)[0],
        
        elementsMatching: (matcherFn) => elementsMatching(renderer.getRenderOutput(), matcherFn),
        child: n => childrenOf(renderer.getRenderOutput())[n]
    };
};

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
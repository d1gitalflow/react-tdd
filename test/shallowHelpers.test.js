import React from 'react';
import { createShallowRenderer, childrenOf, type } from './shallowHelpers';

describe('childrenOf', () => {
    it('return no children', () => {
        expect(childrenOf(<div />)).toEqual([]);
    })
    it('returns direct children', () => {

        expect(
            childrenOf(
                <div>
                    <p>A</p>
                    <p>B</p>
                </div>
            )
        ).toEqual([<p>A</p>, <p>B</p>])
    })

    it('returns text as an array of one item', () => {
        expect(childrenOf(<div>text</div>)).toEqual(['text'])
    })
    it('returns no children for text', () => {
        expect(childrenOf('text')).toEqual([]);
    });

    it('returns array of children for elements with one child', () => {
        expect(
            childrenOf(
                <div>
                    <p>A</p>
                </div>
            )
        ).toEqual([<p>A</p>]);
    });


})

const TestComponent = ({ children }) => {
    return <React.Fragment>{children}</React.Fragment>
}

describe('child', () => {
    let render, child;

    beforeEach(() => {
        ({ render, child } = createShallowRenderer());
    });

    it('returns undefined if the child does not exist', () => {
        render(<TestComponent />);
        //expects 'undefined'
        expect(child(0)).not.toBeDefined();
    })

    it('returns child of rendered element', () => {
        
        
        render(
            <TestComponent>
                <p>A</p>
                <p>B</p>
            </TestComponent>
        );

        
        expect(child(1)).toEqual(<p>B</p>);
    });
})


describe('elementMatching', () => {
    let render,elementMatching;
    beforeEach(() => {
        ({ render, elementMatching } = createShallowRenderer());
    });
    it('finds first direct child', () => {
        render(
            <TestComponent>
                <p>A</p>
                <p>B</p>
            </TestComponent>
        );
        expect(elementMatching(type('p'))).toEqual(<p>A</p>);
    });
});
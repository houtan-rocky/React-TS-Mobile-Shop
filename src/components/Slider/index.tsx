import React from 'react';

interface SliderProps {
    product: string;
    onclick: () => void;
    children: string;
}

const Index: React.FC<SliderProps> = ({product, onclick, children}) => {
    const abccd = () => {
        let user: [number, string] = [1, 'ab'];
        user.push(1);
        enum Size {
            Small,
            Medium,
            Large,
        }
    }

    return (
        <div>
            {product}
            <button onClick={onclick}>Click me</button>
            {children}
        </div>
    );
}

export default Index;
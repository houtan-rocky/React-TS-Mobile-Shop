import React from 'react';
interface IButtonProps {
    backgroundColor: string;
    size: string;
    icon: string;
    animate: boolean;
    onClick: () => void;
    children: React.ReactNode;
}


const Button = (props: any) => {

    const bg = props.backgroundColor ? 'bg-' + props.backgroundColor : 'bg-main'

    const size = props.size ? 'btn-' + props.size : ''

    const animate = props.animate ? 'btn-animate' : ''

    return (
        <button
            className={`btn ${bg} ${size} ${animate}`}
            onClick={props.onClick ? () => props.onClick() : undefined}
        >
            <span className="btn__txt">{props.children}</span>
            {
                props.icon ? (
                    <span className="btn__icon">
                        <i className={`${props.icon} bx-tada`}></i>
                    </span>
                ) : null
            }
        </button>
    )
}


export default Button
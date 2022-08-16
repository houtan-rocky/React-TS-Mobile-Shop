import React from 'react';

interface ICheckBoxProps {
    label: string;
    checked: boolean;
    onChange: (current: any) => void;
}

function CheckBox(props: ICheckBoxProps) {
    const inputRef = React.useRef(null)

    const onChange = () => {
        if (props.onChange) {
            props.onChange(inputRef.current)
        }
    }


    return (
        <label className={'custom-checkbox'}>
            <input type="checkbox" ref={inputRef} onChange={onChange} checked={props.checked}/>
            <span className="custom-checkbox__checkmark">
                <i className="bx bx-check"></i>
            </span>
        </label>
    );
}

export default CheckBox;
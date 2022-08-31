import React, { useState} from 'react';
import ValidationStatus from "../CustomInput/ValidationStatus";

interface ICustomInputProps {
    name: string
    value: string
    required?: boolean
    className?: any
    placeholder: string
    doValidation: boolean
    dir: string;
    rows: number;
    onChange: (event: Event, inputValue: string) => void
}

function CustomInput(props: ICustomInputProps) {
    const [textAreaValue, setTextAreaValue] = useState<string>();


    const handleInputChange = async (event :any) => {
        const target = event.target;
        const {value} = target;
        setTextAreaValue(value);
        props.onChange(event, value);
    };




    return (
        <React.Fragment>
            <textarea  name={props.name} {...props.name !== 'image' && ({value: `${props.value}`})}
                   onChange={handleInputChange} required={props.required} dir={props.dir} rows={props.rows} />
            {/*// @ts-ignore*/}
            <ValidationStatus name={props.name} value={textAreaValue} pattern={props.pattern} doValidation={props.doValidation} />
        </React.Fragment>
    );
}

export default CustomInput;
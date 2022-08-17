import React, { useState} from 'react';
import ValidationStatus from "./ValidationStatus";

interface ICustomInputProps {
    name: string
    type: string
    pattern: string
    value: string
    required?: boolean
    className: any
    placeholder: string
    onChange: (event: Event, inputValue: string) => void
}

function CustomInput(props: ICustomInputProps) {
    const [inputValue, setInputValue] = useState<string>();


    // const encodeImageFileAsURL = (file) => {
    //     let document = "";
    //     let reader = new FileReader();
    //     reader.onloadend = function () {
    //         document = reader.result;
    //     };
    //     reader.onerror = function (error) {
    //         console.log('Error: ', error);
    //     };
    //
    //     console.log(document)
    //     reader.readAsDataURL(file);
    //     return document;
    // }
    //
    // useEffect(() => {
    //     if (imgURL) {
    //         console.log(imgURL)
    //     }
    // }, [imgURL])


    function encodeImageFileAsURL(element: any, cb: any) {
        var file = element.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            cb(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const handleInputChange = async (event :any) => {
        if (event.target.name === "image") {
            var imgURL = "";
            await encodeImageFileAsURL(event.target, (result: any) => {
                imgURL = result;
                props.onChange(event, result);
                setInputValue(imgURL);
            })
            return;
        }
        const target = event.target;
        const {value} = target;
        setInputValue(value);
        props.onChange(event, value);
    };


    return (
        <React.Fragment>
            <input type={props.type} name={props.name} {...props.name !== 'image' && ({value: `${props.value}`})}
                   onChange={handleInputChange} pattern={props.pattern} required={props.required}/>
            <ValidationStatus name={props.name} value={inputValue} pattern={props.pattern}/>
        </React.Fragment>
    );
}

export default CustomInput;
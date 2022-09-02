import React, {Dispatch, SetStateAction, useRef, useState} from 'react';
import ValidationStatus from "./ValidationStatus";

interface ICustomInputProps {
    name: string
    type: string
    pattern: string
    value: string
    required?: boolean
    className?: any
    placeholder: string
    doValidation: boolean
    dir: string;
    onChange: (event: Event, inputValue: string) => void
}

function CustomInput(props: ICustomInputProps) {

    const [doValidation, setDoValidation] = useState(false)



    const [inputValue, setInputValue] = useState<any>();
    const [isValid, setIsValid] = useState<boolean>();
    const ref = useRef<any>(null);

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
        event.preventDefault();
        if (event.target.name === "image") {
            var imgURL = "";
            await encodeImageFileAsURL(event.target, (result: any) => {
                imgURL = result;
                props.onChange(event, result);
                setInputValue(imgURL);
            })
            return;
        }
        // @ts-ignore
        const target = event.target;
        const {value} = target;
        setInputValue(value);
        setDoValidation(true);
        props.onChange(event, value);
    };


    return (
        <React.Fragment>
            <input ref={ ref} formNoValidate={true}   type={props.type} name={props.name} {...props.name !== 'image' && ({value: `${props.value}`})}
                  onInvalid={(e)=> {
                      ref.current.setCustomValidity("ورودی نامعتبر است")
                  }} onChange={handleInputChange} pattern={props.pattern} required={props.required} dir={props.dir}/>
    {/*// @ts-ignore*/}
            <ValidationStatus name={props.name} value={inputValue} pattern={props.pattern} doValidation={props.doValidation || doValidation}/>
        </React.Fragment>
    );
}

export default CustomInput;
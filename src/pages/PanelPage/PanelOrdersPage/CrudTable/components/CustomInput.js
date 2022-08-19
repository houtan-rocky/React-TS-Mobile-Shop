import React, {useEffect, useState} from 'react';
import ValidationStatus from "../../../../../components/CustomInput/ValidationStatus";

function CustomInput(props) {
    const [inputValue, inputValueSetter] = useState();


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


    function encodeImageFileAsURL(element, cb) {
        var file = element.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            cb(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const handleInputChange = async (event) => {
        if (event.target.name === "image") {
            var imgURL = "";
            await encodeImageFileAsURL(event.target, (result) => {
                imgURL = result;
                props.onChange(event, result);
                inputValueSetter(imgURL);
            })
            return;
        }
        const target = event.target;
        const {value} = target;
        inputValueSetter(value);
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
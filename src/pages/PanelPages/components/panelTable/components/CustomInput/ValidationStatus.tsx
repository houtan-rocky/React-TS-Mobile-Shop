import React, {useState} from 'react';

interface IValidateStatusProps {
    name: string;
    value: string;
    pattern: string;
    doValidation: boolean;
}

function ValidationStatus(props: IValidateStatusProps) {

    const getValidationError = (name: string) => {
        switch (name) {
            case "username":
                return <>نام کاربری نباید خالی باشد</>;
                break;
            case "password":
                return <>رمز عبور نباید خالی باشد</>;
                break;
        }
    }


    const validateInput = (name: string, value: string) => {
        console.log(name, value)
        const pattern = new RegExp(props.pattern);
        const doesMatch = pattern.test(value);
        console.log(doesMatch)

        console.log(pattern)
        if (!value) {
            return getValidationError(name);
        } else {
            return "فرمت صحیح ✓"
        }
    }


    const getClassNamesForWarning = () => {
        return validateInput(props.name, props.value as string) === "فرمت صحیح ✓" ? "input-valid" : "input-invalid";
    }



    return (
        <div className={getClassNamesForWarning()}> {props.doValidation && validateInput(props.name, props.value)} </div>
    );
}

export default ValidationStatus;
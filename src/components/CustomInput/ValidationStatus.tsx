import React, {useState} from 'react';

interface IValidateStatusProps {
    name: string;
    value: string | undefined;
    pattern: string;
}

function ValidationStatus(props: IValidateStatusProps) {

    const getValidationError = (name: string) => {
        switch (name) {
            case "username":
                return <>نام کاربری از فرمت پیروی نمیکند</>;
                break;
            case "password":
                return <>نام کاربری از فرمت پیروی نمیکند</>;
                break;
            case "total_bill":
                return <>نام کاربری فقط می تواند شامل حروف و اعداد باشد</>;
                break;
            case "order_registration_date":
                return <>تاریخ پذیرفته نیست</>
                break;
        }
    }


    const validateInput = (name: string, value: string) => {
        console.log(name, value)
        const pattern = new RegExp(props.pattern);
        const doesMatch = pattern.test(value);
        console.log(doesMatch)

        console.log(pattern)
        if (!doesMatch) {
            return getValidationError(name);
        } else {
            return "صحیح ✓"
        }
    }


    const getClassNamesForWarning = () => {
        return validateInput(props.name, props.value as string) === "صحیح ✓" ? "input-valid" : "input-invalid";
    }



    return (
        <div className={getClassNamesForWarning()}> {props.value && validateInput(props.name, props.value)} </div>
    );
}

export default ValidationStatus;
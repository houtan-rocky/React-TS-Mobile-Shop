import React, {useState} from 'react';

function ValidationStatus(props) {

    const getValidationError = (name) => {
        switch (name) {
            case "first_name":
                return <>نام فقط باید شامل حروف باشد</>;
                break;
            case "last_name":
                return <>نام خانوادگی فقط باید دارای حروف باشد</>;
                break;
            case "username":
                return <>نام کاربری فقط می تواند شامل حروف و اعداد باشد</>;
                break;
            case "email":
                return <>تاریخ پذیرفته نیست</>
                break;
        }
    }


    const validateInput = (name, value) => {
        const pattern = new RegExp(props.pattern);
        const doesMatch = pattern.test(value);

        if (!doesMatch) {
            return getValidationError(name);
        } else {
            return "صحیح ✓"
        }
    }


    const getClassNamesForWarning = () => {
        return validateInput(props.name, props.value) === "صحیح ✓" ? "input-valid" : "input-invalid";
    }


    return (
        <div className={getClassNamesForWarning()}> {props.value && validateInput(props.name, props.value)} </div>
    );
}

export default ValidationStatus;
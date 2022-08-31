import React, {useState} from 'react';

interface IValidateStatusProps {
    name: string;
    value: string;
    pattern: string;
    doValidation: boolean;
}


function ValidationStatus(props: IValidateStatusProps) {


    const getEmptyValueError = (name: string) => {
        switch (name) {
            case "firstName":
                return <> نام نباید خالی باشد</>;
            case "lastName":
                return <>نام خانوادگی نباید خالی باشد</>;
            case "address":
                return <>آدرس نباید خالی باشد </>
            case "phoneNumber":
                return <> شماره تلفن نباید خالی باشد</>
            case "deliveryDate":
                return <>لطفا برای تحویل یک تاریخ انتخاب کنید </>
        }
    }

    const getValidationError = (name: string) => {
        switch (name) {

            case "username":
                return <>نام کاربری نباید خالی باشد</>;
                break;
            case "password":
                return <>رمز عبور نباید خالی باشد</>;
                break;
            case "firstName":
            case "lastName":
                return <>لطفا از حروف فارسی استفاده کنید</>

            case "address":
                return <>آدرس نباید خالی باشد </>
            case "phoneNumber":
                return <>لطفا از ارقام انگلیسی و فرمت صحیح استفاده کنید</>

        }
    }


    const validateInput = (name: string, value: string) => {
        const pattern = new RegExp(props.pattern);
        const doesMatch = pattern.test(value);

        if (!value) {
            return getEmptyValueError(name);
        }
        if (!doesMatch) {
            return getValidationError(name);
        } else {
            return ""
        }
    }


    const getClassNamesForWarning = () => {
        return validateInput(props.name, props.value as string) && "input-invalid";
    }


    return (
        <div
            className={getClassNamesForWarning()}> {props.doValidation && validateInput(props.name, props.value)} </div>
    );
}

export default ValidationStatus;
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
            case "first-name":
                return <> نام نباید خالی باشد</>;
            case "last-name":
                return <>نام خانوادگی نباید خالی باشد</>;
            case "address":
                return <>آدرس نباید خالی باشد </>
            case "phone":
                return <> شماره تلفن نباید خالی باشد</>
            case "email":
                return <> ایمیل نباید خالی باشد</>
            case "delivery-date":
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
            case "first-name":
            case "last-name":
                return <>لطفا از حروف فارسی استفاده کنید</>
            case "email":
                return <> ایمیل نادرست است</>
            case "address":
                return <>آدرس نباید خالی باشد </>
            case "phone":
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
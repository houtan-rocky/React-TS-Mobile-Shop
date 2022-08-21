import React, {useState} from 'react';
// import Button from "../Button";
import {Button, Link} from "@mui/material";
import {LoadingButton} from '@mui/lab';

import CustomInput from "../../pages/PanelPages/components/panelTable/components/CustomInput";
import ReCAPTCHA from "react-google-recaptcha";
import {Navigate} from "react-router-dom";


function LoginForm() {

    const initialFormState = {
        username: "",
        password: ""
    };
    const [loginInfo, setLoginInfo] = useState(initialFormState);
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    const [isUserVerified, setIsUserVerified] = useState(false);
    const [validateInput, setValidateInput] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event: any, inputValue: string) => {
        const {name} = event.target;

        setLoginInfo({...loginInfo, [name]: inputValue});
    };

    const onRecaptchaChange = (value: any) => {
        console.log(value)
        value ? setIsCaptchaVerified(true) : setIsCaptchaVerified(false);
    }

    const onFormSubmit = (event: React.SyntheticEvent) => {
        setValidateInput(true);
        event.preventDefault()
        setIsLoading(true)
        setTimeout(() => {
            setIsUserVerified(true)
            setIsLoading(false);
        }, 2000)
    }

    return (
        <div>
            <div className={'login-form'}>
                <form className={'login-form__form'} onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label>نام کاربری</label>
                        <CustomInput className={'login-form__input'} type="text" name={'username'}
                                     placeholder={'نام کاربری'}
                                     required={false} value={loginInfo.username} pattern={'^(?!\\s*$).+'}
                                     onChange={handleInputChange} doValidation={validateInput}
                                     dir={'ltr'}
                        />
                    </div>
                    <div className="form-group">
                        <label>رمز عبور</label>
                        <CustomInput className={'login-form__input'} type="password" name={'password'}
                                     placeholder={'رمز عبور'}
                                     required={false} value={loginInfo.password} pattern={'^(?!\\s*$).+'}
                                     onChange={handleInputChange} doValidation={validateInput}
                                     dir={'ltr'}
                        />
                    </div>
                        <LoadingButton loading={isLoading} size={'medium'} color={'error'}
                                       className={'login-form__btn'} type={"submit"} variant="contained"
                                       disabled={!isCaptchaVerified} style={{fontSize: "1.5rem"}}>
                            ورود به پروفایل
                        </LoadingButton>
                    { isUserVerified &&  <Navigate to={'/panel/listItems'}/>}
                    <Link color={'success'} href={'/'} underline={'hover'}>
                        بازگشت
                    </Link>
                    <ReCAPTCHA
                        sitekey="6LfCwIQhAAAAAElkdJNHknZSF-iSZCHfC4egSc1o"
                        onChange={onRecaptchaChange}
                        theme={'light'}
                        size={'normal'}
                        hl={'fa'}
                    />
                </form>
            </div>
        </div>
    );
}


export default LoginForm;
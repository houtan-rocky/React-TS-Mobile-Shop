import React, {useEffect, useState} from 'react';
// import Button from "../Button";
import {Button, Link} from "@mui/material";
import {LoadingButton} from '@mui/lab';
import {Login} from 'api/userLogin.api';

import CustomInput from "../CustomFormElements/CustomInput";
import ReCAPTCHA from "react-google-recaptcha";
import {Navigate, useNavigate} from "react-router-dom";
import swal from "sweetalert";


function LoginForm() {

    const initialFormState = {
        username: "",
        password: ""
    };


    const [doValidation, setDoValidation] = useState(false)
    const [loginInfo, setLoginInfo] = useState(initialFormState);
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    const [isUserVerified, setIsUserVerified] = useState(false);
    const [validateInput, setValidateInput] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const Navigate = useNavigate();

    const handleInputChange = (event: any, inputValue: string) => {
        const {name} = event.target;

        setLoginInfo({...loginInfo, [name]: inputValue});
    };

    const onRecaptchaChange = (value: any) => {
        value ? setIsCaptchaVerified(true) : setIsCaptchaVerified(false);
    }



    const onFormSubmit = async (event: React.SyntheticEvent) => {
        setValidateInput(true);
        event.preventDefault();

        // @ts-ignore
        const form = new FormData(event.target);
        const data = Object.fromEntries(form);


        if (true) {

            try {
                const response = await Login(data);

                // customDispatch(setUserDataWhenLogin(response));

                if (response.token) {
                    swal({
                        title: "ورود موفقت آمیز",
                        text: "تا ثانیه ای دیگر به پنل کاربری هدایت خواهید شد ...",
                        icon: "success",
                        timer: 2500,
                    });
                    setTimeout(() => {
                        Navigate("/panel/orders");
                    }, 2500);
                }
            } catch (e: any) {
                console.log(e);
                e.response.status == 400 ? swal('خطا', "کاربر مورد نظر یافت نشد", 'error') : swal('خطا', "خطایی رخ داده است", 'error');
            }
        }

        // setIsLoading(true)
        // setTimeout(() => {
        //     setIsUserVerified(true)
        //     setIsLoading(false);
        // }, 2000)
    }

    useEffect(() => {
        swal({
            title: 'رمز ورود',
            text: 'یوزرنیم و پسورد ادمین هر دو mastermind هست.',
        })
    }, [])


    return (
        <div className={'login__page-control'}>
            <div className={'login-form'}>
                <form className={'login-form__form'} onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label>نام کاربری</label>
                        <CustomInput className={'login-form__input'} type="text" name={'username'}
                                     placeholder={'نام کاربری'}
                                     required={false} value={loginInfo.username} pattern={'([a-zA-Z])\\w+'}
                                     onChange={handleInputChange} doValidation={doValidation}
                                     dir={'ltr'}
                        />
                    </div>
                    <div className="form-group">
                        <label>رمز عبور</label>
                        <CustomInput className={'login-form__input'} type="password" name={'password'}
                                     placeholder={'رمز عبور'}
                                     required={false} value={loginInfo.password} pattern={'^(?!\\s*$).+'}
                                     onChange={handleInputChange}
                                     dir={'ltr'}
                                     doValidation={doValidation}
                        />
                    </div>
                    <LoadingButton loading={isLoading} size={'medium'} color={'primary'}
                                   className={'login-form__btn'} type={"submit"} variant="contained"
                                   disabled={!isCaptchaVerified} style={{fontSize: "1.5rem"}}>
                        ورود به پروفایل
                    </LoadingButton>
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
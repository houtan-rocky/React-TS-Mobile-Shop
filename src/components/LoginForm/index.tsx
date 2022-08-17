import React, {useState} from 'react';
// import Button from "../Button";
import {Button, Link} from "@mui/material";
import CustomInput from "../CustomInput";

function LoginForm() {

    const initialFormState = {
        username: "",
        password: ""
    };
    const [loginInfo, setLoginInfo] = useState(initialFormState);

    const handleInputChange = (event: any, inputValue: string) => {
        const {name} = event.target;

        setLoginInfo({...loginInfo, [name]: inputValue});
    };

    return (
        <div>
            <div className={'login-form'}>
                <form className={'login-form__form'} onSubmit={event => event.preventDefault()}>
                    <div className="form-group">
                        <label>نام کاربری</label>
                        <CustomInput className={'login-form__input'} type="text" name={'username'}
                                     placeholder={'نام کاربری'}
                                     required={false} value={loginInfo.username} pattern={'@"^(?!\\s*$).+"'}
                                     onChange={handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label>رمز ورود</label>
                        <CustomInput className={'login-form__input'} type="text" name={'password'}
                                     placeholder={'رمز ورود'}
                                     required={false} value={loginInfo.password} pattern={'/^$/'}
                                     onChange={handleInputChange}/>
                    </div>
                    {/*<Button type={"submit"} backgroundColor={''}>ورود به پروفایل</Button>*/}
                    <Button type={"submit"} variant="contained">ورود به پروفایل</Button>
                    <br/>
                    <Link href={'/'} underline={'hover'}>
                        بازگشت
                    </Link>
                </form>
            </div>
        </div>
    );
}


export default LoginForm;
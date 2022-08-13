import React from 'react';
// import Button from "../Button";
import {Button, Link} from "@mui/material";

function Index() {
    return (
        <div>
            <div className={'login-form'}>
                <form className={'login-form__form'} onSubmit={event => event.preventDefault()}>
                    <input className={'login-form__input'} type="text" name={'username'} placeholder={'نام کاربری'}
                           required={true}/>
                    <input className={'login-form__input'} type="text" name={'password'} placeholder={'رمز ورود'}
                           required={true}/>
                    {/*<Button type={"submit"} backgroundColor={''}>ورود به پروفایل</Button>*/}
                    <Button variant="contained">ورود به پروفایل</Button>
                    <br/>
                    <Link href={'/'} underline={'hover'}>
                        بازگشت
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Index;
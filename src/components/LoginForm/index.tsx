import React from 'react';
import Button from "../Button";

function Index() {
    return (
        <div>
            <div className={'login-form'}>
                <form action="" className={'login-form__form'}>
                    <input className={'login-form__input'} type="text" name={'username'} placeholder={'نام کاربری'}/>
                    <input className={'login-form__input'}  type="text" name={'password'} placeholder={'رمز ورود'}/>
                    <Button type={"submit"} backgroundColor={''} >Login</Button>
                </form>
            </div>
        </div>
    );
}

export default Index;
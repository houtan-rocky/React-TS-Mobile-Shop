import React from "react";
import Helmet from "../../../components/Helmet";
import {Controls, Player} from "@lottiefiles/react-lottie-player";

export const PaymentFailedPage: React.FC = () => {
    return (
        <main className={'main'}>
            <Helmet title={'موفقیت خرید'}>

                <div className={'payment__failed'}>
                    <h3>عملیات ناموفق</h3>
                    <p>در صورت حل نشدن مشکل با پشتیبانی به آدرس <a href="">figikala@gmail.com</a> ارتباط برقرار کنید</p>
                    <Player
                        className={'payment__failed__image'}
                        autoplay
                        loop
                        src="https://assets2.lottiefiles.com/packages/lf20_ddxv3rxw.json"
                        style={{height: '400px', width: '400px'}}
                    >
                        <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']}/>
                    </Player>
                </div>


            </Helmet>
        </main>)
}
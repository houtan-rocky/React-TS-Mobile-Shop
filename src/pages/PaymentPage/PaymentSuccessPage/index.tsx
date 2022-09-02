import React from "react";
import Helmet from "../../../components/Helmet";
import {Controls, Player} from "@lottiefiles/react-lottie-player";

export const PaymentSuccessfulPage: React.FC = () => {
    return (
        <main className={'main'}>
            <Helmet title={'موفقیت خرید'}>
                <div className={'payment__successful'}>
                    <h3>پرداخت موفقیت آمیز بود.</h3>
                    <p>
                        تشکر از پرداخت شما تاییدیه ثبت سفارش تا دقایقی دیگر برای پست الکترونیکی شما ارسال خواهد شد.
                    </p>
                    <Player

                        autoplay
                        loop
                        src="https://assets9.lottiefiles.com/packages/lf20_gaxn5gzy.json"
                        style={{height: '370px', width: '370px'}}
                    >
                        <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']}/>
                    </Player>
                </div>
            </Helmet>
        </main>)
}

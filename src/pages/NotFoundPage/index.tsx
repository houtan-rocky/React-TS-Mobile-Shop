import React from 'react'
import { Link } from 'react-router-dom'
import {Controls, Player} from "@lottiefiles/react-lottie-player";
export const NotFoundPage = () => {
    return (
        <main className={'main'}>
            <section className={'not-found'}>
                <h3>متاسفانه صفحه ی مورد نظر پیدا نشد</h3>
                <Player
                    className={'not-found__player'}
                    autoplay
                    loop
                    src="https://assets3.lottiefiles.com/packages/lf20_cr9slsdh.json"
                >
                    <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']}/>
                </Player>
                <Link to='/' className='btn'>
                    برگرد به صفحه ی اصلی
                </Link>
            </section>
        </main>
    )
}

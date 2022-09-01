import React from 'react'
import {Link} from 'react-router-dom'
import {Controls, Player} from "@lottiefiles/react-lottie-player";
import {TypeAnimation} from 'react-type-animation';

export const NotFoundPage = () => {
    return (
        <main className={'main'}>
            <section className={'not-found'}>


                <TypeAnimation
                    sequence={[
                        'صفحه', // Types 'صفحه'
                        1000, // Waits 1s
                        'صفحه یافت', // Deletes 'One' and types 'Two'
                        2000, // Waits 2s
                        'صفحه یافت نشد', // Types 'Three' without deleting 'Two'
                        2000, // Waits 2s

                        () => {
                            console.log('Done typing!'); // Place optional callbacks anywhere in the array
                        }
                    ]}
                    wrapper="div"
                    cursor={true}
                    repeat={Infinity}
                    style={{fontSize: '2em'}}
                />

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

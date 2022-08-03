import React from 'react'
import { Link } from 'react-router-dom'
export const NotFoundPage = () => {
    return (
        <div >
            <section>
                <h1 >404</h1>
                <h3 >متاسفانه صفحه ی مورد نظر پیدا نشد</h3>
                <Link to='/' className='btn'>
                    برگرد به صفحه ی اصلی
                </Link>
            </section>
        </div>
    )
}

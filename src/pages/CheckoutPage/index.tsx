import React, {useEffect, useState} from "react";
import Helmet from "../../components/Helmet";
import {useSelector} from 'react-redux'
import Button from "../../components/Button";
import numberWithCommas from "../../utils/numberWithCommas";
import {Link} from "react-router-dom";
import CartItem from '../../components/CartItem'
import productData from "../../assets/fake-data/products";
import {GetProduct} from "../../api/product";
import {Controls, Player} from "@lottiefiles/react-lottie-player";

export const CheckoutPage: React.FC = () => {

    const cartItems = useSelector((state: any) => state.cartItems.value)


    const [cartProducts, setCartProducts] = useState<any>([])

    const [totalProducts, setTotalProducts] = useState(0)

    const [totalPrice, setTotalPrice] = useState(0)

    async function getCartItemsInfo(cartItems: any) {
        let cartProducts: any[] = []
        for (let i = 0; i < cartItems.length; i++) {
            const res = await GetProduct(cartItems[i].id)
            const product = await res.data;
            cartProducts =
                [...cartProducts,
                    {
                        ...product,
                        color: cartItems[i].color,
                        quantity: cartItems[i].quantity
                    }]
        }
        console.log(typeof cartProducts)
        setCartProducts(cartProducts);
    }

    useEffect(() => {
        getCartItemsInfo(cartItems)
        setTotalPrice(cartItems.reduce((total: any, item: any) => total + (Number(item.quantity) * Number(item.price.amount)), 0))
        setTotalProducts(cartItems.reduce((total: number, item: any) => total + Number(item.quantity), 0))
    }, [cartItems])


    return (
        <main className={'main'}>
            <Helmet title={'صفحه ی سفارش'}>
                {cartProducts.length ?
                    <>

                        {
                            <div className="checkout__list">
                                {
                                    cartProducts.map((item: any, index: any) => (
                                        <CartItem item={item} key={index}/>
                                    ))
                                }
                            </div>
                        }
                        <p>
                            شما در حال ثبت سفارش {totalProducts} محصول هستید
                        </p>
                        <div className="checkout__info__txt__price">
                            <span>مبلغ کل:</span> <span>{numberWithCommas(Number(totalPrice))} تومان</span>
                        </div>
                        <div className="checkout__info">
                            <h1>صفحه ی سفارش</h1>

                            <div className={''}></div>
                            <div className="checkout__info__txt">
                                <form action="">
                                    <div className="form-group">
                                        <label>نام</label>
                                        <input type="text"/>
                                    </div>
                                    <div className="form-group">
                                        <label>نام خانوادگی</label>
                                        <input type="text"/>
                                    </div>
                                    <div className="form-group">
                                        <label>تلفن همراه</label>
                                        <input type="text"/>
                                    </div>
                                    <div className="form-group">
                                        <label>آدرس</label>
                                        <textarea rows={10}/>
                                    </div>
                                    <div className="form-group">
                                        <label>تاریخ تحویل</label>
                                        <input type="datetime-local"/>
                                    </div>

                                </form>


                            </div>
                            <div className="checkout__info__btn">
                                <Link to="payment/successful">
                                    <Button size="block">
                                        پرداخت
                                    </Button>
                                </Link>

                            </div>
                        </div>
                    </>
                    :
                    <div className="checkout__empty">

                        <Player

                            autoplay
                            loop
                            src="https://assets9.lottiefiles.com/temp/lf20_BnhDqb.json"
                        >
                            <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']}/>
                        </Player>
                        <h2> سبد خرید شما خالی است</h2>

                    </div>
                }
            </Helmet>
        </main>
    )
}
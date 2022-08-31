import React, {useEffect, useState} from "react";
import Helmet from "../../components/Helmet";
import {useSelector} from 'react-redux'
import Button from "../../components/Button";
import numberWithCommas from "../../utils/numberWithCommas";
import {Link, useNavigate} from "react-router-dom";
import CartItem from '../../components/CartItem'
import productData from "../../assets/fake-data/products";
import {GetProduct} from "../../api/product";
import {Controls, Player} from "@lottiefiles/react-lottie-player";
import CustomInput from "../../components/CustomFormElements/CustomInput";
import CustomTextArea from "../../components/CustomFormElements/CustomTextArea";
import {addOrder} from "../../api/updateOrder";
import emailjs from 'emailjs-com';
import products from "../../assets/fake-data/products";
import ReCAPTCHA from "react-google-recaptcha";
import {LoadingButton} from "@mui/lab";

export const CheckoutPage: React.FC = () => {
    const Navigate = useNavigate();

    const [isFormValid, setIsFormValid] = useState(false);


    const cartItems = useSelector((state: any) => state.cartItems.value)
    const [validateInput, setValidateInput] = useState(false);


    const [cartProducts, setCartProducts] = useState<any[]>([])


    const [totalProducts, setTotalProducts] = useState(0)

    const [totalBill, setTotalBill] = useState(null)
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);



    const [orderInfo, setOrderInfo] = useState<any>(({
        "first-name": "",
        "last-name": "",
        "phone": "",
        "address": "",
        "transferDate": "",
        "delivered-at": null,
        status: "pending",
        "total-bill": 1,
        "products": [],
        "email": "",
        "delivery-date":""
    }));


    async function getCartItemsInfo(cartItems: any) {
        let cartProducts: any[] = []
        let orderProducts: any[] = []
        for (let i = 0; i < cartItems.length; i++) {
            const res = await GetProduct(cartItems[i].id)
            const product = await res.data;
            cartProducts =
                [...cartProducts,
                    {
                        ...product,
                        color: cartItems[i].color,
                        colorId: cartItems[i].color.id,
                        productId: cartItems[i].id,
                        quantity: cartItems[i].quantity
                    }]
            orderProducts = [
                ...orderProducts,
                {
                    colorId: cartItems[i].color.id,
                    productId: cartItems[i].id,
                    quantity: cartItems[i].quantity
                }
            ]
        }
        setOrderInfo((prevState: any[]) => ({...prevState, products: orderProducts}))
        setCartProducts(cartProducts);
    }

    useEffect(() => {
        getCartItemsInfo(cartItems)
        setTotalBill(cartItems.reduce((total: any, item: any) => total + (Number(item.quantity) * Number(item.price.amount)), 0))
        setOrderInfo((prevState: any[]) => ({...prevState, "total-bill":cartItems.reduce((total: any, item: any) => total + (Number(item.quantity) * Number(item.price.amount)), 0)}))
        setTotalProducts(cartItems.reduce((total: number, item: any) => total + Number(item.quantity), 0))
    }, [cartItems])

    const handleInputChange = (event: any) => {
        event.preventDefault();
        const {name, value} = event.target;
        setOrderInfo((prevState: any) => ({...prevState, [name]: value}))
    }

    const handleFormSubmit = (event: any) => {
        event.preventDefault();
        setValidateInput(true);
        // if (!isFormValid)
        //     return;
        setOrderInfo((prevState: any) => ({
            ...prevState, "total-bill": totalBill,
            "products": cartProducts,
        }))

        addOrder(orderInfo).then((res) => {
            console.log(res)
        })
        sendEmail(event)
        Navigate('payment/successful')

        localStorage.removeItem('cartItems');

    }


    function sendEmail(event: any) {
        event.preventDefault();    //This is important, i'm not sure why, but the email won't send without it

        emailjs.sendForm('service_m7ltivo', 'template_iffp16n', event.target, 'rZ_e1ZcTcNaT56K6_')
            .then((result) => {
                window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior)
            }, (error) => {
                console.log(error.text);
            });
    }

    const onRecaptchaChange = (value: any) => {
        value ? setIsCaptchaVerified(true) : setIsCaptchaVerified(false);
    }

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
                            <span>مبلغ کل:</span> <span>{numberWithCommas(Number(totalBill))} تومان</span>
                        </div>
                        <div className="checkout__info">
                            <h1>صفحه ی سفارش</h1>

                            <div className={''}></div>
                            <div className="checkout__info__txt">
                                <form onSubmit={handleFormSubmit}>
                                    <div className="form-group">
                                        <label>نام</label>
                                        <CustomInput name="first-name" value={orderInfo["first-name"]}
                                                     onChange={handleInputChange} type="text" required={true}
                                                     placeholder={'نام'} pattern={'^[\u0600-\u06EF\\s]+$'} dir={'rtl'}
                                                     doValidation={validateInput}/>
                                    </div>
                                    <div className="form-group">
                                        <label>نام خانوادگی</label>
                                        <CustomInput name="last-name" value={orderInfo["last-name"]}
                                                     onChange={handleInputChange} type="text" required={true}
                                                     placeholder={'نام خانوادگی'} pattern={'^[\u0600-\u06EF\\s]+$'}
                                                     dir={'rtl'} doValidation={validateInput}/>

                                    </div>
                                    <div className="form-group">
                                        <label>تلفن همراه</label>
                                        <CustomInput name="phone" value={orderInfo["phone"]}
                                                     onChange={handleInputChange} type="text" required={true}
                                                     placeholder={'تلفن همراه'}
                                                     pattern={'(0|\\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}'}
                                                     dir={'rtl'} doValidation={validateInput}/>
                                    </div>
                                    <div className="form-group">
                                        <label>ایمیل</label>
                                        <CustomInput name="email" value={orderInfo["email"]}
                                                     onChange={handleInputChange} type="email" required={true}
                                                     placeholder={'ایمیل'}
                                                     pattern={'^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$'}
                                                     dir={'rtl'} doValidation={validateInput}/>
                                    </div>
                                    <div className="form-group">
                                        <label>آدرس</label>
                                        <CustomTextArea name="address" value={orderInfo["address"]}
                                                        onChange={handleInputChange} required={true}
                                                        placeholder={'نام کاربری'} dir={'rtl'}
                                                        doValidation={validateInput} rows={10}/>
                                    </div>
                                    <div className="form-group">
                                        <label>تاریخ تحویل</label>
                                        <CustomInput name="delivery-date" type={'date'} value={orderInfo["delivery-date"]}
                                                     pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}" onChange={handleInputChange}
                                                     required={true} placeholder={'نام کاربری'} dir={'rtl'}
                                                     doValidation={validateInput}/>
                                    </div>

                                    <div className="checkout__info__btn">

                                        <LoadingButton size={'large'} color={'primary'}
                                                       className={'login-form__btn'} type={"submit"} variant="contained"
                                                       disabled={!isCaptchaVerified} style={{fontSize: "1.5rem"}}>
                                            پرداخت
                                        </LoadingButton>
                                        <ReCAPTCHA
                                            sitekey="6LfCwIQhAAAAAElkdJNHknZSF-iSZCHfC4egSc1o"
                                            onChange={onRecaptchaChange}
                                            theme={'light'}
                                            size={'normal'}
                                            hl={'fa'}
                                        />
                                    </div>
                                </form>


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
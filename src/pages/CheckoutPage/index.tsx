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
import DatePicker, {DateObject} from "react-multi-date-picker"

// persian multiple date picker
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import CustomMap from "../../components/CustomMap";
import {LatLng} from "leaflet";


export const CheckoutPage: React.FC = () => {
    const Navigate = useNavigate();

    const initialUserLocation = {
        lat: 0,
        lng: 0
    }

    const [userLocation, setUserLocation] = useState(initialUserLocation);
    console.log(userLocation)
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
        "products": [{
            "id": 0,
            "price": 0,
            "quantity": 0,
            "name": "",
        }],
        "email": "",
        "delivery-date": new Date(),
        "map": {lat: 0, lng: 0},
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
                    quantity: cartItems[i].quantity,
                    price: cartItems[i].price.amount,
                    name: cartItems[i]['product-name-en']
                }
            ]
        }
        setOrderInfo((prevState: any[]) => ({...prevState, products: orderProducts}))
        setCartProducts(cartProducts);
    }

    useEffect(() => {
        getCartItemsInfo(cartItems)
        setTotalBill(cartItems.reduce((total: any, item: any) => total + (Number(item.quantity) * Number(item.price.amount)), 0))
        setOrderInfo((prevState: any[]) => ({
            ...prevState,
            "total-bill": cartItems.reduce((total: any, item: any) => total + (Number(item.quantity) * Number(item.price.amount)), 0)
        }))
        setTotalProducts(cartItems.reduce((total: number, item: any) => total + Number(item.quantity), 0))
    }, [cartItems])

    useEffect(() => {
        const {lat, lng} = userLocation;
        setOrderInfo((prevState: any[]) => ({...prevState, "map": {lat, lng}}))
    }, [userLocation])

    const handleInputChange = (event: any) => {
        if (event instanceof DateObject) {
            const date = event;
            console.log('date', date.toDate())
            setOrderInfo((prevState: any) => ({...prevState, "delivery-date": date.toDate()}))
            return;
        }
        event.preventDefault();
        const {name, value}: { name: any, value: any } = event.target;
        console.log(event, name, value);
        // @ts-ignore

        setOrderInfo((prevState: any) => ({...prevState, [name]: value}))
    }

    const handleFormSubmit = (event: any) => {
        setValidateInput(true);
        event.preventDefault();
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
                                        <CustomInput  name="phone" value={orderInfo["phone"]}
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
                                        <label>تاریخ تحویل</label>
                                        <DatePicker name={"delivery-date"} value={orderInfo["delivery-date"]}
                                                    inputClass={"date-picker"}
                                                    minDate={new DateObject({calendar: persian})}
                                                    calendarPosition="bottom-right" weekPicker={false}
                                                    onChange={handleInputChange} calendar={persian}
                                                    locale={persian_fa}/>

                                    </div>
                                    <div className="form-group">
                                        <label>آدرس</label>
                                        <CustomTextArea name="address" value={orderInfo["address"]}
                                                        onChange={handleInputChange} required={true}
                                                        placeholder={'نام کاربری'} dir={'rtl'}
                                                        doValidation={validateInput} rows={10}/>
                                    </div>

                                    <div className="form-group">
                                        <label>آدرس روی نقشه</label>
                                        <CustomMap dir={'rtl'} setUserBbox={setUserLocation}/>
                                    </div>


                                    <div className="checkout__info__btn">
                                        <ReCAPTCHA
                                            sitekey="6LfCwIQhAAAAAElkdJNHknZSF-iSZCHfC4egSc1o"
                                            onChange={onRecaptchaChange}
                                            theme={'light'}
                                            size={'normal'}
                                            hl={'fa'}
                                            className={"recaptcha"}
                                        />

                                        <LoadingButton size={'large'} color={'primary'}
                                                       type={"submit"} variant="contained"
                                                       disabled={!isCaptchaVerified} style={{fontSize: "1.5rem"}}
                                        onClick={() => setValidateInput(true)}
                                        >
                                            پرداخت
                                        </LoadingButton>

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
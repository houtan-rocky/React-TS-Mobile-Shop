import React, { useState, useEffect } from 'react'

// import { withRouter } from 'react-router'

import { useDispatch } from 'react-redux'

import { addItem } from '../../redux/shopping-cart/cartItemsSlide'
import { remove } from '../../redux/product-modal/productModalSlice'

import Button from '../Button'
import numberWithCommas from '../../utils/numberWithCommas'
import swal from "sweetalert";

const ProductView = (props: any) => {

    const dispatch = useDispatch()

    let product = props.product
    console.log(product)

    if (product === undefined) product = {
        title: "",
        price: {
            "currency": "IRR",
            "amount": "0",
            "amount-discount": "0"
        },
        images: [null, null, null],
        categorySlug: "",
        colors: [],
        slug: "",
        size: [],
        description: {
            fa: "",
            en: ""
        }
    }

    const [previewImg, setPreviewImg] = useState(product.images[0])

    const [descriptionExpand, setDescriptionExpand] = useState(false)

    const [color, setColor] = useState(undefined)

    const [size, setSize] = useState(undefined)

    const [quantity, setQuantity] = useState(1)

    const updateQuantity = (type: any) => {
        if (type === 'plus') {
            setQuantity(quantity + 1)
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
        }
    }

    useEffect(() => {
        setPreviewImg('http://localhost:3001' + "/files/" + product.thumbnail)
        setQuantity(1)
        setColor(undefined)
        setSize(undefined)
    }, [product])

    const check = () => {
        if (color === undefined) {
            swal({
                title: "لطفا رنگ را انتخاب کنید",
                text: "برای ادامه ی عملیات رنگ محصول را انتخاب کنید",
                icon: "warning",
                dangerMode: true,
                buttons: [
                    'باشه'
                ]
            })
            return false
        }

        // if (size === undefined) {
        //     alert('لطفا یک سایز انتخاب کنید')
        //     return false
        // }

        return true
    }

    const addToCart = () => {
        if (check()) {
            let newItem = {
                slug: product.slug,
                color: color,
                size: size,
                price: product.price,
                quantity: quantity
            }
            if (dispatch(addItem(newItem))) {
                swal({
                    title: "به سبد اضافه شد",
                    text: "محصول مورد نظر شما به سبد خرید اضافه شد",
                    icon: "success",
                    dangerMode: true,
                    buttons: [
                        'باشه'
                    ]
                })
            } else {
                alert('انجام نشد')
            }
        }
    }

    const goToCart = () => {
        if (check()) {
            let newItem = {
                slug: product.slug,
                color: color,
                size: size,
                price: product.price,
                quantity: quantity
            }
            if (dispatch(addItem(newItem))) {
                dispatch(remove())
                props.history.push('/cart')
            } else {
                alert('Fail')
            }
        }
    }

    return (
        <div className="product">
            <div className="product__images">
                <div className="product__images__list">
                    <div className="product__images__list__item" onClick={() => setPreviewImg('http://localhost:3001' + "/files/" + product.images[1])}>
                        <img src={'http://localhost:3001' + "/files/" + product.images[1]} alt="" />
                    </div>
                    <div className="product__images__list__item" onClick={() => setPreviewImg('http://localhost:3001' + "/files/" + product.images[2])}>
                        <img src={'http://localhost:3001' + "/files/" + product.images[2]} alt="" />
                    </div>
                </div>
                <div className="product__images__main">
                    <img src={previewImg} alt="" />
                </div>
                <div className={`product-description ${descriptionExpand ? 'expand' : ''}`}>
                    <div className="product-description__title">
                        مشخصات محصول
                    </div>
                    <div className="product-description__content" dangerouslySetInnerHTML={{__html: product.description.fa}}></div>
                    <div className="product-description__toggle">
                        <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                            {
                                descriptionExpand ? 'بستن' : 'بیشتر'
                            }
                        </Button>
                    </div>
                </div>
            </div>
            <div className="product__info">
                <h1 className="product__info__title">{product.product_name_en}</h1>
                <div className="product__info__item">
                    <span className="product__info__item__price">
                        {numberWithCommas(product.price.amount)}
                    </span>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        رنگ
                    </div>
                    <div className="product__info__item__list">
                        {
                            product.colors.map((item: any, index: any) => (
                                <div key={index} className={`product__info__item__list__item ${color === item ? 'active' : ''}`} onClick={() => setColor(item)}>
                                    <div className={`circle bg-${item['color-name-en'].toLowerCase()}`}></div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="product__info__item">
                    {/*<div className="product__info__item__title">*/}
                    {/*    اندازه*/}
                    {/*</div>*/}
                    {/*<div className="product__info__item__list">*/}
                    {/*    {*/}
                    {/*        product.size.map((item: any, index: any) => (*/}
                    {/*            <div key={index} className={`product__info__item__list__item ${size === item ? 'active' : ''}`} onClick={() => setSize(item)}>*/}
                    {/*                <span className="product__info__item__list__item__size">*/}
                    {/*                    {item}*/}
                    {/*                </span>*/}
                    {/*            </div>*/}
                    {/*        ))*/}
                    {/*    }*/}
                    {/*</div>*/}
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        تعداد
                    </div>
                    <div className="product__info__item__quantity">
                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('minus')}>
                            <i className="bx bx-minus"></i>
                        </div>
                        <div className="product__info__item__quantity__input">
                            {quantity}
                        </div>
                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('plus')}>
                            <i className="bx bx-plus"></i>
                        </div>
                    </div>
                </div>
                <div className="product__info__item">
                    <Button onClick={() => addToCart()}>به سبد اضافه کن</Button>
                    <Button onClick={() => goToCart()}>خرید آنی</Button>
                </div>
            </div>
            <div className={`product-description mobile ${descriptionExpand ? 'expand' : ''}`}>
                <div className="product-description__title">
                    مشخصات محصول
                </div>
                <div className="product-description__content" dangerouslySetInnerHTML={{__html: product.description.fa}}>
                </div>
                <div className="product-description__toggle">
                    <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                        {
                            descriptionExpand ? 'بستن' : 'بیشتر'
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}



export default ProductView;
// export default withRouter(ProductView)

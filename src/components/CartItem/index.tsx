import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import {BASE_URL} from "../../configs/variables.config"


import swal from 'sweetalert'
import {useDispatch} from 'react-redux'
import {updateItem, removeItem} from '../../redux/shopping-cart/cartItemsSlide'

import numberWithCommas from '../../utils/numberWithCommas'
import {Link} from 'react-router-dom'

const CartItem = (props: any) => {

    const count = props.count;
    const dispatch = useDispatch()

    const itemRef = useRef(null)

    const [item, setItem] = useState(props.item)
    const [quantity, setQuantity] = useState(props.item.quantity)

    useEffect(() => {
    })
    useEffect(() => {
        setItem(props.item)
        setQuantity(props.item.quantity)
    }, [props.item])

    const updateQuantity = (opt: any) => {
        console.log('q', quantity, 'c', item.count)
        if (opt === '+') {
            if (quantity + 1 > item.count ) {
                return;
            }
            dispatch(updateItem({...item, quantity: quantity + 1}))
        }
        if (opt === '-') {
            if (quantity - 1 < 1 ) {
                return;
            }
            dispatch(updateItem({...item, quantity: quantity - 1 === 0 ? 1 : quantity - 1}))
        }
    }

    // const updateCartItem = () => {
    //     dispatch(updateItem({...item, quantity: quantity}))
    // }

    const removeCartItem = () => {
        console.log('removeCartItem')
        dispatch(removeItem(item))
    }


    return (
        <div className="cart__item" ref={itemRef}>
            <div className="cart__item__image">
                <img src={BASE_URL + "/files/" + props.item.thumbnail} alt=""/>
            </div>
            <div className="cart__item__info">
                <div className="cart__item__info__name">
                    <Link to={`/catalog/${item.slug}`}>
                        {`${item['product-name-en']} - ${item.color && item.color['color-name-en']}`}
                    </Link>
                </div>
                <div className="cart__item__info__price">
                    {numberWithCommas(item.price.amount)}
                </div>
                <div className="cart__item__info__quantity">
                    <div className="product__info__item__quantity">
                        {props.actions &&
                            <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('-')}>
                                <i className="bx bx-minus"></i>
                            </div>
                        }
                        <div className="product__info__item__quantity__input">
                            {quantity}
                        </div>
                        {props.actions &&
                            <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('+')}>
                                <i className="bx bx-plus"></i>
                            </div>
                        }
                    </div>
                </div>
                {props.actions &&
                    <div className="cart__item__del">
                        <i className='bx bx-trash' onClick={() => removeCartItem()}></i>
                    </div>
                }
            </div>
        </div>
    )
}


export default CartItem
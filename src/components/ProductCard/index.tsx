import React from 'react';
import {Link} from "react-router-dom";
import Button from "../Button";

import numberWithCommas from 'utils/numberWithCommas'

interface IProductCardProps {
    img01: string
    img02: string
    name: string
    price: number
    slug: string
    children?: React.ReactNode
}

const toast = function() {
    window.alert("You have been successfully updated.")

}

const ProductCard = (props: IProductCardProps) => {
    return (
        <div className="product-card">
            <Link to={`/products/${props.slug}`}>
                <div className="product-card__image">
                    <img src={'http://localhost:3001' + "/files/" + props.img01} alt=""/>
                    <img src={'http://localhost:3001' + "/files/" + props.img02} alt=""/>
                </div>
                <h3 className="product-card__name">{props.name}</h3>
                <div className="product-card__price">
                    {numberWithCommas(props.price)}
                    <span className="product-card__price__old">
                        <del>{numberWithCommas(Math.round(props.price * 1.1))}</del>
                    </span>
                </div>
            </Link>
            <div className="product-card__btn">
                <Link to={`/products/${props.slug}`}>

                    <Button
                        size="sm"
                        icon="bx bx-cart"
                        animate={true}
                    >
                        خرید
                    </Button>
                </Link>

            </div>
        </div>
    )
}


export default ProductCard

import {useParams} from "react-router-dom";
import React from "react";

export const SingleProductPage: React.FC = () => {
    const { id } = useParams();
    return (<main className={'main'}>SingleProductPage</main>)
}
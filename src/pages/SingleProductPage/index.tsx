import {useParams} from "react-router-dom";
import React from "react";

export const SingleProductPage: React.FC = () => {
    const { id } = useParams();
    console.log(id);
    return (<h1>SingleProductPage</h1>)
}
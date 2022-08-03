import Index from "../../components/Slider";
import React from "react";
import {HeaderNavigation} from "../../components/HeaderNavigation";

export const HomePage: React.FC = () => {
    const handleButtonClick = () => {
        console.log('button clicked')
    }
    return (
            <h1>
                <HeaderNavigation/>
                homepage
                <Index product={'white shirt'} onclick={handleButtonClick}>
                    Children here.
                </Index>
            </h1>
    )
}
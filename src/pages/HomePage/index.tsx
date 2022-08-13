import React from "react";
import Helmet from "../../components/Helmet";
import HeroSlider from "../../components/HeroSlider";
import heroSliderData from "../../assets/fake-data/hero-slider";

export const HomePage: React.FC = () => {
    return (
        <main className={'main'}>
            <Helmet title={'خانه'}>
                {/*hero slider*/}
                <HeroSlider data={heroSliderData}
                            control={true}
                            auto={true}
                            timeOut={5000}/>
                {/*end hero slider*/}
            </Helmet>
        </main>
    )
}
import React from "react";
import Helmet from "../../components/Helmet";
import HeroSlider from "../../components/HeroSlider";
import heroSliderData from "../../assets/fake-data/hero-slider";
import Section, {SectionBody} from "../../components/Section";
import policy from "../../assets/fake-data/policy";
import PolicyCard from "../../components/PolicyCard";
import Grid from "../../components/ui/Grid";

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

                {/*    policy section*/}
                <Section>
                    <SectionBody>
                        <Grid col={4} mdCol={2} smCol={1} gap={20}>
                            {
                                policy.map((item, index) => <PolicyCard key={index} name={item.name}
                                                                        description={item.description}
                                                                        icon={item.icon}/>)
                            }
                        </Grid>
                    </SectionBody>
                </Section>
                {/*    end policy section*/}
            </Helmet>
        </main>
    )
}
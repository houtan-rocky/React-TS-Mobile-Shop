import React, {useEffect, useState} from "react";
import Helmet from "../../components/Helmet";
import HeroSlider from "../../components/HeroSlider";
import heroSliderData from "../../assets/fake-data/hero-slider";
import Section, {SectionBody, SectionTitle} from "../../components/Section";
import policy from "../../assets/fake-data/policy";
import PolicyCard from "../../components/PolicyCard";
import Grid from "../../components/ui/Grid";
import productData from "../../assets/fake-data/products";
import ProductCard from "../../components/ProductCard";
import {Link} from "react-router-dom";
import banner from 'assets/images/banner.png'
import {GetProducts, showRandomProducts} from "../../api/product";

export const HomePage: React.FC = () => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        GetProducts().then((data => setProducts(data.data)))
    }, [])

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

                {/*    best-selling section*/}
                <Section>
                    <SectionTitle>
                        محصولات پیشنهادی
                    </SectionTitle>
                    <SectionBody>
                        <Grid col={4} mdCol={2} smCol={1} gap={20}>
                            {
                                showRandomProducts(products, 4).map((item: any, index) => (
                                    <ProductCard key={index} img01={item.thumbnail} img02={item.images[1]} name={item['product-name-fa']}
                                                 price={item.price.amount} slug={item.id}>

                                    </ProductCard>
                                ))
                            }
                        </Grid>
                    </SectionBody>
                </Section>
                {/*    end best-selling section*/}

                {/*    new arrival section*/}
                <Section>
                    <SectionTitle>
                        محصولات جدید
                    </SectionTitle>
                    <SectionBody>
                        <Grid col={4} mdCol={2} smCol={1} gap={20}>
                            {
                                showRandomProducts(products, 8).map((item: any, index) => (
                                    <ProductCard key={index} img01={item.thumbnail} img02={item.images[1]} name={item['product-name-fa']}
                                                 price={item.price.amount} slug={item.slug}>

                                    </ProductCard>
                                ))
                            }
                        </Grid>
                    </SectionBody>
                </Section>
                {/*   end new arrival section*/}

            {/*    banner */}
                <Section>
                    <SectionBody>
                        <Link to={'/products'}>
                            <img src={banner} alt=""/>
                        </Link>
                    </SectionBody>
                </Section>
            {/*    end banner*/}
            </Helmet>
        </main>
    )
}
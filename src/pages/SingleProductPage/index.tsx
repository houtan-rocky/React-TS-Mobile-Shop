import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Helmet from "../../components/Helmet";
import {GetProduct, showRandomProducts} from "../../api/product";
import Section, {SectionBody, SectionTitle} from "../../components/Section";
import ProductCard from "../../components/ProductCard";
import Grid from "../../components/ui/Grid";
import ProductView from "../../components/ProductView";


interface IProduct {
    id: string;
    product_name_en: string;
    colors: [];
    size: [];
}

export const SingleProductPage: React.FC = (props: any) => {
    const {id} = useParams();
    const [product, setProduct] = useState<IProduct>();

    useEffect(() => {
        getProduct(id as string);
    }, [])

    const getProduct = (id: string) => {
        GetProduct(id)
            .then((response: any) =>{
                console.log(response.data)
                setProduct(response.data)}
            )

    }

    return (
        <main className={'main'}>
            <Helmet title={product?.product_name_en}>
                <Section>
                    <SectionBody>
                        <ProductView product={product}/>
                    </SectionBody>
                </Section>
                <Section>
                    <SectionTitle>
                        محصولات بیشتر
                    </SectionTitle>
                    <SectionBody>
                        <Grid
                            col={4}
                            mdCol={2}
                            smCol={1}
                            gap={20}
                        >
                            {
                                showRandomProducts([], 2).map((item, index) => (
                                    <ProductCard
                                        key={index}
                                        img01={item.image01}
                                        img02={item.image02}
                                        name={item.title}
                                        price={Number(item.price)}
                                        slug={item.slug}
                                    />
                                ))
                            }
                        </Grid>
                    </SectionBody>
                </Section>
            </Helmet>
        </main>
    )

}
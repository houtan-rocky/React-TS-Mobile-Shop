import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Helmet from "../../components/Helmet";
import {GetProduct, GetProducts, showRandomProducts} from "../../api/product";
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
    console.log(id)
    const [product, setProduct] = useState<IProduct>();
    const [products, setProducts] = useState([]);

    React.useEffect(() => {
        window.scrollTo(0,0)
    })

    useEffect(() => {
        getProduct(id as string);
        GetProducts().then((data => setProducts(data.data)))
    }, [id])

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
                                showRandomProducts(products, 4).map((item, index) => (
                                    <ProductCard
                                        key={index}
                                        img01={item.images[0]}
                                        img02={item.images[1]}
                                        name={item.product_name_en}
                                        price={Number(item.price.amount)}
                                        slug={item.id}
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
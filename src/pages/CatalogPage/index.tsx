import React, {useCallback, useEffect, useRef, useState} from "react";
import Helmet from "../../components/Helmet";
import Grid from "../../components/ui/Grid";
import {GetProducts, showRandomProducts} from "../../api/product";
import ProductCard from "../../components/ProductCard";
import {GetCategories} from "../../api/getCategory.api";
import CheckBox from "../../components/CheckBox";
import Button from "../../components/Button";
import size from "../../assets/fake-data/product-size";
import colors from "../../assets/fake-data/product-color";
import InfinityList from "../../components/InfinityList";

export const CatalogPage: React.FC = () => {
    const initFilter = {
        category: [],
        color: [],
        size: []
    }


    const [products, setProducts] = useState<string[]>([]);
    const [categories, setCategories] = useState([])
    const [filter, setFilter] = useState<any>(initFilter)
    const productList = showRandomProducts(products, products.length)


    useEffect(() => {
        GetProducts().then((data => setProducts(data.data)))
        GetCategories().then((data => setCategories(data.data)))
    }, [])



    const filterSelect = (type: string, checked: boolean, item: any) => {
        if (checked) {
            switch(type) {
                case "CATEGORY":
                    setFilter({...filter, category: [...filter.category, item.id]})
                    break
                case "COLOR":
                    setFilter({...filter, color: [...filter.color, item.color]})
                    break
                case "SIZE":
                    setFilter({...filter, size: [...filter.size, item.size]})
                    break
                default:
            }
        } else {
            switch(type) {
                case "CATEGORY":
                    const newCategory = filter.category.filter((e: any) => e !== item.categorySlug)
                    setFilter({...filter, category: newCategory})
                    break
                case "COLOR":
                    const newColor = filter.color.filter((e: any) => e !== item.color)
                    setFilter({...filter, color: newColor})
                    break
                case "SIZE":
                    const newSize = filter.size.filter((e: any) => e !== item.size)
                    setFilter({...filter, size: newSize})
                    break
                default:
            }
        }
    }

    const clearFilter = () => setFilter(initFilter)

    const updateProducts = useCallback(
        () => {
            let temp = productList
            console.table(temp)

            if (filter.category.length > 0) {
                temp = temp.filter(e => filter.category.includes(e['category-id']))
            }

            if (filter.color.length > 0) {
                temp = temp.filter(e => {
                    const check = e.colors.find((color: any) => filter.color.includes(color))
                    return check !== undefined
                })
            }

            if (filter.size.length > 0) {
                temp = temp.filter(e => {
                    const check = e.size.find((size: any) => filter.size.includes(size))
                    return check !== undefined
                })
            }

            setProducts(temp)
        },
        [filter, productList],
    )

    useEffect(() => {
        updateProducts()
    }, [])

    const filterRef = useRef<HTMLDivElement>(null)

    const showHideFilter = () => filterRef.current!.classList.toggle('active')



    return (
        <Helmet title="محصولات">
            <main className={'main'}>
            <div className="catalog">
                <div className="catalog__filter" ref={filterRef}>
                    <div className="catalog__filter__close" onClick={() => showHideFilter()}>
                        <i className="bx bx-left-arrow-alt"></i>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            برند
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                showRandomProducts(categories,categories.length).map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item['name-fa']}
                                            onChange={(input) => filterSelect("CATEGORY", input.checked, item)}
                                            checked={filter.category.includes(item['name-fa'])}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            رنگ
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                colors.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.display}
                                            onChange={(input) => filterSelect("COLOR", input.checked, item)}
                                            checked={filter.color.includes(item.color)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__content">
                            <Button size="sm" onClick={clearFilter}>پاک کردن فیلتر</Button>
                        </div>
                    </div>
                </div>
                <div className="catalog__filter__toggle">
                    <Button size="sm" onClick={() => showHideFilter()}>نمایش دسته بندی</Button>
                </div>
                <div className="catalog__content">
                    <InfinityList
                        data={products}
                    />
                </div>
            </div>
            </main>
        </Helmet>
    )
}


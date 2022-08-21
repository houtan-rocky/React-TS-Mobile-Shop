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


    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState([])
    const [filter, setFilter] = useState<any>(initFilter)
    const [productList, setProductList] = useState<any[]>([])


    useEffect(() => {
        GetProducts().then((data => {
            setProductList(data.data)
            setProducts(data.data)
        }))
        GetCategories().then((data => setCategories(data.data)))
    }, [])



    const filterSelect = (type: string, checked: boolean, categoryItem: any) => {
        if (checked) {
            switch(type) {
                case "CATEGORY":
                    setFilter({...filter, category: [...filter.category, categoryItem.id]})
                    break
                case "COLOR":
                    setFilter({...filter, color: [...filter.color, categoryItem.color]})
                    break
                case "SIZE":
                    setFilter({...filter, size: [...filter.size, categoryItem.size]})
                    break
                default:
            }
        } else {
            switch(type) {
                case "CATEGORY":
                    const newCategory = filter.category.filter((e: any) => e !== categoryItem.id)
                    setFilter({...filter, category: newCategory})
                    break
                case "COLOR":
                    const newColor = filter.color.filter((e: any) => e !== categoryItem.color)
                    setFilter({...filter, color: newColor})
                    break
                case "SIZE":
                    const newSize = filter.size.filter((e: any) => e !== categoryItem.size)
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

            if (filter.category.length > 0) {
                temp = temp.filter(e => filter.category.includes(e.category_id))
            }

            if (filter.color.length > 0) {
                temp = temp.filter(product => {
                    const check = product.colors.find((colorObj: any) => filter.color.includes(colorObj.colorـnameـen))
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
    }, [filter])

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
                                showRandomProducts(categories,categories.length).map((categoryItem, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={categoryItem['name-fa']}
                                            onChange={(input) => filterSelect("CATEGORY", input.checked, categoryItem)}
                                            checked={filter.category.includes(categoryItem.id)}
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


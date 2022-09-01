import React, {useState} from 'react';
import ImageUpload from "../../components/ImageUpload";
import CustomInput from "../../../../components/CustomFormElements/CustomInput";
import {Editor} from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import {convertToRaw} from "draft-js";
import {Button} from "@mui/material";
import DirectoryTable from "../../components/panelTable/components/DirectoryTable";
import {GetProducts} from "../../../../api/product";

function OrderDetailForm(props) {
    console.log(props)
    const [products, setProducts] = useState([])

    useState(() => {
        fetchTableItems()
    }, [])

    function fetchTableItems() {
        GetProducts()
            .then((response) =>
                response.data.map((item) => ({
                    ...item
                }))
            )
            .then((data) => {
                setProducts(data);
            })
            .catch((err) => console.log(err));
    }



    console.log({products})
    console.log('cur',props.currentTableItem)

    // @ts-ignore
    return (
        <>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    props.currentTableItem['status'] = "shipped"
                    props.updateCurrentTableItem();
                }}
            >
                <div className="form-group">
                    <label>نام مشتری</label>
                    <CustomInput
                        type="text"
                        name="full-name"
                        value={props.currentTableItem['first-name'] + " " + props.currentTableItem['last-name']}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>آدرس</label>
                    <CustomInput
                        type="text"
                        name="address"
                        value={props.currentTableItem['address']}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>تلفن</label>
                    <CustomInput
                        type="tel"
                        name="phone"
                        value={props.currentTableItem['phone']}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>زمان سفارش</label>
                    <CustomInput
                        type="text"
                        name="createdAt"
                        value={new Date(props.currentTableItem['createdAt'])}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>زمان تحویل</label>
                    <CustomInput
                        type="text"
                        name="delivery-date"
                        value={props.currentTableItem['delivery-date']}
                        required
                    />
                </div>

                <div>
                    <table className="responsive-table">
                        <thead className="">
                        <li className={"table-header"}>
                            <th>کالا</th>
                            <th>قیمت</th>
                            <th>تعداد</th>
                        </li>
                        </thead>
                        <tbody>
                        {
                            props.currentTableItem.products.map((product) => {
                                return (
                                    <li className={"table-row"}>
                                    <td className={"col col-1"}>{products.length > 0 ?  (`${products[product.productId]['product-name-en']} - ${products[product.productId]['colors'][product.colorId]['color-name-en']}`): 'داده وجود ندارد'}</td>
                                    <td className={"col col-2"}>{product.price}</td>
                                    <td className={"col col-1s"}>{product.quantity}</td>
                                </li>)
                            })
                        }
                        </tbody>
                    </table>
                </div>


                {
                    props.currentTableItem["status"] === "shipped" ?
                        <Button disabled type={'submit'} className="modal-button" variant="outlined">
                            تحویل شده
                        </Button>
                        :
                        <Button type={'submit'} className="modal-button" variant="outlined">
                            تغییر به تحویل شد
                        </Button>
                }
            </form>

        </>

    );
}

export default OrderDetailForm;
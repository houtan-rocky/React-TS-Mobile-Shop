import React, {useState} from "react";
import CustomInput from "../../../../../components/CustomFormElements/CustomInput";
import {addOrder} from "../../../../../api/updateOrder";
import ImageUpload from "../../ImageUpload";
import {Editor} from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import {ContentState, convertToRaw, EditorState} from "draft-js";
import {Button} from "@mui/material";
import htmlToDraft from "html-to-draftjs";


const AddForm = (props) => {
    const productDescription = React.useState(
        () => {
            return EditorState.createEmpty(
            );
        },
    );

    const initialFormState = {
        id: null,
        "product-name-en": "",
        last_name: "",
        total_bill: "",
        order_registration_date: "",
        image: "",
    };
    const [order, setOrder] = useState(initialFormState);

    const handleInputChange = (event) => {
        const {name, value} = event.target;

        props.setCurrentTableItem({...props.currentTableItem, [name]: value});
    };

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                props.addCurrentTableItem();
            }}
        >
            <div className="form-group">
                <h2>ویرایش</h2>
                <label>تصویر کالا</label>
                <ImageUpload className={'edit'}
                             files={[props.currentTableItem.thumbnail, ...props.currentTableItem.images]}/>
            </div>
            <div className="form-group">
                <label>نام کالا</label>
                <CustomInput
                    type="text"
                    name="product-name-en"
                    value={props.currentTableItem && props.currentTableItem['product-name-en']}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>دسته بندی</label>
                <select
                    type="number"
                    name={'category-id'}
                    value={props.currentTableItem["category-id"]}
                    onChange={handleInputChange}
                    required
                >
                    <option key={-1}  selected>
                        لطفا یک دسته بندی انتخاب کنید
                    </option>
                    {props.categories.map((category) =>
                        <option key={category.id} value={category.id}>
                            {category['name-en']}
                        </option>
                    )}
                </select>

            </div>
            <div className="form-group">
                <label>توضیحات</label>
                <div dir={'ltr'} className={'edit'}>
                    <Editor
                        editorState={productDescription[0]}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={newState => {
                            productDescription[1](newState);
                            props.setCurrentTableItem((prevState) => ({...prevState,
                                description: {
                                    ...prevState.description,
                                    fa: (draftToHtml(convertToRaw(newState.getCurrentContent())))
                                }
                            }))
                        }}
                    />
                </div>
            </div>
            <Button type={'submit'} className="modal-button" variant="outlined">ارسال</Button>
        </form>
    );
};

export default AddForm;

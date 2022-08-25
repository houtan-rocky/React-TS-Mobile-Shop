import React, { useState, useEffect } from "react";
import CustomInput from "./CustomInput";
import {updateOrder} from "../../../../../api/updateOrder";
import {GetCategories} from "../../../../../api/getCategory.api";
import { Editor } from 'react-draft-wysiwyg';
import {EditorState, convertToRaw, ContentState, convertFromHTML} from 'draft-js';
import 'draft-js/dist/Draft.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditForm = (props) => {
  const [content, setContent] = useState('');
  const [tableItem, setTableItem] = useState(props.currentUser);
  const [categories, setCategories] = useState([]);
  const x = React.useState(
      () => {
        return EditorState.createWithContent(
            ContentState.createFromBlockArray(
                convertFromHTML(props.currentUser.description.fa)
            )
        );
      },
  );

  useEffect(() => {
    // setTableItem(props.currentUser);
    fetchCategories()
  }, [props]);

  const fetchCategories = () => {
    GetCategories().then(data => setCategories(data.data))
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    props.setCurrentTableItem({ ...props.currentTableItem, [name]: value });
  };

  console.log('editor state', x[0])

  // @ts-ignore
  return (
      <>
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.updateTableItem(tableItem.id, tableItem);
        props.updateCurrentTableItem();
      }}
    >
      <div className="form-group">
        <h2>ویرایش</h2>
        <label>تصویر کالا</label>
        <input
          type="file"
          name="product-image"
          required
        />
      </div>
      <div className="form-group">
        <label>نام کالا</label>
        <CustomInput
          type="text"
          name="product-name-en"
          value={props.currentTableItem['product-name-en']}
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
          {categories.map((category)=>
            <option key={category.id} value={category.id} >
              {category['name-en']}
            </option>
          )}
        </select>

      </div>
      <div className="form-group" >
        <label>توضیحات</label>
        <div dir={'ltr'}  className={'edit'}>
        <Editor
            editorState={x[0]}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={newState => {
              x[1](newState);
              props.setCurrentTableItem((prevState) => ({...prevState, description: {...prevState.description, fa:  (draftToHtml(convertToRaw(newState.getCurrentContent()))) }}))
            }}
        />
        </div>
      </div>
      <button className="modal-button">Update user</button>
    </form>

      </>

  );
};

export default EditForm;

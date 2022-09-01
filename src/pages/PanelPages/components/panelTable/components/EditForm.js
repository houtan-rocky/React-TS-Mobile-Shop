import React, { useState, useEffect } from "react";
import CustomInput from "../../../../../components/CustomFormElements/CustomInput";

//file pond
import 'filepond/dist/filepond.css';

// darft js
import { Editor } from 'react-draft-wysiwyg';
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

//mui
import {Button} from "@mui/material";



import ImageUpload from "../../ImageUpload";



const EditForm = (props) => {
  const productDescription = React.useState(
      () => {
        return EditorState.createWithContent(
            ContentState.createFromBlockArray(
                htmlToDraft(props.currentUser.description.fa)
            )
        );
      },
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    props.setCurrentTableItem({ ...props.currentTableItem, [name]: value });
  };




  // @ts-ignore
  return (
      <>
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.updateCurrentTableItem();
      }}
    >
      <div className="form-group">
        <h2>ویرایش</h2>
        <label>تصویر کالا</label>
        <ImageUpload className={'edit'} files={[props.currentTableItem.thumbnail, ...props.currentTableItem.images]}/>
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
          {props.categories.map((category)=>
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
            editorState={productDescription[0]}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={newState => {
              productDescription[1](newState);
              props.setCurrentTableItem((prevState) => ({...prevState, description: {...prevState.description, fa:  (draftToHtml(convertToRaw(newState.getCurrentContent()))) }}))
            }}
        />
        </div>
      </div>
      <Button type={'submit'} className="modal-button" variant="outlined">به روز رسانی</Button>
    </form>

      </>

  );
};

export default EditForm;

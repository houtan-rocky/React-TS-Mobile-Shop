// filepond package
import React, {useState, memo} from "react";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css'
import {FilePond, registerPlugin} from "react-filepond";

function ImageUpload() {
registerPlugin(FilePondPluginImagePreview)
    const [files, setFiles] = useState([])
    return (
        <div className="container mt-5">
            <FilePond files={files} allowMultiple={true} maxFiles={3}/>
        </div>
    )
}

export default memo(ImageUpload)
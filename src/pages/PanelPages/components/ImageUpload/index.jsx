// filepond package
import React, {useState, memo} from "react";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css'
import {FilePond, registerPlugin} from "react-filepond";
import {UPLOAD_IMAGE} from "configs/url.config";


function ImageUpload() {
    registerPlugin(FilePondPluginImagePreview)
    // const [files, setFiles] = useState([]);
    return (
        <div className="container mt-5">
            <FilePond  allowMultiple={true} maxFiles={3} name="image"
                      server={{

                                  url: UPLOAD_IMAGE,
                                  method: "POST",
                                  headers: {
                                      token: localStorage.getItem("ACCESS_TOKEN"),
                                  },

                      }
                      }
                      dropOnPage
                      dropValidation
            />
        </div>
    )
}

export default memo(ImageUpload)
import { useState } from "react";
import React from "react";
import ProgressBar from "./progressBar";


const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null)

    const types = ['image/jpeg', 'image/png']

    const changeHandler = (e) => {
        
        let selected = e.target.files[0];

        console.log(selected);
        

        if (selected && types.includes(selected.type)) {
            setFile(selected)
            setError(null)
        } else {
            setFile(null);
            setError('Please, choose an image file with png or jpeg format')
        }
    }

    return  (
        <form>
            <label>
                <input type="file" onChange={changeHandler} />
                <span></span>
            </label>
            <div className="output">
                {error && <div className="error">{error}</div>}
                {file && <div className="file">{file.name}</div>}
                {file && <ProgressBar file = {file} setFile = {setFile} />}
            </div>
        </form>
    )
}

export default UploadForm;
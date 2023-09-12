import { useState, useEffect } from "react";
import { theStorage } from "../firebaseConfig/config";

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] =useState(null);
    const [url, setUrl] = useState(null);

    const storageEffect = () => {
        const storageRef = theStorage.ref(file.name);
        storageRef.put(file).on('state_changed', (snapshot) => {
        const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
        }, (error) => {
        setError(error);
        }, async () => {
        try {
            const url = await storageRef.getDownloadURL();
            setUrl(url);
        } catch (error) {
            setError(error);
        }
    })
    }

    useEffect(() => { storageEffect() }, [file])

    return {progress, url, error}
}

export default useStorage;
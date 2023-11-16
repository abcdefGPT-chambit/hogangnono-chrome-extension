import { useState , useEffect} from "react";

export default function useFetch(url){
    const [result, setResult] = useState(()=>[]);

    useEffect(()=>{
        fetch(url)
            .then((res) =>{
                return res.json();
            })
            .then((data)=>{
                setResult(data);
            })
            .catch((err)=>{
                console.error('useFetch(${url}) error : ', err);
            });
    }, [url]);

    return result;
}
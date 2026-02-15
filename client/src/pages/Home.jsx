import React, { useState } from 'react'

const Home = () => {

    const [url , setUrl] = useState("");

    const [shortUrl , setShortUrl] = useState("");

    const [copied ,setCopied] = useState(false);

    const [qrImage, setQrImage] = useState("");


    const handShorten = async () =>{


        if(!url) return;

        try{
           

            const res = await axios.post()

             
        }catch(error){
           
            
            console.log(error);
            alert("Something went wrong")
        }
    }

      
  return (
    <div>
      
    </div>
  )
}

export default Home

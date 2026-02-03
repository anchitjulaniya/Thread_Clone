import React,{useState} from 'react'
import url from '../utils/link'
import {  toast } from 'react-toastify'


function Reply() {
    const [reply, setReply] = useState('')
  
    const handleReplyClick = async () => {
      try {
        const response = await fetch(`${url}/posts/reply`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            reply
          }),
        });
  
        const data = await response.json();
        console.log(data);

        setReply('')

      } catch (error) {
        console.error(error);
      }
    };
  
    return (
    <div className='bg-[#2b2b2b] h-screen w-full'>
        <div className='h-lg w-md'>
            <input
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            type="text" />
            <button
            onClick={handleReplyClick}
            >Reply</button>
        </div>

    </div>
  )
}

export default Reply
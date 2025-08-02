import React, { useState } from 'react'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import { Button } from './ui/button'


const MessageForm = () => {

  const [message, setMessage] = useState<string>("");
  const [delay, setDelay] = useState<number>(10);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [sentMessage, setSentMessage] = useState<string>("");
  const [cancelAlert, setCancelAlert] = useState<boolean>(false);

  const handleSend = () => {
    setIsSending(true)

    const id = setTimeout(() => {
      setSentMessage(message);
      setMessage("");
      setIsSending(false);
    }, delay * 1000)
  setTimerId(id)  }

  const handleCancel = () => {
    if (timerId) clearTimeout(timerId);
    setIsSending(false);
    setCancelAlert(true);
    setTimeout(() => setCancelAlert(false), 2000);
  }


   return (
    <div className='max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-sm bg-white space-y-4'>
      <h2 className='text-2xl font-bold text-gray-800'>Dm Delay Button</h2>
      <p className='text-gray-600 mb-2'>Delayed message sender</p>
      {cancelAlert && (
        <div className='bg-yellow-100 border rounded p-3 text-yellow-900 mb-2'>
          <p className='font-semibold'>Message was cancelled</p>
        </div>
      )}



      <Textarea  
      placeholder='Type your message...'
       value={message}
       onChange={(e) => setMessage(e.target.value)}
      />

      <Input type="number"
        placeholder='Delay in seconds'
        value={delay}
        onChange={(e) => setDelay(Number(e.target.value))}
        disabled={isSending}
      />

      {!isSending ? (
        <Button className='w-full border' onClick={handleSend}>
          Sent with delay
        </Button>
      ) : (
        <Button variant='destructive' className='w-full variant' onClick={handleCancel}>
          Cancel Sending
        </Button>
      )}

{sentMessage && (
<div className='bg-green-100 border rounded p-3 text-green-900'>
  <p className='font-semibold'>Message Sent:</p>
  <p>{sentMessage}</p>
</div>
)}

    </div>
  )
}

export default MessageForm
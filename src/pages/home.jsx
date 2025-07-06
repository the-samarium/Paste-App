import React, { useState } from 'react'
import { Outlet, useSearchParams, } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createPaste, removePaste, resetPaste, updatePaste } from '../slices/Appslice'
import toast from 'react-hot-toast'


const Home = () => {
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [params, setparams] = useSearchParams('')
  const pasteID = params.get('pasteID')
  const dispatch = useDispatch()
  function createpaste() {
    if (title=="" || value=="") {
      toast.error('Empty title and content!');
      return;
    }
    const paste = {
      title: title,
      content: value,
      id: pasteID || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }
    if (pasteID) {
      //update
      dispatch(updatePaste(paste));
    } else {
      //create
      dispatch(createPaste(paste));
    }

    //after creation or updation
    setTitle('')
    setValue('')
    setparams({})

  }
  
  function deletepaste() {
    if (pasteID) {
      dispatch(removePaste(pasteID))
    }
    setTitle('')
    setValue('')
    setparams({})
  }



  return (
    <div className="w-2xl flex flex-col p-4 bg-neutral-800 rounded-b-2xl font-mono">
      <div className="flex flex-row gap-5 justify-start items-center w-full mb-4">
        <input
          className="p-2 rounded-xl w-fit h-13"
          type="text"
          placeholder="Title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <div className='w-full flex justify-end p-4 gap-5'>

        <button onClick={createpaste} className=' bg-green-500'>{pasteID ? 'Update' : 'Paste'}</button>
        
        <button onClick={deletepaste} className=' bg-red-500'>Delete</button>
        </div>
      </div>

      <textarea
        className="rounded-xl p-2 w-full h-[400px] resize-none"
        value={value}
        placeholder="Enter content here"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>

  )
}

export default Home
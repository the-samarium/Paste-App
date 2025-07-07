import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removePaste } from '../slices/Appslice'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


function removeall() {
  dispatch(resetPaste())
  setTitle('')
  setValue('')
  setparams({})

}
const ViewPaste = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const pastes = useSelector((state) => state.paste.pastes || [])

  const [searchTerm, setSearchterm] = useState('')

  const handleDelete = (pasteID) => {
    dispatch(removePaste(pasteID))
  }

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content)
      .then(() => toast.success('Copied to clipboard'))
      .catch(() => toast.error('Failed to copy'))
  }

  const filtered = pastes.filter(paste =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="w-full p-4 bg-neutral-800 font-mono rounded-b-2xl" style={{ height: '500px', overflowY: 'auto' }}>
      <div className="flex items-center gap-3 w-full mb-4">
        <input
          className="flex-grow p-3 rounded-xl  text-white outline-none placeholder-gray-400"
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchterm(e.target.value)}
        />
        <button
          onClick={removeall}
          className="px-4 py-2 text-red-600 bg-amber-50"
        >
          Reset
        </button>
      </div>

      <div className="flex flex-col gap-6 ">
        {filtered.length > 0 ? filtered.map((paste) => (
          <div key={paste.id} className="card p-5  rounded-xl text-white shadow-md">
            <h2 className="text-xl font-bold">{paste.title}</h2>
            <p className="mt-3 text-gray-300">
              {paste.content.split('\n')[0].slice(0, 100)}
              {paste.content.length > 100 && '...'}
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <button

                className='bg-green-500'
                onClick={() => navigate(`/pastes/${paste.id}`)}
              >
                View
              </button>

              <button

                className='bg-red-500'
                onClick={() => handleDelete(paste.id)}
              >
                Delete
              </button>

              <button

                className='bg-white text-black'
                onClick={() => handleCopy(paste.content)}
              >
                Copy
              </button>

              <button
                className='bg-blue-500'
                onClick={() => {
                  const shareUrl = `${window.location.origin}/pastes`;
                  console.log(window.location.origin)
                  navigator.clipboard.writeText(shareUrl)
                    .then(() => toast.success("Link copied to clipboard!"))
                    .catch(() => toast.success("Failed to copy link"));
                }}
              >
                Share
              </button>
            </div>

            <p className="mt-3 text-sm text-gray-400 text-right">
              Created: {new Date(paste.createdAt).toLocaleString()}
            </p>
          </div>
        )) : (
          <p className="text-gray-400 text-center font-bold font-mono">No pastes found</p>
        )}
      </div>
    </div>
  )
}

export default ViewPaste

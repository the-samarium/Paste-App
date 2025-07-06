import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createPaste, updatePaste, removePaste, resetPaste } from '../slices/Appslice';
import { Navigate } from 'react-router-dom';
const Paste = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pastes = useSelector((state) => state.paste.pastes);

  const currentPaste = pastes.find(paste => paste.id === id);

  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    if (currentPaste) {
      setTitle(currentPaste.title);
      setValue(currentPaste.content);
    }
  }, [currentPaste]);

  function createpaste() {
    const paste = {
      title,
      content: value,
      id: id || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };
    if (id) {
      dispatch(updatePaste(paste));
    } else {
      dispatch(createPaste(paste));
    }

    setTitle('');
    setValue('');
  }

  function removeall() {
    dispatch(resetPaste());
    setTitle('');
    setValue('');
  }

  function deletepaste() {
    dispatch(removePaste(id));
    setTitle('');
    setValue('');
  }

  return (
    <div className="w-full flex flex-col p-4 bg-neutral-900 rounded-b-2xl">
      <div className="flex flex-row gap-5 justify-between w-full mb-4">
        <input
          className="p-2 rounded-xl w-full"
          type="text"
          placeholder="Title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={createpaste}>{id ? 'Update' : 'Paste'}</button>
        <button onClick={removeall}>Reset</button>
        <button onClick={deletepaste}>Delete</button>
      </div>

      <textarea
        className="bg-neutral-900 rounded-xl p-2 w-full h-[400px] resize-none"
        value={value}
        placeholder="Enter content here"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Paste;

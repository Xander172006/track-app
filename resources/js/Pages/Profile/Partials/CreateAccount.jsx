import React from 'react';
import { useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

function CreateAccount({ success, error }) {
  const { data, setData, post, processing, errors } = useForm({
    username: ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    Inertia.post('/create-account', {
      username: data.username,
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col w-[15%]'>
        <input
          className='bg-gray-900 rounded-md text-gray-300'
          type="text"
          id='username'
          value={data.username}
          onChange={e => setData('username', e.target.value)}
        />
        <button type='submit' className='bg-orange-700 text-white p-2 rounded-lg w-[50%] my-2'>submit</button>
      </form>
    </div>
  );
}

export default CreateAccount;

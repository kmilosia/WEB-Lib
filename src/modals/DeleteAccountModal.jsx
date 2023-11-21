import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteAccount, resetState } from '../store/userSlice'

function DeleteAccountModal(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {success,error} = useSelector((state) => state.user)

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(deleteAccount())
  }
  useEffect(() => {
    if (success) {
      props.setDeleteModule(false)
      navigate('/dostep/logowanie')
      dispatch(resetState())
    }
  }, [success])

  return (
    <div className='fixed flex justify-center items-center top-0 right-0 w-full h-full z-100 bg-black/50'>
    <div className='bg-white px-10 py-10 rounded-md w-auto h-auto flex flex-col items-center justify-center dark:bg-midnight-800 mx-3 lg:mx-0'>
      <h1 className='text-xl font-semibold my-2 text-center lg:text-start'>Czy napewno chcesz usunąć konto?</h1>
      <p className='my-2 text-center w-full lg:w-3/4'>Konto zostanie dezaktywowane na 30 dni, a następnie zostanie permanentnie usunięte.</p>
      <div className='grid grid-cols-2 gap-3 my-2 w-full'>
        <button onClick={handleDelete} className='delete-button'>Usuń konto</button>
        <button onClick={() => props.setDeleteModule(false)} className='purple-button'>Anuluj</button>
      </div>
      {error && <p className='my-1 error-text'>{error}</p>}
    </div>
  </div>
  )
}

export default DeleteAccountModal

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BookModal from './BookModal'
import axiosClient from '../../utils/api/axiosClient'
import { getValidToken } from '../../utils/functions/getValidToken'

function RentedBooks() {
    const [rentedBooks, setRentedBooks] = useState([])
    const [isBookModal, setIsBookModal] = useState(false)
    const [propItem, setPropItem] = useState({})
    const handleBook = (item) => {
        const newItem = {
            id: item.bookItemId,
            title: item.bookTitle,
            imageURL: item.imageURL,
            fileFormatName: item.fileFormatName,
            expirationDate: item.expirationDate,
        }
        setPropItem(newItem)
        setIsBookModal(true)
    }
    const getRentedBooks = async () => {
        try {
            const token = getValidToken();
            const response = await axiosClient.get('/Rental/Rented-Ebooks', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            setRentedBooks(response.data)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getRentedBooks()
    },[])
    return (
    <>
    {rentedBooks.length > 0 ?
     <div className='grid grid-cols-2 lg:grid-cols-4 gap-5 my-5'>
     {rentedBooks.map((item,index) => {
         return (
             <button onClick={() => {handleBook(item)}} key={index} className='flex flex-col w-full h-auto px-5 py-5 items-center border border-gray-200 dark:border-midnight-800 rounded-md shadow-md hover:scale-105'>
                 <img src={item.imageURL} className='w-auto h-96 object-contain mb-2' />
                 <h1 className='text-lg font-semibold cursor-pointer text-center'>{item.bookTitle}</h1>
             </button>
         )
     })}
    </div>
    :
    <div className='flex flex-col justify-center items-center h-[60vh] lg:h-[70vh] mt-5'>
        <img src='https://iili.io/JuANuEu.png' className='h-36 w-auto object-contain mb-2' />
        <h2 className='font-semibold text-3xl text-center my-2'>Nie posiadasz żadnych wypożyczonych książek</h2>
        <p className='text-center my-1'>Przeglądaj ebooki i wypożyczaj aby mieć dostęp do czytelni</p>
        <Link to='/wypozyczalnia' className='rounded-purple-button mt-3'>Przejdź do wypożyczalni</Link>
    </div>
    }
    {isBookModal && <BookModal purchased={false} item={propItem} setIsBookModal={setIsBookModal}/>}
    </>
  )
}

export default RentedBooks
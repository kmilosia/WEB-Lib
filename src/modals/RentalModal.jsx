import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoClose } from "react-icons/io5";
import { closeRentalModal } from '../store/rentSlice';
import axiosClient from '../utils/api/axiosClient';
import { getValidToken } from '../utils/functions/getValidToken';
import { showMessage } from '../store/messageSlice';

function RentalModal() {
    const {rentalModal,rentProduct} = useSelector((state) => state.rent)
    const [types, setTypes] = useState([])
    const [paymentMethods, setPaymentMethods] = useState([])
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)
    const [selectedType, setSelectedType] = useState(null)  
    const [choosePayment, setChoosePayment] = useState(false)  
    const dispatch = useDispatch()
    const handleCloseModal = () => {
        dispatch(closeRentalModal())
        setSelectedType(null)
        setChoosePayment(false)
        setSelectedPaymentMethod(null)
    }
    const handleInputChange = (e) => {
        setSelectedType(e.target.value)
    }
    const handlePaymentChange = (e) => {
        setSelectedPaymentMethod(e.target.value)
    }
    const rentBook = async (data) => {
        try {
            const token = getValidToken();
            const response = await axiosClient.post('/Rental/New-Rental', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            if(response.status === 200){
                dispatch(showMessage({title: "Książka została wypożyczona!"}))
                handleCloseModal()
            }
            return response
        } catch (error) {
            console.error(error)
        }
    }
    const handleRentBook = () => {
        const today = new Date();
        const formattedDate = today.toISOString();
        const item = {
            bookItemID: rentProduct.id,
            paymentMethodID: Number(selectedPaymentMethod),
            rentalTypeID: Number(selectedType),
            startDate: formattedDate,
        }
        rentBook(item)
    }
    const handleNextStep = () => {
        if(selectedType){
            setChoosePayment(true)
        }
    }
    const getTypes = async () => {
        try{
            const response = await axiosClient.get('/RentalType')
            setTypes(response.data)
        }catch(err){
            console.error(err)
        }
    }
    const getPaymentMethods = async () => {
        try {
          const response = await axiosClient.get(`/PaymentMethod`)
          setPaymentMethods(response.data)
        } catch (err) {
          console.error(err)
        }
    }
    useEffect(() => {
        getTypes()
        getPaymentMethods()
      },[])
  return (
    rentalModal && (
    <div className='fixed z-[100000] top-0 left-0 w-screen h-screen bg-black/80 dark:text-white flex justify-center items-center lg:items-center'>
      <div className='w-full h-full max-h-full max-w-full lg:w-5/6 lg:max-w-5/6 lg:max-h-5/6 lg:h-auto grid grid-rows-[max-content_auto_max-content] py-5 px-10 bg-white dark:bg-midnight-800'>

        <div className='flex justify-between my-2 divide-border-bottom pb-2'>
            <h1 className='text-2xl font-medium'>Wypożycz</h1>
            <button onClick={handleCloseModal} className='text-2xl'><IoClose/></button>
        </div>

        {Object.keys(rentProduct).length > 0 &&
        <div className='grid grid-cols-[max-content_auto] gap-5 items-center h-full'>
            <img src={rentProduct.imageURL} className='w-auto h-80 object-contain rounded-md' />
            <div className='flex flex-col h-80 w-auto'>
                <h1 className='text-3xl font-semibold'>{rentProduct.title}</h1>
                <h2 className='text-xl font-light my-1'>{rentProduct.authors.map((item,index)=>{return(<span key={index}>{item.name} {item.surname}</span>)})}</h2>
                <h3 className='tex-xl font-semibold'>{rentProduct.fileFormat}</h3>
                {!choosePayment ? 
                <div className='flex flex-col mt-auto w-full'>
                <p className='my-2'>Wybierz czas wypożyczenia:</p>
                <div className='grid grid-cols-3 gap-3'>
                    {types && types.map((item,index) => {
                        return (
                        <div key={index} className='flex items-center justify-between w-full bg-white dark:bg-midnight-900 py-5 px-5 rounded-md'>
                            <label className='flex flex-col text-sm mr-5'>
                                <span>{item.name}</span>
                                <span className='font-semibold mt-1'>{item.price}zł</span>
                            </label>
                            <input type="radio" name="rentType" value={item.id} onChange={handleInputChange} />
                        </div>
                        )
                    })}
                    </div>
                </div>
                :
                <div className='flex flex-col mt-auto'>
                <p className='my-2'>Wybierz metodę płatności:</p>
                <div className='grid grid-cols-3 gap-3'>
                    {paymentMethods && paymentMethods.map((item,index) => {
                        return (
                        <div key={index} className='flex items-center justify-between w-full bg-white dark:bg-midnight-900 py-5 px-5 rounded-md'>
                            <label className='flex flex-col text-sm mr-5'>
                                <span>{item.name}</span>
                            </label>
                            <input type="radio" name="paymentMethod" value={item.id} onChange={handlePaymentChange} />
                        </div>
                        )
                    })}
                    </div>
                </div>
                }
            </div>
        </div>
        }
        <div className='w-full flex items-center justify-end mt-5 h-auto'>
            {!choosePayment ?
            <button onClick={handleNextStep} className='purple-button w-max'>Następny krok</button> :
            <>
            <button onClick={() => {setChoosePayment(false)}} className='purple-button w-max mr-2'>Wróć</button>
            <button onClick={handleRentBook} className='purple-button w-max'>Opłać i wypożycz książkę</button>
            </>
            }
        </div>
      </div>
    </div>
    )
  )
}

export default RentalModal
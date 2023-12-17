import React, { useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai';
import axiosClient from '../utils/api/axiosClient';
import {getValidToken} from '../utils/functions/getValidToken';
import { useDispatch } from 'react-redux';
import { showMessage } from '../store/messageSlice';

function ReviewModal({setIsReviewed, bookItemId}) {
    const dispatch = useDispatch()
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    const [textInput, setTextInput] = useState('')
    const [errors, setErrors] = useState({})
    const addReview = async (data) => {
        try {
            const token = getValidToken();
            const response = await axiosClient.post('/BookItemReview/Add-Review', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            if(response.status === 200){
                dispatch(showMessage({title: "Recenzja została dodana!"}))
                setIsReviewed(false)
            }
            return response
        } catch (error) {
            console.error(error)
        }
    }
    const handleInput = (e) => {
        setTextInput(e.target.value)
    }
    const handleAddReview = () => {
        let newErrors = {}
        if(textInput === ''){
            newErrors = { ...newErrors, input: 'Napisz swoją recenzję!' };
        }
        if(!rating){
            newErrors = { ...newErrors, rating: 'Oceń książkę!' };
        }
        setErrors(newErrors)
        if(Object.keys(newErrors).length === 0){
            const item = {
                content: textInput,
                scoreId: rating,
                bookItemId: bookItemId,
            }
            addReview(item)
        }
    }
  return (
    <div className='flex flex-col w-full mt-auto'>
        <p className='text-lg'>Oceń książkę</p>
        <div className='flex my-2'>
        {[...Array(5)].map((star,index) => {
            const currentRating = index + 1
            return(
                <label>
                    <input type='radio' name='rating' value={currentRating} onClick={() => {setRating(currentRating); console.log(currentRating);}} className='hidden'/>
                    <AiFillStar size={24}
                    className={`cursor-pointer ${(hover || rating) >= currentRating ? 'text-yellow-400' : 'text-gray-300'}`}        
                    onMouseEnter={() => {setHover(currentRating)}}
                    onMouseLeave={() => {setHover(null)}}
                    />
                </label>
            )
        })}
        </div>
        {errors.rating && <p className='error-text'>{errors.rating}</p>}
        <textarea rows={3} className='resize-none cursor-pointer my-1 form-input focus:border-purple-400' onChange={handleInput} placeholder='Napisz swoją recenzję...'/>
        {errors.input && <p className='error-text'>{errors.input}</p>}
        <div className='grid grid-cols-2 gap-3 mt-2'>
            <button onClick={handleAddReview} className='purple-button w-full'>Dodaj recenzję</button>
            <button onClick={() => {setIsReviewed(false)}} className='bordered-purple-button w-full'>Wróć</button>
        </div>
    </div>
  )
}

export default ReviewModal
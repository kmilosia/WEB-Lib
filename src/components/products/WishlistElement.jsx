import React, { useState } from 'react'
import TrashButton from '../buttons/TrashButton'
import { BsDot } from 'react-icons/bs'
import AvailabilityElement from '../page-elements/AvailabilityElement'
import TitleTooltip from '../elements/TitleTooltip';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AddToCartFromWishlistButton from '../buttons/AddToCartFromWishlistButton';
import { removeItem } from '../../store/wishlistSlice';

function WishlistElement({item}) {
  const dispatch = useDispatch()
  const [showText, setShowText] = useState(false)
  const handleRemove = () => {
    dispatch(removeItem(item))
  }
  return (
    <div className='flex flex-col px-5 py-3 border border-gray-200 dark:border-midnight-800 rounded-md lg:hover:scale-105 transition-all'>
      <div className='my-1 flex items-center justify-between mx-1'>
        <TrashButton onClick={handleRemove}/>
        <AvailabilityElement isAvailable={true}/>
      </div>
      <div className='my-3'>
        <img src={item.url} className='h-auto aspect-[3/4] w-full object-cover rounded-md' />
      </div>
      <h2 className='font-semibold text-sm my-1 cursor-default'>{item.author}</h2>
      <Link to={`/produkt/${item.id}`} className='relative' onMouseOver={() => {setShowText(true)}} onMouseLeave={() => {setShowText(false)}}><h1 className='font-semibold text-xl my-1 cursor-pointer truncated-text'>{item.title}</h1>{showText && <TitleTooltip title={item.title}/>}</Link>
      <div className='my-1 flex flex-row items-center text-gray-600 dark:text-gray-400 text-sm lg:text-xs 2xl:text-sm cursor-default'>
        <p>{item.form}</p>
        <BsDot className='text-xl'/>
        <p>{item.edition}</p>
      </div>
      <h3 className='font-semibold cursor-default text-3xl lg:text-xl 2xl:text-3xl my-1'>{item.price} zł</h3>
      <AddToCartFromWishlistButton item={item} />
    </div>
  )
}

export default WishlistElement

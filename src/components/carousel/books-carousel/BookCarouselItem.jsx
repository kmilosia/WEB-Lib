import React from 'react';
import Stars from '../../elements/Stars';
import { Link } from 'react-router-dom';
import AddToCartButton from '../../buttons/AddToCartButton'

function BookCarouselItem(props) {
  return (
    <Link to={`/produkt/${props.id}`} className='flex flex-col cursor-pointer lg:mx-2 lg:my-2 shadow-md bg-white hover:bg-gray-200 dark:bg-midnight-900 dark:hover:bg-midnight-800 rounded-md px-7 py-7 lg:px-5 lg:py-4 group'>
      <img src={props.url} className='w-full aspect-[3/4] object-cover rounded-md' />
      <div className="text-container">
        <h1 className='font-semibold mt-2 w-full h-6 overflow-hidden overflow-ellipsis'>
          {props.title}
        </h1>
        <p className='font-light text-sm'>{props.author}</p>
      </div>
      <Stars score={props.score} />
      <h2 className='font-semibold text-lg my-1'>{props.price}zł</h2>
      <AddToCartButton {...props}/>
    </Link>
  );
}

export default BookCarouselItem;

import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from '../../../utils/objects/carousel-settings';
import EbookCarouselItem from './EbookCarouselItem';
import { getFilteredBooks } from '../../../utils/api/bookItemsAPI';

function EbooksCarousel(props) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() =>{ 
    getFilteredBooks(props.filter, setBooks, setLoading)
  },[])
  return (
    <>
    <h1 className='carousel-header'>{props.title}</h1>
    {loading ? 
    <div className='bg-white dark:bg-midnight-900 animate-pulse w-full h-80 rounded-md'></div>
    :
    books.length > 0 &&
        <Slider {...settings}>
          {books.map((item, index) => {
              return (
                  <EbookCarouselItem key={index} item={item}/>
              )
          })}
    </Slider>
    }
    </>
    )
}

export default EbooksCarousel

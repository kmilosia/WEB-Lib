import React from 'react'
import { useState } from 'react'
import {FiArrowUpRight} from 'react-icons/fi'
import Carousel from 'react-grid-carousel'
import BookCarouselItem from '../components/page-elements/BookCarouselItem'
import LibraryBookCarouselItem from '../components/page-elements/LibraryBookCarouselItem'
import { Link } from 'react-router-dom'

function Library() {
  const [isRented, setIsRented] = useState(true)
  return (
    <div className='default-page-wrapper'>
    <div className='flex flex-col'>
    <div className='grid grid-cols-2 gap-10 px-10 pt-10'>
        <div className='flex flex-col'>
            <h1 className='text-3xl font-semibold text-midnight-700 dark:text-white my-3'>Kontynuuj czytanie..</h1>
            <p className='my-3 font-medium text-midnight-700 dark:text-white'>Zanurz się w opowieści na nowo i pozwól odpłynąć razem w twoją ulubioną lekturą.</p>
            <button className='flex flex-row font-medium items-center my-3 justify-center rounded-3xl text-sm bg-midnight-800 text-white dark:bg-orange-400 dark:hover:bg-orange-500 px-4 py-2 w-1/3 hover:bg-midnight-950'>Kontynuuj<FiArrowUpRight className='text-lg opacity-80'/></button>
        </div>
        <div className='flex flex-col'>
            <h1 className='font-semibold text-xl my-3 cursor-default'>Harry Potter i Czara Ognia</h1>
            <Link className='font-medium text-midnight-500'>J.K. Rowling</Link>
            <p className='my-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas nesciunt adipisci quam officia hic, molestias sit vel blanditiis obcaecati eligendi praesentium ipsa exercitationem mollitia temporibus maxime repudiandae! Perferendis, voluptates porro.</p>

        </div>
    </div>
    <div className='flex mb-5'>
        <Carousel gap={1} cols={4}>
            <Carousel.Item>
            <LibraryBookCarouselItem title="Harry Potter i Czara Ognia" url="https://images.ctfassets.net/usf1vwtuqyxm/3d9kpFpwHyjACq8H3EU6ra/85673f9e660407e5e4481b1825968043/English_Harry_Potter_4_Epub_9781781105672.jpg?w=914&q=70&fm=jpg" />
            </Carousel.Item>
            <Carousel.Item>
            <LibraryBookCarouselItem title="Harry Potter i Czara Ognia" url="https://images.ctfassets.net/usf1vwtuqyxm/3d9kpFpwHyjACq8H3EU6ra/85673f9e660407e5e4481b1825968043/English_Harry_Potter_4_Epub_9781781105672.jpg?w=914&q=70&fm=jpg" />
            </Carousel.Item>
            <Carousel.Item>
            <LibraryBookCarouselItem title="Harry Potter i Czara Ognia" url="https://images.ctfassets.net/usf1vwtuqyxm/3d9kpFpwHyjACq8H3EU6ra/85673f9e660407e5e4481b1825968043/English_Harry_Potter_4_Epub_9781781105672.jpg?w=914&q=70&fm=jpg" />
            </Carousel.Item>
            <Carousel.Item>
            <LibraryBookCarouselItem title="Harry Potter i Czara Ognia" url="https://images.ctfassets.net/usf1vwtuqyxm/3d9kpFpwHyjACq8H3EU6ra/85673f9e660407e5e4481b1825968043/English_Harry_Potter_4_Epub_9781781105672.jpg?w=914&q=70&fm=jpg" />
            </Carousel.Item>
            <Carousel.Item>
            <LibraryBookCarouselItem title="Harry Potter i Czara Ognia" url="https://images.ctfassets.net/usf1vwtuqyxm/3d9kpFpwHyjACq8H3EU6ra/85673f9e660407e5e4481b1825968043/English_Harry_Potter_4_Epub_9781781105672.jpg?w=914&q=70&fm=jpg" />
            </Carousel.Item>
            <Carousel.Item>
            <LibraryBookCarouselItem title="Harry Potter i Czara Ognia" url="https://images.ctfassets.net/usf1vwtuqyxm/3d9kpFpwHyjACq8H3EU6ra/85673f9e660407e5e4481b1825968043/English_Harry_Potter_4_Epub_9781781105672.jpg?w=914&q=70&fm=jpg" />
            </Carousel.Item>
        </Carousel>
    </div>
    </div>
    </div>
  )
}

export default Library

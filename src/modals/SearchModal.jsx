import React from 'react'
import {IoSearch} from 'react-icons/io5'

function SearchModal() {
  return (
    <div className='absolute z-50 w-max bottom-[-6.5rem] right-2 px-5 py-5 rounded-md flex flex-col items-center justify-center shadow-lg bg-white dark:bg-midnight-800'>
      <form>   
        <div class="relative w-96">
          <input id="search" class="block w-full p-2.5 pl-4 pr-[7rem] text-sm text-midnight-900 border-2 border-gray-200 rounded-3xl bg-gray-50 dark:bg-midnight-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white" placeholder="Szukaj książek" required/>
          <button type="submit" class="text-white absolute right-1 bottom-1 flex items-center bg-purple-500 hover:bg-purple-600 no-ring focus:outline-none font-medium rounded-3xl text-sm px-5 py-2">Szukaj<IoSearch className='ml-1' /></button>
        </div>
      </form>
    </div>
  )
}

export default SearchModal
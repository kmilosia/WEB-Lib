import axiosClient from "./axiosClient"

export const getBooksCarousel = async (setData, setLoading) => {
    try{
        const response = await axiosClient.get('/BookItems/Infinite-Carousel-Books')
        setData(response.data)
        setLoading(false)
    }catch(err){
        console.error(err)
    }
  }
 export const getEbooksCarousel = async (setData, setLoading) => {
    try{
        const response = await axiosClient.get('/BookItems/Infinite-Carousel-EBooks')
        setData(response.data)
        setLoading(false)
    }catch(err){
        console.error(err)
    }
  }

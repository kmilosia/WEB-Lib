import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCities, getCountries } from '../../utils/api/dictionaryAPI'
import { addressValidate } from '../../utils/validation/addressValidation'
import { setInvoiceAddress } from '../../store/checkoutSlice'
import { fetchUserAddressCheckout } from '../../utils/api/userAPI'

function InvoiceAddress() {
    const dispatch = useDispatch()
    const {invoiceAddress} = useSelector((state) => state.checkout)
    const [cities, setCities] = useState([])
    const [countries, setCountries] = useState([])
    const [userAddress, setUserAddress] = useState(null)
    const [addNew, setAddNew] = useState(null)
    const [edit, setEdit] = useState(false)
    const [errors, setErrors] = useState({})
    const [submit, setSubmit] = useState(false)
    const [data, setData] = useState({
        street: '',
        streetNumber: '',
        houseNumber: '',
        postcode: '',
        cityID: '',
        cityName: '',
        countryID: '',
        countryName: ''
      })
      const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
      }
      const handleCityChange = (e) => {
        const selectedCityId = e.target.value;
        const selectedCity = cities.find(city => city.id === Number(selectedCityId));
        setData(prevData => ({
            ...prevData,
            cityID: selectedCityId,
            cityName: selectedCity ? selectedCity.name : ''
        }));
    };
      useEffect(() => {
        getCities(setCities)
        getCountries(setCountries)
        fetchUserAddressCheckout(setUserAddress)
      },[])
      useEffect(() => {
        if(userAddress && userAddress.length > 0){
            const data = {
                street: userAddress[1].street,
                streetNumber: userAddress[1].streetNumber,
                houseNumber: userAddress[1].houseNumber ? userAddress[1].houseNumber : '',
                postcode: userAddress[1].postcode,
                cityID: userAddress[1].cityID,
                cityName: userAddress[1].cityName,
                countryID: userAddress[1].countryID,
                countryName: userAddress[1].countryName,
                addressTypeID: 3
            }
            dispatch(setInvoiceAddress(data))
        }
      },[userAddress])
      const handleAddNew = () => {
        setErrors(addressValidate(data))
        setSubmit(true)
      }
      useEffect(() => {
        if(Object.keys(errors).length === 0 && submit){
            const newData = {
                street: data.street,
                streetNumber: data.streetNumber,
                postcode: data.postcode,
                cityID: Number(data.cityID),
                cityName: data.cityName,
                countryID: data.countryID,
                countryName: data.countryName,
                addressTypeID: 3
            }
            if(data.houseNumber !== ''){
                newData.houseNumber = data.houseNumber
            }
            dispatch(setInvoiceAddress(newData))
            setAddNew(false)
            setEdit(false)
        }
      },[submit,errors])
      useEffect(() => {
        if(cities.length > 0){
            setData(prev => ({
                ...prev,
                cityID: cities[0].id,
                cityName: cities[0].name
            }))
        }
        if(countries.length > 0){
            setData(prev => ({
                ...prev,
                countryID: countries[0].id,
                countryName: countries[0].name
            }))
        }
      },[cities, countries])
  return (
    <div className='flex flex-col border-t mt-4 border-gray-200 dark:border-midnight-800'>
        <h3 className='font-semibold text-2xl mt-4 mb-2'>Adres faktury</h3>
        {(invoiceAddress && !edit && !addNew) && 
        <div className='grid grid-cols-2 gap-5'>
            <div className='flex flex-row items-center justify-between w-full bg-white dark:bg-midnight-800 py-5 px-5 rounded-md mb-4'>
            <div className='flex flex-col w-full'>
                <p>{invoiceAddress.street} {invoiceAddress.streetNumber} {invoiceAddress?.houseNumber && '/ ' + invoiceAddress.houseNumber}</p>
                <p>{invoiceAddress.postcode} {invoiceAddress.cityName}</p>
                <p>{invoiceAddress.countryName}</p>
            </div>
            <div className='flex'>
                <button onClick={() => {setData(invoiceAddress);setEdit(true)}} className='text-purple-400 hover:text-purple-500 whitespace-nowrap'>Edytuj adres</button>
            </div>
            </div>
            <button onClick={() => {setAddNew(true)}} className='flex flex-row items-center justify-center w-full h-auto bg-white dark:bg-midnight-800 rounded-md mb-4 hover:bg-gray-100 hover:dark:bg-midnight-700'>Dodaj nowy adres faktury</button>
        </div>
        }
        {(!invoiceAddress && !edit && !addNew) &&
            <button onClick={() => {setAddNew(true)}} className='flex flex-row items-center justify-center w-1/2 py-10 h-auto bg-white dark:bg-midnight-800 rounded-md mb-4 hover:bg-gray-100 hover:dark:bg-midnight-700'>Dodaj nowy adres faktury</button>
        }
        {addNew &&
        <div className='flex flex-col'>
         <form>
         <div className='lg:grid flex flex-col lg:grid-cols-2 gap-2'>
             <div className='flex flex-col col-span-2'>
                 <label htmlFor='street' className='label-input text-base'>Ulica</label>
                 <input onChange={handleChange} name='street' type='text' className='form-input text-sm' placeholder='Ulica'/>
                 {errors?.street && <p className='error-text'>{errors?.street}</p>}
             </div>
             <div className='flex flex-col'>
                 <label htmlFor='streetNumber' className='label-input text-base'>Numer ulicy</label>
                 <input onChange={handleChange} name='streetNumber' type='text' className='form-input text-sm' placeholder='Numer ulicy'/>
                 {errors?.streetNumber && <p className='error-text'>{errors?.streetNumber}</p>}
             </div>
             <div className='flex flex-col'>
                 <label htmlFor='houseNumber' className='label-input text-base'>Numer domu</label>
                 <input onChange={handleChange} name='houseNumber' type='text' className='form-input text-sm' placeholder='Numer domu'/>
             </div>
             <div className='flex flex-col col-span-2'>
                 <label htmlFor='postcode' className='label-input text-base'>Kod pocztowy</label>
                 <input onChange={handleChange} name='postcode' type='text' className='form-input text-sm' placeholder='Kod pocztowy'/>
                 {errors?.postcode && <p className='error-text'>{errors?.postcode}</p>}
             </div>
             <div className='flex flex-col'>
                 <label htmlFor='city' className='label-input text-base'>Miasto</label>
                 <select onChange={handleCityChange} name='cityID' className='form-input text-sm'>
                 {cities && cities.map((item,index) => {
                     return (
                     <option key={index} value={item.id}>{item.name}</option>
                     )
                 })}
                 </select>
             </div>
             <div className='flex flex-col'>
                 <label htmlFor='country' className='label-input text-base'>Kraj</label>
                 <input disabled name='country' type='text' className='form-input text-sm' placeholder='Kraj' value={countries[0].name}/>
             </div>
         </div>
        </form>
        <div className='flex flex-row mt-4'>
            <button className='purple-button mr-2' onClick={() => handleAddNew()}>Dodaj adres</button>
            <button className='cancel-button' onClick={() => setAddNew(false)}>Anuluj</button>
        </div>
        </div>
        } 
        {edit &&
        <div className='flex flex-col'>
         <form>
         <div className='lg:grid flex flex-col lg:grid-cols-2 gap-2'>
             <div className='flex flex-col col-span-2'>
                 <label htmlFor='street' className='label-input text-base'>Ulica</label>
                 <input onChange={handleChange} name='street' type='text' className='form-input text-sm' value={data.street} placeholder='Ulica'/>
                 {errors?.street && <p className='error-text'>{errors?.street}</p>}
             </div>
             <div className='flex flex-col'>
                 <label htmlFor='streetNumber' className='label-input text-base'>Numer ulicy</label>
                 <input onChange={handleChange} name='streetNumber' type='text' className='form-input text-sm' value={data.streetNumber} placeholder='Numer ulicy'/>
                 {errors?.streetNumber && <p className='error-text'>{errors?.streetNumber}</p>}
             </div>
             <div className='flex flex-col'>
                 <label htmlFor='houseNumber' className='label-input text-base'>Numer domu</label>
                 <input onChange={handleChange} name='houseNumber' type='text' className='form-input text-sm' value={data.houseNumber} placeholder='Numer domu'/>
             </div>
             <div className='flex flex-col col-span-2'>
                 <label htmlFor='postcode' className='label-input text-base'>Kod pocztowy</label>
                 <input onChange={handleChange} name='postcode' type='text' className='form-input text-sm' value={data.postcode} placeholder='Kod pocztowy'/>
                 {errors?.postcode && <p className='error-text'>{errors?.postcode}</p>}
             </div>
             <div className='flex flex-col'>
                 <label htmlFor='city' className='label-input text-base'>Miasto</label>
                 <select onChange={handleCityChange} name='cityID' value={data.cityID} className='form-input text-sm'>
                 {cities && cities.map((item,index) => {
                     return (
                     <option key={index} value={item.id}>{item.name}</option>
                     )
                 })}
                 </select>
             </div>
             <div className='flex flex-col'>
                 <label htmlFor='country' className='label-input text-base'>Kraj</label>
                 <input disabled name='country' type='text' className='form-input text-sm' placeholder='Kraj' value={countries[0].name}/>
             </div>
         </div>
        </form>
        <div className='flex flex-row mt-4'>
            <button className='purple-button mr-2' onClick={() => handleAddNew()}>Edytuj adres</button>
            <button className='cancel-button' onClick={() => setEdit(false)}>Anuluj</button>
        </div>
        </div>
        } 
    </div>
  )
}

export default InvoiceAddress

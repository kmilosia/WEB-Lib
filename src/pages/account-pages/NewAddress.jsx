import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addressValidate, addressesValidate } from '../../utils/validation/addressValidation'
import { addUserAddress, resetState } from '../../store/userSlice'
import { showMessage } from '../../store/messageSlice'
import { getCities, getCountries } from '../../utils/api/dictionaryAPI'
import Spinner from '../../components/elements/Spinner'

function NewAddress({handleAfterAddedNewAddress}) {
  const {success, loading} = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [errors,setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [sameAddress, setSameAddress] = useState(true)
  const [cities, setCities] = useState([])
  const [countries, setCountries] = useState([])
  const [userAddress, setUserAddress] = useState({
    street: '',
    streetNumber: '',
    houseNumber: '',
    postcode: '',
    selectedCity: 1,
    selectedCountry: 1,
  })
  const [mailingAddress, setMailingAddress] = useState({
    mailingStreet: '',
    mailingStreetNumber: '',
    mailingHouseNumber: '',
    mailingPostcode: '',
    selectedMailingCity: 1,
    selectedMailingCountry: 1,
  })
  const handleChange = (e) => {
    setUserAddress({ ...userAddress, [e.target.name]: e.target.value });
  }
  const handleMailingChange = (e) => {
    setMailingAddress({ ...mailingAddress, [e.target.name]: e.target.value });
  }
  const handleSelectedCity = (selectedCityId) => {
    setUserAddress({ ...userAddress, selectedCity: Number(selectedCityId) });
  };

  const handleSelectedMailingCity = (selectedMailingCityId) => {
    setMailingAddress({ ...mailingAddress, selectedMailingCity: Number(selectedMailingCityId) });
  };
  const handleCheckboxChange = () => {
    setSameAddress(!sameAddress)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    if(sameAddress){
      setErrors(addressValidate(userAddress))
    }else{
      setErrors(addressesValidate(userAddress,mailingAddress))
    }
  }
  const finishSubmit = () => {
    let data = {}
    if(sameAddress){
    data = {
      "address": {
        "street": userAddress.street,
        "streetNumber": userAddress.streetNumber,
        "postcode": userAddress.postcode,
        "cityID": userAddress.selectedCity,
        "countryID": userAddress.selectedCountry,
        "addressTypeID": 1
      },"mailingAddress": {
        "street": userAddress.street,
        "streetNumber": userAddress.streetNumber,
        "postcode": userAddress.postcode,
        "cityID": userAddress.selectedCity,
        "countryID": userAddress.selectedCountry,
        "addressTypeID": 2
      }
    }
    if(userAddress.houseNumber !== ''){
      data.address.houseNumber = userAddress.houseNumber
      data.mailingAddress.houseNumber = userAddress.houseNumber
    }
  }else{
      data = {
        "address": {
          "street": userAddress.street,
          "streetNumber": userAddress.streetNumber,
          "postcode": userAddress.postcode,
          "cityID": userAddress.selectedCity,
          "countryID": userAddress.selectedCountry,
          "addressTypeID": 1
        },
        "mailingAddress": {
          "street": mailingAddress.mailingStreet,
          "streetNumber": mailingAddress.mailingStreetNumber,
          "postcode": mailingAddress.mailingPostcode,
          "cityID": mailingAddress.selectedMailingCity,
          "countryID": mailingAddress.selectedMailingCountry,
          "addressTypeID": 2
        }
      }
      if(userAddress.houseNumber !== ''){
        data.address.houseNumber = userAddress.houseNumber
      }
      if(mailingAddress.houseNumber !== ''){
        data.mailingAddress.houseNumber = mailingAddress.houseNumber
      }
    }
    dispatch(addUserAddress(data))
  }
  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit()
    }
  }, [errors])
  useEffect(() => {
    if (success) {
      dispatch(resetState())
      dispatch(showMessage({title: "Adres został dodany!"}))
      handleAfterAddedNewAddress()
    }
  }, [success])
  useEffect(() => {
    getCities(setCities)
    getCountries(setCountries)
  },[])
  return (
    <form onSubmit={handleSubmit}>
    <div className='lg:grid flex flex-col lg:grid-cols-2 gap-3'>
      <div className='flex flex-col col-span-2'>
        <label htmlFor='street' className='label-input'>Ulica</label>
        <input onChange={handleChange} id='street' name='street' type='text' className='form-input' placeholder='Ulica'/>
        {errors.street && <p className='error-text'>{errors.street}</p>}
      </div>
      <div className='flex flex-col'>
        <label htmlFor='streetNumber' className='label-input'>Numer ulicy</label>
        <input onChange={handleChange} id='streetNumber' name='streetNumber' type='text' className='form-input' placeholder='Numer ulicy'/>
        {errors.streetNumber && <p className='error-text'>{errors.streetNumber}</p>}
      </div>
      <div className='flex flex-col'>
        <label htmlFor='houseNumber' className='label-input'>Numer domu</label>
        <input onChange={handleChange} id='houseNumber' name='houseNumber' type='text' className='form-input' placeholder='Numer domu'/>
      </div>
      <div className='flex flex-col col-span-2'>
        <label htmlFor='postcode' className='label-input'>Kod pocztowy</label>
        <input onChange={handleChange} id='postcode' name='postcode' type='text' className='form-input' placeholder='Kod pocztowy'/>
        {errors.postcode && <p className='error-text'>{errors.postcode}</p>}
      </div>
      <div className='flex flex-col'>
        <label htmlFor='city' className='label-input'>Miasto</label>
        <select onChange={(e) => handleSelectedCity(e.target.value)} id='city' name='city' className='form-input'>
          {cities && cities.map((item,index) => {
            return (
              <option key={index} value={item.id}>{item.name}</option>
            )
          })}
        </select>
      </div>
      <div className='flex flex-col'>
        <label htmlFor='country' className='label-input'>Kraj</label>
        <select disabled id='country' name='country' className='form-input'>
        {countries && countries.map((item,index) => {
            return (
              <option key={index} value={item.id}>{item.name}</option>
            )
          })}
        </select>
      </div>
    </div>
    <div className="filter-element-wrapper my-4">
        <input name="sameAddress" type="checkbox" checked={sameAddress} onChange={handleCheckboxChange} className="filter-checkbox"/>
        <label htmlFor="sameAddress" className="filter-element-label">Adres korespondecyjny taki sam jak adres zamieszkania</label>
    </div>
    {!sameAddress &&
    <>
      <h1 className='text-xl mb-3 font-semibold text-center lg:text-start'>Adres korespondecyjny</h1>
      <div className='lg:grid flex flex-col lg:grid-cols-2 gap-3'>
      <div className='flex flex-col col-span-2'>
        <label htmlFor='mailingStreet' className='label-input'>Ulica</label>
        <input onChange={handleMailingChange} id='mailingStreet' name='mailingStreet' type='text' className='form-input' placeholder='Ulica'/>
        {errors.mailingStreet && <p className='error-text'>{errors.mailingStreet}</p>}
      </div>
      <div className='flex flex-col'>
        <label htmlFor='mailingStreetNumber' className='label-input'>Numer ulicy</label>
        <input onChange={handleMailingChange} id='mailingStreetNumber' name='mailingStreetNumber' type='text' className='form-input' placeholder='Numer ulicy'/>
        {errors.mailingStreetNumber && <p className='error-text'>{errors.mailingStreetNumber}</p>}
      </div>
      <div className='flex flex-col'>
        <label htmlFor='mailingHouseNumber' className='label-input'>Numer domu</label>
        <input onChange={handleMailingChange} id='mailingHouseNumber' name='mailingHouseNumber' type='text' className='form-input' placeholder='Numer domu'/>
      </div>
      <div className='flex flex-col col-span-2'>
        <label htmlFor='mailingPostcode' className='label-input'>Kod pocztowy</label>
        <input onChange={handleMailingChange} id='mailingPostcode' name='mailingPostcode' type='text' className='form-input' placeholder='Kod pocztowy'/>
        {errors.mailingPostcode && <p className='error-text'>{errors.mailingPostcode}</p>}
      </div>
      <div className='flex flex-col'>
        <label htmlFor='mailingCity' className='label-input'>Miasto</label>
        <select onChange={(e) => handleSelectedMailingCity(e.target.value)} id='mailingCity' name='mailingCity' className='form-input'>
          {cities && cities.map((item,index) => {
            return (
              <option key={index} value={item.id}>{item.name}</option>
            )
          })}
        </select>
      </div>
      <div className='flex flex-col'>
        <label htmlFor='mailingCountry' className='label-input'>Kraj</label>
        <select disabled id='mailingCountry' name='mailingCountry' className='form-input'>
        {countries && countries.map((item,index) => {
            return (
              <option key={index} value={item.id}>{item.name}</option>
            )
          })}
        </select>
      </div>
    </div>
    </>
    }
     <button type='submit' className='purple-button w-max mt-4'>
        {loading ?
        <Spinner /> : <span>Akceptuj</span>
        }
    </button>
  </form> 
  )
}

export default NewAddress

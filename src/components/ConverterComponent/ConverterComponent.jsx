import React,{ useEffect, useState } from  "react"
import './ConverterComponent.css'
import axios from "axios"

const ConverterComponent = () => {
    const currencyUnits = []
    const [currency, setCurrency] = useState([]) 
    const [input, setInput] = useState({
      currencyValueToBeConverted:'',
      convertedCurrencyValue: '',
      concurrencyUnitToBeConverted:'USD',
      convertedCurrencyUnit:'INR'
    })
    
    const handleConvert = async() => {
        axios
            .post(`http://localhost:3500/api/v1/convert/${input.concurrencyUnitToBeConverted}/${input.convertedCurrencyUnit}`,{
                currencyValueToBeConverted: input.currencyValueToBeConverted
              })
              .then(response => setInput({ ...input,  convertedCurrencyValue: response.data.result.toFixed(5) }))
              .catch((error) => {
                console.log(error.response)
                alert(`Status : ${error.response.status} - ${error.response.statusText}`)
            })

    } 
  
    useEffect(() => {
        axios
        .get(`http://localhost:3500/api/v1/currency`)
        .then(response => {
            const responseData = response.data
            responseData.map(iterator=> currencyUnits.push(iterator.code))
            setCurrency(currencyUnits)
        })
        .catch((error) => {
            alert(`Status : ${error.response.status} - ${error.response.statusText}`)
        }) 
    }, []) 
  
  
    useEffect(() => {
      if (input.currencyValueToBeConverted) {
        handleConvert() 
      }
    }, [input.convertedCurrencyUnit]) 
  
    return (
        <React.Fragment>
        <div className='master'>
          <div className='user-input'>
            <div className='title'>
              From:
              <select
                className='select'
                value={input.concurrencyUnitToBeConverted}
                onChange={(event) => {
                  setInput({ ...input, concurrencyUnitToBeConverted: event.target.value }) 
                }}
              >
                {currency?.map((item, itemIndex) => {
                  return <option key={itemIndex}>{item}</option> 
                })}
              </select>
            </div>
              <input
                className='input'
                value={input.currencyValueToBeConverted}
                placeholder='Enter the currency value to be converted'
                onChange={(event) => {
                  setInput({ ...input,  currencyValueToBeConverted: event.target.value }) 
                }}
                type='number'
              />
          </div>
          <div className='user-input'>
            <div className='title'>
              To:
              <select
                className='select'
                value={input.convertedCurrencyUnit}
                onChange={(event) => {
                  setInput({ ...input,  convertedCurrencyUnit: event.target.value }) 
                }}
              >
                {currency?.map((item, itemIndex) => {
                  return <option key={itemIndex}>{item}</option> 
                })}
              </select>
            </div>
            <input
              className='input'
              value={input.convertedCurrencyValue}
              placeholder='Find the converted currency value here'
              disabled
              onChange={(event) => {
                setInput({ ...input,  convertedCurrencyValue: event.target.value }) 
              }}
              type='text'
            />
          </div>
        </div>
        <div className='button-container'>
          <button onClick={handleConvert}>Convert</button>
        </div>
        </React.Fragment>
    ) 
}

export default ConverterComponent
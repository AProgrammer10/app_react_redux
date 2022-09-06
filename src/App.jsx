import React from 'react'
import './App.css'
import {useDispatch, useSelector} from 'react-redux'
import {addCustomerAction, removeCustomersAction} from './store/customerReducer'
import {fetchCustomers} from './asyncActions/customers'

function App(){
  const dispatch = useDispatch()
  const cash = useSelector(state => state.cash.cash)
  const customers = useSelector(state => state.customerReducer.customers)

  const addCash = value => {
    dispatch({type: 'ADD_CASH', payload: value})
  }

  const getCash = value => {
    dispatch({type: 'GET_CASH', payload: value})
  }

  const addCustomer = name => {
    const customer = {
      name,
      id: Date.now()
    }
    dispatch(addCustomerAction(customer))
  }

  const removeCustomer = (customer) => {
    dispatch(removeCustomersAction(customer.id))
  }

  return (
    <div className='app'>
      <h1 style={{textAlign:'center'}}>{cash}</h1>
      <div style={{display:'flex', justifyContent:'center'}}>
        <button onClick={() => addCash(Number(prompt()))}>ADD CASH</button>
        <button onClick={() => getCash(Number(prompt()))}>GET_CASH</button>
        <button onClick={() => addCustomer(prompt())}>Add customer</button>
        <button onClick={() => dispatch(fetchCustomers())}>Get customers</button>
      </div>
      <h2 style={{textAlign:'center', color:'red'}}>Сlick on name to delete</h2>
      {
        customers.length > 0 ?
          <div style={{fontSize:'2rem', marginTop:20, textAlign:'center', border:'1px solid teal'}}>
            {customers.map(customer =>
                <div key={customer.id} style={{cursor:'pointer'}}
                  onClick={() => removeCustomer(customer)}
                >{customer.name}</div>
            )}
          </div>
          :
          <div style={{fontSize:'2rem', marginTop:20, textAlign:'center'}}>No customers</div>
      }
    </div>
  )
}


export default App
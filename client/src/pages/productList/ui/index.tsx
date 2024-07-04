import { useEffect, useState } from 'react'
import { ProductItem } from '../../../entities/productItem'
import styles from './ProductList.module.scss'
import { useTelegram } from '../../../shared/hooks/useTelegram'
import axios from 'axios'



export interface IProduct {
  id: number,
  title: string,
  price: number,
  description: string
}




export const ProductList = () => {
  const [totalPrice, setTotalPice] = useState<number>()
  const [addedItems, setAddedItems] = useState<IProduct[]>([])
  const {tg, queryId} = useTelegram()

  const getTotalPrice = (items: IProduct[])=> {
    return items.reduce((sum, item)=> sum += item.price, 0)
}


const sendData = ()=> {
    const data = {
      products: addedItems,
      totalPrice,
      queryId
    }
   
    axios('http://localhost:5000/bot', {
      method: 'POST',
      data
    })
  
  
}

useEffect(()=> {
    
  tg.onEvent('mainButtonClicked', sendData)
  return ()=> tg.offEvent('mainButtonClicked', sendData)

},[totalPrice])

  const onAdd = (product: any)=> {
    const alreadyAdded = addedItems.find(item=> item.id === product.id)
    let newItems = []
    if(alreadyAdded) {
      newItems = addedItems.filter(item => item.id !== product.id)
    } else {
      newItems = [...addedItems, product]
    }
    setAddedItems(newItems)
  }

  useEffect(()=> {
    const price = getTotalPrice(addedItems)
    if(addedItems.length === 0) {
      tg.MainButton.hide()
    } else {
      tg.MainButton.show()
      tg.MainButton.setParams({
        text: `Купить ${totalPrice}`
      })
    }
    setTotalPice(price)
  },[addedItems, totalPrice])

  
  const products = [
    {id: 1, title: 'Product 1', price: 8000, description: 'Green pants with pokets'},
    {id: 2, title: 'Product 2', price: 8000, description: 'Green pants with pokets'},
    {id: 3, title: 'Product 3', price: 8000, description: 'Green pants with pokets'},
    {id: 4, title: 'Product 4', price: 8000, description: 'Green pants with pokets'},
    {id: 5, title: 'Product 5', price: 8000, description: 'Green pants with pokets'},
    {id: 6, title: 'Product 6', price: 8000, description: 'Green pants with pokets'},
    {id: 7, title: 'Product 7', price: 8000, description: 'Green pants with pokets'},
    {id: 8, title: 'Product 8', price: 8000, description: 'Green pants with pokets'},
  ]

  return (
    <div className={styles.root} >
      <div className={styles.productsHolder} >
        {products?.map((item)=> (
          <ProductItem
          key={item.id}
          product={item}
          onAdd={onAdd}
          />
        ))}
      </div>
    </div>
  )
}

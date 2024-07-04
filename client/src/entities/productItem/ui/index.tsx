import { FC } from 'react'
import Button from '../../../shared/ui/button'
import styles from './ProductItem.module.scss'
import { IProduct } from '../../../pages/productList/ui'


interface IProps {
    product: IProduct,
    onAdd: (poduct: IProduct)=> void
}

export const ProductItem: FC<IProps> = ({product, onAdd}) => {

    const handleAdd = ()=> {
        onAdd(product)
    }

  return (
    <div className={styles.root} >
        <div className={styles.img} ></div>
        <div className={styles.title} >{product.title}</div>
        <div className={styles.description} >{product.description}</div>
        <div className={styles.price} >
            <span>Стоимость: <b>{product.price}</b></span>
        </div>
        <Button className={styles.addBtn} onClick={handleAdd} >Добавить в корзину</Button>
    
    </div>
  )
}

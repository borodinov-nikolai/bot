import styles from './Header.module.scss'
import Button from '../../../shared/ui/button'
import { useEffect } from 'react'
import { useTelegram } from '../../../shared/hooks/useTelegram'



export const Header = () => {
  const {onClose, user} = useTelegram()



  
  return (
    <header className={styles.root} >
        <Button onClick={onClose} className={styles.btn} >Закрыть</Button>
        <span className={styles.username} >
          {user?.username}
        </span>
    </header>
  )
}


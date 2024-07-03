import styles from './Header.module.scss'
import Button from '../button'



const Header = () => {
  return (
    <header className={styles.root} >
        <Button>Закрыть</Button>
    </header>
  )
}

export default Header
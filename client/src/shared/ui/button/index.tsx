import styles from './Button.module.scss'


const Button = (props:any) => {
  return (
    <button {...props} className={styles.root + " " + props.className} />
  )
}

export default Button
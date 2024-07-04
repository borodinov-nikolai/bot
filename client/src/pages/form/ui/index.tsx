import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './Form.module.scss'
import { useTelegram } from '../../../shared/hooks/useTelegram'
import { useCallback, useEffect, useState } from 'react'


interface IForm {
  country: string,
  street: string,
  person: 'phisical'|'legal'
}


export const Form = () => {
  const [word, setWord] = useState ('')
  const {tg} = useTelegram()
  const {register, watch, handleSubmit} = useForm<IForm>({
   defaultValues: {
    country: '',
    street: '',
    person: 'phisical'
   }
  })
  const {country, street, person} = watch()
  
  const onSubmit: SubmitHandler<IForm> = (data)=> {

    tg.sendData(JSON.stringify(data))
}

  useEffect(()=> {
    
    tg.onEvent('mainButtonClicked', handleSubmit(onSubmit))
    return ()=> tg.offEvent('mainButtonClicked', handleSubmit(onSubmit))

  },[])
 
useEffect(()=> {
  tg.MainButton.setParams({
    text: 'Отправить данные'
  })
}, [])


useEffect(()=> {
  if(!country || !street) {
    tg.MainButton.hide()
  } else {
    tg.MainButton.show()
  }
},[country, street])


  return (
    <form  className={styles.root} >
      <h1>Введите данные</h1>
      <div>{word}</div>
      <div className={styles.formItem} >
        <label htmlFor="country">Страна</label>
        <input {...register('country')} type='text' id='country'/>
      </div>
      <div className={styles.formItem} >
        <label htmlFor="street">Улица</label>
        <input {...register('street')} type='text' id='street'/>
      </div>
      <div className={styles.formItem} >
        <label htmlFor="person">Тип лица</label>
        <select {...register('person')} defaultValue={'phisical'} name="person" id="person">
          <option value="phisical">Физическое</option>
          <option value="legal">Юридическое</option>
        </select>
      </div>
    </form>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'
import { Result } from 'antd'

const ResultComp = ({title='Вы успешно зарегистрированы!', subTitle='На какую страницу Вы хотите прейти?', handleCancel}) => (
  <Result
    status="success"
    title={title}
    subTitle={subTitle}
    extra={[
      <Link to='/' key={1} onClick={handleCancel} className='text-blue-600 mr-3'>
        На главную
      </Link>,
      <Link to='/' key={2} onClick={handleCancel}  className='text-blue-600'>
        В личный кабинет
      </Link>,
    ]}
  />
);
export default ResultComp
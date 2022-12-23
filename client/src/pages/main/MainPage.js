import React, { useContext, useEffect, useState, } from 'react'
import { Helmet } from "react-helmet"
import { BackTop, Divider, Tag } from 'antd'
import CarouselComp from '../../components/carousel/CarouselComp'
import MainCard from '../../components/mainCard/MainCard'
import HisotyStore from '../../components/historyeStore/HisotyStore'
import BrandMain from '../../components/brandMain/BrandMain'
import SubscriptionMain from '../../components/subscriptionMain/SubscriptionMain'
import TitleAffix from '../../components/titleAffix/TitleAffix'
import { observer } from "mobx-react-lite"
import { Context } from '../../App'
// import {fetchProducts } from '../../http/deviceAPI'
import { useScreens } from '../../Constants/constants'
import { getNewProduct } from '../../http/productsAPI'

const MainPage = observer(() => {
  const { dataApp } = useContext(Context)
  const screens = useScreens()
  const [cardItem, setCardItem] = useState([])
  console.log('screens:', screens)

  useEffect(() => {
    getNewProduct()
      .then(data => {
        console.log('getNewProduct data:', data)
        setCardItem(data)
      })
  }, [])

  return (
    <>
      <Helmet>
        <title>{dataApp.data['/'].title}</title>
        <meta name="description" content={dataApp.data['/'].description} />
      </Helmet>


      <BackTop />
      <section className='container'>
        {Object.entries(screens)
          .filter((screen) => !!screen[1])
          .map((screen) => (
            <Tag color="blue" key={screen[0]}>
              {screen[0]}
            </Tag>
          ))}
        {/* <TitleAffix url={'/'} btn={'Изменить Title'} form={'FormTitleChange'} title={'Изменить Title / Description'} /> */}
        <CarouselComp />
        <MainCard cardItem={cardItem} />
        <HisotyStore />
        <Divider />
        <BrandMain />
        <Divider />
        <SubscriptionMain />
      </section>
    </>
  )
})

export default MainPage
import React, { useContext, useEffect, useState, } from 'react'
import { Helmet } from "react-helmet"
import { BackTop, Divider } from 'antd'
import CarouselComp from '../../components/carousel/CarouselComp'
import MainCard from '../../components/mainCard/MainCard'
import HisotyStore from '../../components/historyeStore/HisotyStore'
import BrandMain from '../../components/brandMain/BrandMain'
import SubscriptionMain from '../../components/subscriptionMain/SubscriptionMain'
import { observer } from "mobx-react-lite"
import { Context } from '../../App'
import { getNewProduct } from '../../http/productsAPI'
import { getSliderImg } from '../../http/imgAPI'

const MainPage = observer(() => {
  const { dataApp } = useContext(Context)
  const [cardItem, setCardItem] = useState([])
  const [imgData, setImgData] = useState([])
  useEffect(() => {
    getNewProduct()
      .then(data => {
        setCardItem(data)
      })
    getSliderImg()
      .then(data => {
        setImgData(data)
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
        <CarouselComp imgData={imgData} />
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
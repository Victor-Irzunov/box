import React, { useContext, useEffect, useState, } from 'react'
import { Helmet } from "react-helmet"
import { BackTop, Divider, Tag } from 'antd'
import CarouselComp from '../../components/carousel/CarouselComp'
import MainCard from '../../components/mainCard/MainCard'
import HisotyStore from '../../components/historyeStore/HisotyStore'
import BrandMain from '../../components/brandMain/BrandMain'
import SubscriptionMain from '../../components/subscriptionMain/SubscriptionMain'
import { observer } from "mobx-react-lite"
import { Context } from '../../App'
import { useScreens } from '../../Constants/constants'
import { getNewProduct } from '../../http/productsAPI'
import { getSliderImg } from '../../http/imgAPI'

const MainPage = observer(() => {
  const { dataApp } = useContext(Context)
  const screens = useScreens()
  const [cardItem, setCardItem] = useState([])
  const [imgData, setImgData] = useState([])
  // console.log('screens:', screens)

  useEffect(() => {
    getNewProduct()
      .then(data => {
        setCardItem(data)
      })
    getSliderImg()
      .then(data => {
        setImgData(data)
        // dataApp.setImgSliderMain(data)
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
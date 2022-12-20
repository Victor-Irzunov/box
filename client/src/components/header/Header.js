import React, { useContext, useEffect, useState } from 'react'
import HeaderAddress from './header-address/HeaderAddress'
import { Affix } from 'antd'
import HeaderMenu from './headerMenu/HeaderMenu'
import BadgeIconHeard from '../badgeIcon/badgeIconHeard/BadgeIconHeard'
import BadgeIconBasked from '../badgeIcon/BadgeIconBasket'
import BadgeIconVesy from '../badgeIcon/badgeIconVesy/BadgeIconVesy'
import { Context } from '../../App'
import { observer } from "mobx-react-lite"
import { getAllBasketUser } from '../../http/basketAPI'

const Header = observer(() => {
  const { dataApp, user, dataProducts } = useContext(Context)
  const [isAffix, setIsAffix] = useState(false)
  // const [dataMenu, setDataMenu] = useState([])




  useEffect(() => {
    let cookie = {}
    decodeURIComponent(document.cookie).split(';').forEach(el => {
      let [k, v] = el.split('=')
      cookie[k.trim()] = v
    })
    if (cookie['ComparisonList']) {
      let arr = JSON.parse(cookie['ComparisonList'])
      dataApp.setVesyLength(arr.length)
      dataApp.setVesyArr(arr)
    }
  }, [dataApp.vesyLength])

  useEffect(() => {
    let cookie = {}
    decodeURIComponent(document.cookie).split(';').forEach(el => {
      let [k, v] = el.split('=')
      cookie[k.trim()] = v
    })
    if (cookie['LikedList']) {
      let arr = JSON.parse(cookie['LikedList'])
      dataApp.setLikedLength(arr.length)
      dataApp.setLikedArr(arr)
    }
  }, [dataApp.likedLength])

  useEffect(() => {
    if (!user.isAuth) {
      let cookie = {}
      decodeURIComponent(document.cookie).split(';').forEach(el => {
        let [k, v] = el.split('=')
        cookie[k.trim()] = v
      })
      if (cookie['BasketProduct']) {
        let arr = JSON.parse(cookie['BasketProduct'])
        dataApp.setBasketLength(arr.length)
        dataApp.setBasketArr(arr)
      }
    } else {
      getAllBasketUser()
        .then(data => {
          dataApp.setBasketLength(data.length)
          dataProducts.setDataBasket(data)
        })
    }
  }, [dataApp.basketLength])

  return (
    <>
      <HeaderAddress />
      <Affix
        offsetTop={0}
        className='z-50'
        onChange={(affixed) => setIsAffix(affixed)}
      >
        <header
          className={isAffix ? 'relative pt-0.5 pb-1.5' : 'relative pt-2 pb-2'}
          style={{
            background: '#ff0084'
          }}
        >

          <div className='container'>

            <nav>
              <HeaderMenu />
            </nav>
            <BadgeIconVesy header={true} />
            <BadgeIconHeard header={true} />
            <BadgeIconBasked />
          </div>
        </header>
      </Affix>
    </>
  )
})

export default Header
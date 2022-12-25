import React, { useContext, useEffect, useState } from 'react'
import HeaderAddress from './header-address/HeaderAddress'
import { Affix, Button, Typography, Popover } from 'antd'
import { MenuOutlined, CloseOutlined, PhoneOutlined, HistoryOutlined, UserOutlined } from '@ant-design/icons'
import HeaderMenu from './headerMenu/HeaderMenu'
import BadgeIconHeard from '../badgeIcon/badgeIconHeard/BadgeIconHeard'
import BadgeIconBasked from '../badgeIcon/BadgeIconBasket'
import BadgeIconVesy from '../badgeIcon/badgeIconVesy/BadgeIconVesy'
import { Context } from '../../App'
import { observer } from "mobx-react-lite"
import { getAllBasketUser } from '../../http/basketAPI'
import { useScreens } from '../../Constants/constants'
import logo from '../../images/logo/logo3.webp'
import MenuMobil from './menuMobil/MenuMobil'
import MenuLinkMobil from './menuLinkMobil/MenuLinkMobil'
import { Link } from 'react-router-dom'
import ModalComponent from '../modalLoginRegistrat/ModalComponent'
import { Content, ContentAdmin, ContentCourier } from './header-address/headerTimeTel.js/HeaderTimeTel'

const { Paragraph } = Typography

const Header = observer(() => {
  const { dataApp, user, dataProducts } = useContext(Context)
  const [isAffix, setIsAffix] = useState(false)
  const [isActiveMenu, setIsActiveMenu] = useState(false)
  const screens = useScreens()
  // console.log('screens:', screens)

  const [open, setOpen] = useState(false)
  const showModal = () => {
    setOpen(true)
  }

  // xs: '480px',
  // sm: '576px',
  // md: '768px',
  // lg: '992px',
  // xl: '1200px',
  // xxl: '1600px',

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
      {screens.lg ?
        <>
          <HeaderAddress />
          <Affix
            offsetTop={0}
            className='z-50'
            onChange={(affixed) => setIsAffix(affixed)}
          >
            <header
              className={isAffix ? 'relative pt-0.5 pb-1.5' : `relative pt-2 pb-2`}
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
        :
        <Affix
          offsetTop={0}
          className='z-10'
        >
          <div className={`duration-500 ${isActiveMenu ? 'h-screen' : 'h-12'}
         bg-[#ff0084] pt-3 pb-2
         absolute left-0 right-0 top-0
         `}>
            <div className='container flex justify-between items-center z-50'>
              <div className='z-50'>
                {
                  isActiveMenu ?
                    <CloseOutlined
                      className='text-3xl text-white pointer'
                      onClick={() => setIsActiveMenu(i => !i)}
                    />
                    :
                    <MenuOutlined
                      className='text-3xl text-white pointer'
                      onClick={() => setIsActiveMenu(i => !i)}
                    />
                }
              </div>
              <div className='z-50'>
                <Link to='/'>
                  <img src={logo} className='w-28 ml-6' />
                </Link>
              </div>
              <div className='flex justify-between z-50'>
                <Button type='link' href='tel:80290000000' className='pr-2'>
                  <PhoneOutlined className='text-white text-2xl' />
                </Button>

                {user.isAuth
                  ?
                  <Popover
                    placement="bottomRight"
                    content={user.userData.role === 'ADMIN' && ContentAdmin || user.userData.role === 'COURIER' && ContentCourier || user.userData.role === 'USER' && Content}
                    trigger="click"
                  >
                    <UserOutlined className='text-white text-2xl mr-3' />
                  </Popover>
                  :
                  <UserOutlined
                    className='text-white text-2xl mr-3'
                    onClick={showModal}
                  />
                }

                <BadgeIconVesy mobil={true} />
                <BadgeIconHeard mobil={true} />
                <BadgeIconBasked mobil={true} />
              </div>
            </div>
            <div className={`container duration-300	${isActiveMenu ? 'block' : 'hidden'}`}>
              <div className={`pt-10`}>
                <MenuMobil setIsActiveMenu={setIsActiveMenu} />
              </div>
              <div className={``}>
                <MenuLinkMobil setIsActiveMenu={setIsActiveMenu} />
              </div>
              <div className={`flex justify-center items-center absolute bottom-3 left-0 right-0`}>
                <HistoryOutlined className='text-base mr-1 text-white' />
                <Paragraph
                  className='text-white ml-2'
                >
                  08:30-20:00 пн-пт
                </Paragraph>
                <Paragraph
                  className='text-white ml-2'
                >
                  10:00-19:00 сб-вс
                </Paragraph>
              </div>
            </div>
          </div>
        </Affix>
      }
      <ModalComponent open={open} setOpen={setOpen} />
    </>
  )
})

export default Header
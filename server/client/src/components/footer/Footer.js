import React, { useContext, useEffect, useState } from 'react'
import { Image, Row, Col, Space, Empty } from 'antd'
import sneaker_1 from '../../images/footer/shop.webp'
import visa from '../../images/footer/visa.svg'
import master from '../../images/footer/Master-Card.svg'
import bank from '../../images/footer/bank_card.svg'
import TabsFooter from './tabsFooter/TabsFooter'
import FooterList from './listFooter/FooterList'
import { Context } from '../../App'
import { NavLink, Link } from 'react-router-dom'


function Footer() {
  const { dataApp } = useContext(Context)
  const [menuItems, setMenuItems] = useState([])
  const [menuInfoPages, setMenuInfoPages] = useState([])

  useEffect(() => {
    const itemsInfo = []
    if (dataApp.infoPages.length) {
      dataApp.infoPages.forEach(el => {
        itemsInfo.push(
          {
            label: (<NavLink
              to={`/info/${el.link}`} className='text-white' >
              {el.name}
            </NavLink>),
            key: el.link + el.id
          },
        )
      })
    }
    setMenuInfoPages(itemsInfo)
  }, [dataApp.infoPages])

  useEffect(() => {
    const items = []
    if (dataApp.dataMenu.length) {
      dataApp.dataMenu.forEach(el => {
        const type = []
        el.types.forEach((elem) => {
          type.push(
            {
              label: (
                <Link to={`/${el.link}/${elem.link}`} >
                  {elem.name}
                </Link>
              ),
              key: elem.link + el.id
            }
          )
        })
        items.push({
          label: (<NavLink to={`/${el.link}`} className='text-white' >
            {el.name}
          </NavLink>),
          key: el.link + el.id,
          children: type
        })
      })
    }
    setMenuItems(items)
  }, [dataApp.dataMenu])

  return (
    <footer className='mt-auto pt-12' style={{ background: '#ff0084' }}>
      <div className='container'>
        <Row justify='space-between'>
          <Col xl={7} xs={24}>
            <TabsFooter />
          </Col>
          <Col xl={6} xs={24}>

            {menuInfoPages.length ?
              <FooterList data={menuInfoPages}
                linkInfo={true}
              />
              :
              <Empty />
            }
          </Col>
          <Col xl={6} className='ss:hidden lg:block xx:hidden'>
            {menuItems.length ?
              <FooterList data={menuItems} />
              :
              <Empty />
            }
          </Col>
          <Col xl={{ span: 5 }}
          >
            <div className='h-full lg:flex flex-col justify-between align-middle'>
              <Image src={sneaker_1} className='z-10 w-8/12 xx:w-24 xy:w-16 mt-4 ml-5' />
              <Space className='pl-16'>
                <Image src={bank} className='w-10' />
                <Image src={visa} className='w-10' />
                <Image src={master} className='w-10' />
              </Space>
            </div>
          </Col>
        </Row>
        <div
          className='mt-3'
          style={{ borderTop: '1px solid #fff' }}
        >
          <p className='text-slate-50 opacity-80 text-xs' >Copyright © 2022 | Created & Designed By
            <a href='https://vi-tech.by' target='_blank' rel="noreferrer" className='text-sky-800'> VI:TECH</a>
          </p>
        </div>
      </div>

    </footer>
  )
}
export default Footer


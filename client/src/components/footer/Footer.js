import React from 'react'
import { Image, Row, Col, Space } from 'antd'
import sneaker_1 from '../../images/footer/shop.webp'
import visa from '../../images/footer/visa.svg'
import master from '../../images/footer/Master-Card.svg'
import bank from '../../images/footer/bank_card.svg'
import TabsFooter from './tabsFooter/TabsFooter'
import FooterList from './listFooter/FooterList'
import { dataListFooter } from '../../content/Content'
import { dataListFooter2 } from '../../content/Content'


function Footer() {
  return (
    <footer className='mt-auto pt-12' style={{ background: '#ff0084' }}>
      <div className='container'>
        <Row justify='space-between'>
          <Col xl={7} xs={24}>
            <TabsFooter />
          </Col>
          <Col xl={6} xs={24}>
            <FooterList data={dataListFooter}
              // title={'Информация'}
            />
          </Col>
          <Col xl={6} className='ss:hidden lg:block xx:hidden'>
            <FooterList data={dataListFooter2}
              // title={'Категория'}
            />
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


import React, { createContext, useState, useEffect } from 'react'
import './App.css'
import { Spin, ConfigProvider, theme } from 'antd'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import UserStore from './store/UserStore'
import DataStore from './store/DataStore'
import ProductsStore from './store/ProductsStore'
import Header from './components/header/Header'
import BreadCrumbComp from './components/breadcrumb/BreadcrumbComp'
import MainPage from './pages/main/MainPage'
import ErrorPage from './pages/error/ErrorPage'
import Footer from './components/footer/Footer'
// import NovyjGodPage from './pages/novyjGod/NovyjGodPage'
import ProductPage from './pages/productPage/ProductPage'
import { observer } from "mobx-react-lite"
import { check } from './http/userAPI'
import ResultComp from './components/result/ResultComp'
import { duration } from 'moment'
import AdminPage from './pages/admin/AdminPage'
import locale from 'antd/es/locale/ru_RU'
import { categoryType } from './http/productsAPI'
import UniversalPage from './pages/universal/UniversalPage'
import BasketPage from './pages/basket/BasketPage'
import ProductComparison from './pages/comparison/ProductComparison'
import LikedList from './pages/likedList/LikedList'
import OrderHistory from './pages/orderHistory/OrderHistory'
import MyProfile from './pages/myProfile/MyProfile'
import CourierPage from './pages/kurer/CourierPage'


ConfigProvider.config({
  theme: {
    primaryColor: '#ff0084',
  },
});



export const Context = createContext(null)

const App = observer(() => {
  const [loading, setLoading] = useState(true)
  const [user] = useState(new UserStore())
  const [dataApp] = useState(new DataStore())


  useEffect(() => {
    check()
      .then(data => {
        user.setUserData(data)
        if (data.isActivation) {
          user.setIsAuth(true)
          user.setUser(true)
        }
      })
      .catch(data => {
        console.log('check err:', data.response.data.message)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    categoryType()
      .then(data => {
        dataApp.setDataMenu(data)
      })
  }, [])


  if (loading) {
    return <div className='w-full h-screen flex justify-center items-center'><Spin size="large" /></div>
  }


  return (
    <ConfigProvider
      locale={locale}
    >
      <Context.Provider value={{
        user,
        dataApp,
        dataProducts: new ProductsStore()
      }}>

        <BrowserRouter>
          <div className="app">
            <Header />

            <main className='bg-gray-50 relative xs:pt-14 xx:pt-14 xy:pt-14 lg:pt-0'>
              <BreadCrumbComp />
              <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/:category' element={<UniversalPage />} />
                <Route path='/:category/:type' element={<UniversalPage />} />
                <Route path='/uspeshno' element={<ResultComp />} />
                <Route path='/super-adminka' element={<AdminPage />} />
                <Route path='/korzina' element={<BasketPage />} />
                <Route path='/cpisok-sravneniya' element={<ProductComparison />} />
                <Route path='/spisok-ponravivshikhsya' element={<LikedList />} />
                <Route path='/istoriya-zakazov' element={<OrderHistory />} />
                <Route path='/moi-dannye' element={<MyProfile />} />
                <Route path='/dlya-voditelya' element={<CourierPage />} />
                <Route
                  path='/:category/:type/:title'
                  element={<ProductPage />}
                />
                <Route path='*' element={<ErrorPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>







      </Context.Provider>
    </ConfigProvider>
  )
})

export default App
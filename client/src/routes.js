//*все маршруты
import {
	ADMIN_ROUTE,
	BASKET_ROUTE,
	SHOP_ROUTE,
	LOGIN_ROUTE,
	REGISTRATION_ROUTE,
	DEVICE_ROUTE,
	ORDER_ROUTE,
	INFO_ROUTE,
	MYORDERS_ROUTE,
	MYACCOUNT_ROUTE,
	VIEWEDPRODUCT_ROUTE,
	COMPARISONLIST_ROUTE
} from './utils/consts'
import Admin from './pages/Admin'
import Basket from './pages/Basket'
import Shop from './pages/Shop'
import Order from './pages/Order'
import Auth from './pages/Auth'
import Info from './pages/Info'
import DevicePage from './pages/DevicePage'
import MyOrders from './pages/MyOrders'
import MyAccount from './pages/MyAccount'
import ViewedProducts from './components/ViewedProducts'
import ComparisonLists from './components/ComparisonLists'


export const authRoutes = [
	{
		path: ADMIN_ROUTE,
		Component: Admin
	},
	{
		path: BASKET_ROUTE,
		Component: Basket
	},
	{
		path: ORDER_ROUTE + '/:id',
		Component: Order
	},
	{
		path: MYORDERS_ROUTE + '/:id',
		Component: MyOrders
	},
	{
		path: MYACCOUNT_ROUTE + '/:id',
		Component: MyAccount
	},
	{
		path: VIEWEDPRODUCT_ROUTE,
		Component: ViewedProducts
	},
	{
		path: COMPARISONLIST_ROUTE,
		Component: ComparisonLists
	},
]

export const publicRoutes = [
	{
		path: SHOP_ROUTE,
		Component: Shop
	},
	{
		path: LOGIN_ROUTE,
		Component: Auth
	},
	{
		path: REGISTRATION_ROUTE,
		Component: Auth
	},
	{
		path: DEVICE_ROUTE + '/:id',
		Component: DevicePage
	},
	{
		path: INFO_ROUTE + '/:id',
		Component: Info
	},
]
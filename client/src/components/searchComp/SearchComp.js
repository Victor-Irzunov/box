import { Popover } from 'antd'
import {
  SearchOutlined,
} from '@ant-design/icons'
import React, { useState } from 'react'
import FormSearch from '../forms/formSearch/FormSearch'
import DrawerTop from '../drawerTop/DrawerTop'



const SearchComp = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }
  return (
    <>
      <SearchOutlined style={{ fontSize: '1.3em' }} onClick={showDrawer} />
      <DrawerTop open={open} onClose={onClose} />
    </>
  )
}
export default SearchComp
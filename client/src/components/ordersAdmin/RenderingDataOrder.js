import React from 'react'
import DescriptionHistoryOrder from '../descriptionsHistoryOrder/DescriptionHistoryOrder'

function RenderingDataOrder({dataOrder}) {
  return (
	  <div>
		  <DescriptionHistoryOrder data={dataOrder} orderAdmin={true} />
	 </div>
  )
}

export default RenderingDataOrder
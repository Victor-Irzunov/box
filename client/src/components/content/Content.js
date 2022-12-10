import { Typography} from 'antd'
import React, { useContext,useState } from 'react'
import { Context } from '../../App'
import { observer } from "mobx-react-lite"
import { HighlightOutlined, } from '@ant-design/icons'

const { Paragraph } = Typography

const Content = observer(() => {
	const { isAdmin } = useContext(Context)
	const [editH2, setEditH2] = useState('Как выбрать подарок в Минске')
	const [editH3, setEditH3] = useState('Описание подарочного бокса Nike')
	const [editP2, setEditP2] = useState('Профессиональная косметика для ежедневных тренировок! Улучшенная система амортизации с прекрасной поддержкой стопы позволит улучшить ваши результаты на беговой дорожке. Прекрасная вентиляция и комфортная колодка посадки ноги позволит вам насладиться каждым шагом. Модель выполнена с использованием современных иновационных материалов! Приятных покупок!')
	const [editP3, setEditP3] = useState('Объединение стиля и комфорта. Кроссовки NIKE DOWNSHIFTER 10 из перфорированной сетки обеспечивает вентиляцию и комфорт, а две вставки Zoom Air создают амортизацию во время бега. Выступы на подметке улучшают сцепление при движении вверх по склону. Верх из синтетического материала и сетки с перфорацией для вентиляции. Вставки Zoom Air в области пятки и передней части стопы для амортизации. Выступы на подметке для оптимального сцепления с асфальтом и на пересеченной местности. Более широкая передняя часть для свободной посадки. Накладка вокруг отверстий для шнуровки объединена с классической системой шнуровки для надежной фиксации. Пеноматериал Cushlon обеспечивает амортизацию и поддержку. Верх: синтетический материал. Внутренний материал: текстильПодошва: пена / резина. Кроссовки Nike DOWNSHIFTER 10 созданы для активного отдыха, повседневной носки и тренировок.')

	return (
		<div className='mt-20 border-t pt-3'>
			
			<Typography.Title
				editable={isAdmin && {
					onChange: setEditH2,
					icon: <HighlightOutlined />,
				}}
				level={2}
				style={{
					margin: 0,
				}}
			>
				{editH2}
			</Typography.Title>
			<Paragraph
				editable={isAdmin &&{
					onChange: setEditP2,
				}}
			>
				{editP2}
			</Paragraph>
			<Typography.Title
				editable={isAdmin && {
					onChange: setEditH3,
					icon: <HighlightOutlined />,
				}}
				level={3}
				style={{
					margin: 0,
				}}
			>
				{editH3}
			</Typography.Title>
			<Paragraph
				editable={isAdmin &&{
					onChange: setEditP3,
				}}
			>
				{editP3}
			</Paragraph>
		</div>
	)
})

export default Content
import React, { useEffect, useRef } from 'react'

// Вспомогательная функция для плавной интерполяции (lerp)
const lerp = (start, end, amount) => {
	return (1 - amount) * start + amount * end
}

const CustomCursor = () => {
	const cursorRef = useRef(null)

	// Храним целевую (реальная мышь) и текущую (точка) позиции в ref
	const targetPosRef = useRef({ x: 0, y: 0 })
	const currentPosRef = useRef({ x: 0, y: 0 })

	// Ref для ID анимации, чтобы ее можно было остановить
	const animationFrameRef = useRef(null)

	// Настройте этот параметр:
	// 0.1 = очень плавно и медленно
	// 0.9 = почти мгновенно
	const smoothness = 0.9

	useEffect(() => {
		const cursor = cursorRef.current
		if (!cursor) return

		// 1. Обновляем целевую позицию при движении мыши
		const moveCursor = e => {
			targetPosRef.current = { x: e.clientX, y: e.clientY }
		}

		// 2. Анимационный цикл
		const animate = () => {
			// Получаем целевые и текущие координаты
			const targetX = targetPosRef.current.x
			const targetY = targetPosRef.current.y
			const currentX = currentPosRef.current.x
			const currentY = currentPosRef.current.y

			// 3. Плавно "догоняем" цель
			const newX = lerp(currentX, targetX, smoothness)
			const newY = lerp(currentY, targetY, smoothness)

			// Обновляем ref текущей позиции
			currentPosRef.current = { x: newX, y: newY }

			// 4. Применяем стили к DOM-элементу
			cursor.style.left = `${newX}px`
			cursor.style.top = `${newY}px`

			// Повторяем на следующем кадре
			animationFrameRef.current = requestAnimationFrame(animate)
		}

		// --- Дополнительные эффекты ---
		// Прячем курсор, когда мышь уходит за пределы окна
		const handleMouseLeave = () => {
			cursor.style.opacity = '0'
		}
		// Показываем, когда возвращается
		const handleMouseEnter = () => {
			cursor.style.opacity = '1'
		}

		// Запускаем слушатели и анимацию
		window.addEventListener('mousemove', moveCursor)
		document.body.addEventListener('mouseleave', handleMouseLeave)
		document.body.addEventListener('mouseenter', handleMouseEnter)

		// Начинаем анимацию
		animationFrameRef.current = requestAnimationFrame(animate)

		// Функция очистки при размонтировании компонента
		return () => {
			window.removeEventListener('mousemove', moveCursor)
			document.body.removeEventListener('mouseleave', handleMouseLeave)
			document.body.removeEventListener('mouseenter', handleMouseEnter)

			// Останавливаем анимационный цикл
			cancelAnimationFrame(animationFrameRef.current)
		}
	}, []) // Пустой массив [] означает, что эффект запустится 1 раз

	return <div ref={cursorRef} id='custom-cursor'></div>
}

export default CustomCursor

import BubbleMenu from './Menu.jsx'
import Aurora from './Background.jsx'
import CustomCursor from './CustomCursor.jsx'

const App = () => {
	return (
		<>
			<CustomCursor />
			<Aurora />
			<BubbleMenu logo={<span className='my-logo'>SalesUp</span>} />
		</>
	)
}

export default App

import BubbleMenu from './Menu.jsx'
import Aurora from './Background.jsx'
import CustomCursor from './Cursor.jsx'

function App() {
	return (
		<>
            <CustomCursor />
			<BubbleMenu logo={<span className='my-logo'>SalesUp</span>} />
			<Aurora />
		</>
	)
}

export default App

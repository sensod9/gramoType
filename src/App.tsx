import WordsContextProvider from './contexts/WordsContextProvider';
import MainFooter from './components/features/MainFooter/MainFooter';
import TypeScreen from './components/features/TypeScreen/TypeScreen';
import PopUpWindows from './components/features/PopUpWindows/PopUpWindows';
import MainTitle from './components/features/MainTitle/MainTitle';
import ScreenEffects from './components/features/ScreenEffects/ScreenEffects';

function App() {
  return (
		<>
			<WordsContextProvider>
				<ScreenEffects />
				<MainTitle />
				<PopUpWindows />
				<TypeScreen />
				<MainFooter />
			</WordsContextProvider>
    </>
  )
}

export default App;

import { useWordsContext } from "../../../contexts/WordsContext";
import playSound from "../../../modules/playSound";
import Footer from "../../ui/Footer/Footer";

function MainFooter() {
	const context = useWordsContext();
	const { activeOptions, setActiveOptions, resetWords, setActivePopUp, setActiveScreenEffect } = context;

	function handleClick() {
		if (!activeOptions.hardMode) {
			setActiveScreenEffect('flash');
			playSound('sounds/Thunder_01.ogg');
		}
		setActiveOptions({ ...activeOptions, hardMode: !activeOptions.hardMode });
		setActivePopUp(null);
		resetWords({ resetOptions: { ...activeOptions, hardMode: !activeOptions.hardMode } });
	}

	const leftElement =
		<>
			<a href="https://github.com/sensod9/gramoType"><i className="fa-brands fa-github"></i> sensod9/gramoType</a><br />
			<a href="https://github.com/sensod9/gramoType"><i className="fas fa-fw fa-code-branch"></i> v2.0.0</a>
		</>;
	const rightElement =
		<>
			<a href="https://t.me/chto9chto9">tgk/chto9chto9</a> <button className='invisibleButton' onClick={handleClick}><i className="fa-brands fa-telegram"></i></button><br />
			<a href="https://www.youtube.com/@sensod9">yt/sensod9 <i className="fa-brands fa-youtube"></i></a>
		</>;

	return (
		<Footer leftElement={leftElement} rightElement={rightElement}>
		</Footer>
	);
}

export default MainFooter;
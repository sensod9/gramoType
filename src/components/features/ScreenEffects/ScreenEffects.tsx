import { useWordsContext } from "../../../contexts/WordsContext";
import ScreenFlash from "../../ui/ScreenFlash/ScreenFlash";

function ScreenEffects() {
	const context = useWordsContext();
	const { activeScreenEffect, setActiveScreenEffect } = context;
	
	function resetScreenEffects() {
		setActiveScreenEffect(null);
	}

	return ( activeScreenEffect && (activeScreenEffect == 'flash' ?
		(<ScreenFlash onAnimationEnd={resetScreenEffects}/>) : '' ));
}

export default ScreenEffects;
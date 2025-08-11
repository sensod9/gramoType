import { useWordsContext } from "../../../contexts/WordsContext";

function MainTitle() {
	const context = useWordsContext();
	const { activePopUp } = context;

	return (
		<>
			<h1 className={`${ activePopUp ? 'blurred' : '' } wide position-absolute`}>gramoType v.RE</h1>
			<div className='d-flex flex-column'>
				<h1 className={`${ activePopUp ? 'blurred' : '' } ms-auto me-auto medium narrow mt-0`}>gramoType v.RE</h1>
			</div>
		</>
	);
}

export default MainTitle;
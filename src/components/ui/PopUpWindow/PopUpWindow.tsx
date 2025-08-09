import type { ReactNode } from "react";
import styles from "./PopUpWindow.module.css";

interface Props
{
	title: string;
	handleClose: () => void;
	children: ReactNode;
};

function PopUpWindow({title, handleClose, children}: Props) {
	return (
		<div className={`${styles.container} gap-2 focusable`}>
			<p className={`${styles.title} ps-2 d-flex flex-row justify-content-between`}>{title}
				<button className='invisibleButton' style={{padding: '0 10px 0 10px'}} onClick={handleClose}>
					<i className="fa-solid fa-xmark"></i>
				</button></p>
			{children}
		</div>
	);
}

export default PopUpWindow;
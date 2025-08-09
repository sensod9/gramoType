import { type ReactNode } from "react";
import OptionButton from "../OptionButton/OptionButton";
import styles from "./DropdownMenu.module.css";

interface Props
{
	title?: string;
	isActive?: boolean;
	toggleIsActive: () => void;
	children?: ReactNode;
};

function DropdownMenu({ title = '', isActive = false, toggleIsActive, children }: Props) {
	return (
		<div className={`${styles.container} focusable`}>
			<OptionButton isActive={true} onClick={toggleIsActive} width='full' borderDirection='down'>
				<i className="fa-solid fa-list"></i>
				<div className={styles.title}>
					{title}
				</div>
				<i className="fa-solid fa-list"></i>
			</OptionButton>
			<div className={`${styles.content} ${isActive ? styles.active : ''} gap-1`}>
				{isActive && children}
			</div>
		</div>
	);
}

export default DropdownMenu;
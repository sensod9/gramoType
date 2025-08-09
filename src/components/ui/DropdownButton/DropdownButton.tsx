import type { ReactNode } from "react";
import ToggleOptionButton from "../ToggleOptionButton/ToggleOptionButton";

interface Props
{
	isActive: boolean;
	toggleIsActive: () => void;
	children: ReactNode;
};

function DropdownButton({ isActive, toggleIsActive, children }: Props) {
	return (
		<ToggleOptionButton isActive={isActive} setIsActive={() => toggleIsActive()} width='full' borderDirection='square' fontSize='small'>
			<i className={`fa-regular ${isActive ? 'fa-square-check' : 'fa-square'}`}></i>
			{children}
			<i className={`fa-regular ${isActive ? 'fa-square-check' : 'fa-square'}`}></i>
		</ToggleOptionButton>
	);
}

export default DropdownButton;
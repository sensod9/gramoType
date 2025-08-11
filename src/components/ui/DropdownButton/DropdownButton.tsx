import type { ReactNode } from "react";
import ToggleOptionButton from "../ToggleOptionButton/ToggleOptionButton";

interface Props
{
	isActive: boolean;
	toggleIsActive: () => void;
	isHighlighted?: boolean;
	children: ReactNode;
};

function DropdownButton({ isActive, toggleIsActive, isHighlighted = false, children }: Props) {
	return (
		<ToggleOptionButton isActive={isActive} setIsActive={() => toggleIsActive()} width='full' borderDirection='square' fontSize='small' isHighlighted={isHighlighted}>
			<div className="d-flex gap-2">
				<i className={`fa-regular ${isActive ? 'fa-square-check' : 'fa-square'}`}></i>
				{isHighlighted && <i className="fa-solid fa-star"></i>}
			</div>
			{children}
			<div className="d-flex gap-2">
				{isHighlighted && <i className="fa-solid fa-star"></i>}
				<i className={`fa-regular ${isActive ? 'fa-square-check' : 'fa-square'}`}></i>
			</div>
		</ToggleOptionButton>
	);
}

export default DropdownButton;
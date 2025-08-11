import type { ReactNode } from "react";
import OptionButton from "../../ui/OptionButton/OptionButton";

interface Props
{
	isActive: boolean;
	setIsActive: (value: boolean) => void;
	title?: string;
	fontSize?: string;
	width?: string;
	borderDirection?: string;
	isHighlighted?: boolean;
	children: ReactNode;
};

function ToggleOptionButton({ isActive, setIsActive, fontSize = 'smaller', width = 'small', borderDirection = 'right', isHighlighted = false, children }: Props) {
	return (
		<OptionButton isActive={isActive} fontSize={fontSize} onClick={() => {
			setIsActive(!isActive);
		}} borderDirection={borderDirection} width={width} isHighlighted={isHighlighted}>
			{children}
		</OptionButton>
	);
}

export default ToggleOptionButton;
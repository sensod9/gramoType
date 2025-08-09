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
	children: ReactNode;
};

function ToggleOptionButton({ isActive, setIsActive, fontSize = 'smaller', width = 'small', borderDirection = 'right', children }: Props) {
	return (
		<OptionButton isActive={isActive} fontSize={fontSize} onClick={() => {
			setIsActive(!isActive);
		}} borderDirection={borderDirection} width={width}>
			{children}
		</OptionButton>
	);
}

export default ToggleOptionButton;
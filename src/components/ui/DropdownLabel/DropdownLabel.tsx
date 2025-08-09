import type { ReactNode } from "react";
import styles from "./DropdownLabel.module.css";

interface Props
{
	children?: ReactNode;
};

function DropdownLabel({ children }: Props) {
	return (
		<p className={styles.label}>
			{children}
		</p>
	);
}

export default DropdownLabel;
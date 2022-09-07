import logoSVG from "../assets/logo.svg"
import styles from "../app.module.scss"

export const Header = () => {
	return (
		<header className={styles.header}>
			<img src={logoSVG} alt="Afro ToDo logo" />
		</header>
	)
}

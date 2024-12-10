import Nav from "./Nav"
// import d'un css d'un composant
import styles from "../../assets/css/header.module.css";


const Header = ( ) => {
    return (
    // en react, l'attribut class est remplacé par className
    <header className={styles["site-header"]}>
        <Nav/>
    </header>
    );
};
export default Header
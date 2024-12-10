import { Link } from "react-router-dom"

const Nav = ( ) => {
    // Les balises a sont remplacées par le composant
    //  les attributs href sot remplacés par to
    return <nav>
        <Link to={"/"}> Home </Link>
        <Link to={"/contact"}> Contact </Link>
    </nav>
}
export default Nav
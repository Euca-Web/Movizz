import { Link } from "react-router-dom";

const AdminHomePage = () => {

 
  return (
    <>
      <h1>Bienvenue sur la page Administrateur !</h1>

    <br /><br /><br /><br /><br />
      <Link to={"/admin/movie"}>Gérer les films</Link>
    </>
  );
};

export default AdminHomePage;

import { createBrowserRouter } from "react-router-dom";
// import HomePage from "../page/Home/HomePage";
import AdminHomePage from "../page/admin/AdminHomePage";
import AdminMoviePage from "../page/admin/AdminMoviePage";
import AdminMovieFormPage from "../page/admin/AdminMovieFormPage";
import AdminDelete from "../page/admin/AdminDelete";
import Guard from "../components/common/Guard";
import MoviesAZ from "../page/MoviesAZ/MoviesAZ";
import CompactView from "../page/CompactView/CompactView";
import RecentMovies from "../page/RecentMovies/RecentMovies";
import LegalNotice from "../page/Legal/LegalNotice";
import TermsOfUse from "../page/Legal/TermsOfUse";
import Contact from "../page/Contact/Contact";
import LoginForm from "../components/login/LoginForm";
import RegisterForm from "../components/register/RegisterForm";
import LogoutPage from "../page/LogoutPage";
import SimpleLayout from "../layout/SimpleLayout";
import BaseLayout from "../layout/BaseLayout";
import Home from "../page/Home/Home";

const router = createBrowserRouter([
	{
		// préfixe de toutes le URL enfants
		path: "/",
		// Utilisation d'une mise en page
		element: (
			<Guard roles_id={[1]}>
				<BaseLayout />
			</Guard>
		),
		// Référencer les pages utilisant la mise en page
		children: [
			{
				path: "",
				element: <Home />,
			},
			{
				path: "films-az",
				element: (
					<Guard roles_id={[1,2]}>
						<MoviesAZ />
					</Guard>
				),
			},
			{
				path: "films-recents",
				element: ( 
					<Guard roles_id={[1,2]}>
				<RecentMovies />
				</Guard> )
			},
			{
				path: "films-compact",
				element: ( 
					<Guard roles_id={[1,2]}>
				<CompactView />
				</Guard> )
			},
			{
				path: "login",
				element: <LoginForm />,
			},
			{
				path: "register",
				element: <RegisterForm />,
			},
			{
				path: "logout",
				element: <LogoutPage />,
			},
		],
	},
	{
		element: <SimpleLayout />,
		children: [
			{
				path: "/mentions-legales",
				element: <LegalNotice />,
			},
			{
				path: "/conditions-utilisation",
				element: <TermsOfUse />,
			},
			{
				path: "/contact",
				element: <Contact/>,
			},
		],
	},
	{
		// préfixe de toutes le URL enfants
		path: "/admin/",
		// Utilisation d'une mise en page
		element: <SimpleLayout />,
		// Référencer les pages utilisant la mise en page
		children: [
			{
				path: "",
				element: <Guard roles_id={[2]}>
				<AdminHomePage />
				</Guard>
				,
			},
			{
				path: "movie",
				element: <Guard roles_id={[2]}>
				<AdminMoviePage />
				</Guard>
				,
			},
			{
				path: "movie/form/:movie_id?",
				element: <Guard roles_id={[2]}>
				<AdminMovieFormPage />
				</Guard>
				,
			},
			{
				path: "movie/delete/:movie_id",
				element: <Guard roles_id={[2]}>
				<AdminDelete />
				</Guard>
				,
			},
		],
	},
]);

export default router;

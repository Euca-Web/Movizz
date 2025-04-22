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
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import LogoutPage from "../page/LogoutPage";
import SimpleLayout from "../layout/SimpleLayout";
import SimpleLayout2 from "../layout/SimpleLayout2";
import BaseLayout from "../layout/BaseLayout";
import Home from "../page/Home/Home";
import Plan from "../components/Plan";

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
					<Guard roles_id={[1, 2]}>
						<MoviesAZ />
					</Guard>
				),
			},
			{
				path: "films-recents",
				element: (
					<Guard roles_id={[1, 2]}>
						<RecentMovies />
					</Guard>
				),
			},
			{
				path: "films-compact",
				element: (
					<Guard roles_id={[1, 2]}>
						<CompactView />
					</Guard>
				),
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
				path: "mentions-legales",
				element: <LegalNotice />,
			},
			{
				path: "conditions-utilisation",
				element: <TermsOfUse />,
			},
			{
				path: "contact",
				element: <Contact />,
			},
			{
				path: "plan-du-site",
				element: <Plan />,
			},
		],
	},
	{
		// préfixe de toutes le URL enfants
		path: "/admin/",
		// Utilisation d'une mise en page
		element: (
			<Guard roles_id={[2]}>
				<SimpleLayout2 />
			</Guard>
		),
		// Référencer les pages utilisant la mise en page
		children: [
			{
				path: "",
				element: <AdminHomePage />,
			},
			{
				path: "movie",
				element: <AdminMoviePage />,
			},
			{
				path: "movie/form/:movie_id?",
				element: <AdminMovieFormPage />,
			},
			{
				path: "movie/delete/:movie_id",
				element: <AdminDelete />,
			},
		],
	},
]);

export default router;

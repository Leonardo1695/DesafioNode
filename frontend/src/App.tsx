import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import './App.css'
import LoginComponent from './pages/login';
import HomeComponent from './pages/home';
import AppProvider from "./hooks";
import FinancialPostComponent from "./pages/financial-post";
import GlobalStyle from './styles/global'

const router = createBrowserRouter([
	{
		path: "/",
		element: <LoginComponent />,
	},
	{
		path: "/home",
		element: <HomeComponent />,
	},
	{
		path: "/lancamento",
		element: <FinancialPostComponent />,
	},
]);

function App() {
	return (
		<AppProvider>
			<RouterProvider router={router} /> 
			<GlobalStyle/>
		</AppProvider>
	)
}

export default App

import { Backdrop, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import LoginPage from 'components/LogIn';
import Profile from 'components/Profile';
import Settings from 'components/Settings';
import SignUpPage from 'components/SignUp';
import Article from 'features/articles/Article';
import { authAction } from 'features/auth/authSlice';
import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WithAuth } from 'utils/authGuard';
import './App.css';
import Footer from './components/common/Footer';
import Header from './components/common/Header';

function App() {
	const isLogging = useAppSelector((state) => state.auth.isLogging);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(authAction.getCurrentUser());
	}, [dispatch]);
	return (
		<div className="App">
			<Header />
			<Switch>
				<Route component={WithAuth(LoginPage)} path="/login" />
				<Route component={SignUpPage} path="/register" />
				<Route path="/blog" component={Article} />
				<Route path="/setting" component={Settings} />
				<Route path="/profile">
					<Profile />
				</Route>
			</Switch>
			<Footer />
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={isLogging}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</div>
	);
}

export default App;

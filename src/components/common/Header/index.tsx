import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
import {
	AppBar,
	Avatar,
	Button,
	Container,
	Drawer,
	IconButton,
	Menu,
	MenuItem,
	Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { articleAction } from 'features/articles/articleSlice';
import { authAction } from 'features/auth/authSlice';
import { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import MenuSidebar from '../MenuSidebar';
import Logo from './../../../asset/Img/Logo.png';
import styles from './styles.module.scss';

const Header = () => {
	const auth = useAppSelector((state) => state.auth);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [toggleShow, setToggleShow] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const navigate = useHistory();
	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleShowSidebar = () => {
		setToggleShow(true);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleSignOut = () => {
		localStorage.removeItem('access_token');
		handleClose();
		dispatch(authAction.signOut());
		dispatch(
			articleAction.getListArticle({
				limit: 10,
				offset: 0,
			})
		);
	};

	return (
		<AppBar
			position="sticky"
			sx={{ backgroundColor: '#ffffff', color: 'black' }}
		>
			<Container maxWidth="lg">
				<div className={styles.navbar}>
					<nav>
						<ul>
							<li>
								<MenuIcon
									className={styles.menuIcon}
									onClick={handleShowSidebar}
								/>
								<Drawer
									anchor={'left'}
									open={toggleShow}
									onClose={() => setToggleShow(false)}
								>
									<MenuSidebar />
								</Drawer>
								<NavLink to="/blog">
									<img src={Logo} alt="" />
								</NavLink>
							</li>
							<li className={styles.sectionSection}>
								<input name="search" placeholder="Search..." />
								<SearchIcon />
							</li>
						</ul>
						<ul className={styles.navbarLeft}>
							{auth.isLogged ? (
								<li>
									<div className={styles.navbarLeft_section}>
										<Button
											variant="outlined"
											className={styles.navbar_createBtn}
										>
											Create Post
										</Button>
										<SearchIcon />
										<NotificationsNoneIcon />
										<IconButton
											size="small"
											aria-label="account of current user"
											aria-controls="menu-appbar"
											aria-haspopup="true"
											onClick={handleMenu}
											sx={{ padding: '0px', color: 'black' }}
										>
											<Avatar alt="User avt" src={auth.userState.user.image} />
										</IconButton>
										<Menu
											id="menu-appbar"
											anchorEl={anchorEl}
											anchorOrigin={{
												vertical: 'bottom',
												horizontal: 'right',
											}}
											keepMounted
											transformOrigin={{
												vertical: 'top',
												horizontal: 'right',
											}}
											open={Boolean(anchorEl)}
											onClose={handleClose}
											className={styles.menuNavbar}
										>
											<MenuItem
												onClick={() => {
													navigate.push('/profile');
													handleClose();
												}}
												sx={{ marginBottom: '0.5rem' }}
											>
												<span>@{auth.userState.user.username}</span>
											</MenuItem>
											<hr />
											<MenuItem
												onClick={() => {
													navigate.push('/profile');
													handleClose();
												}}
											>
												Dashboard
											</MenuItem>
											<MenuItem
												onClick={() => {
													navigate.push(
														`/profile/${auth.userState.user.username}`
													);
													handleClose();
												}}
											>
												Create Post
											</MenuItem>
											<MenuItem
												onClick={() => {
													navigate.push('/setting');
													handleClose();
												}}
											>
												Reading list
											</MenuItem>
											<MenuItem
												onClick={() => {
													navigate.push('/setting');
													handleClose();
												}}
												sx={{ marginBottom: '0.5rem' }}
											>
												Settings
											</MenuItem>
											<hr />
											<MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
										</Menu>
									</div>
								</li>
							) : (
								<>
									<li>
										<Typography>
											<NavLink to="/login">Sign In</NavLink>
										</Typography>
									</li>
									<li>
										<Typography>
											<NavLink to="/register">Sign Up</NavLink>
										</Typography>
									</li>
								</>
							)}
						</ul>
					</nav>
				</div>
			</Container>
		</AppBar>
	);
};

export default Header;

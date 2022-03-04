import {
	AddCommentOutlined,
	DeleteOutlined,
	FavoriteBorderOutlined,
	FavoriteBorderSharp,
	FavoriteBorderTwoTone,
	FavoriteRounded,
	Grid3x3,
	Textsms,
} from '@mui/icons-material';
import CakeIcon from '@mui/icons-material/Cake';
import SettingsIcon from '@mui/icons-material/Settings';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import {
	Avatar,
	Box,
	Button,
	Container,
	Grid,
	Paper,
	Typography,
} from '@mui/material';
import { articleModel, profileModel } from 'models';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import style from './style.module.scss';

interface ProfileProps {
	profileCurrent: profileModel;
	articleByUser: articleModel[];
	handleLoadFavorited: () => void;
	handleLoadAllPost: () => void;
	handleDeleteArticle: (slug: string) => void;
}

export default function Profile({
	articleByUser,
	profileCurrent,
	handleLoadFavorited,
	handleLoadAllPost,
	handleDeleteArticle,
}: ProfileProps) {
	const navigate = useHistory();
	return (
		<Box className={style.rootProfile}>
			<Box className={style.header}>
				<Box className={style.blackpath}></Box>
				<Container>
					<Paper elevation={3} className={style.headerProfile}>
						<Box>
							<Avatar
								className={style.avatar}
								sx={{ width: '99px', height: '99px' }}
								src={profileCurrent.profile.image}
							/>
							<Typography variant="h5" mt={10} className={style.username}>
								{profileCurrent.profile.username}
							</Typography>
							<Typography mt={3}>
								{profileCurrent.profile.bio
									? profileCurrent.profile.bio
									: '404 profile not found'}
							</Typography>
							<Typography mt={3}>
								<CakeIcon />
								<span className={style.createdDate_text}>
									&nbsp; 3 march 2022
								</span>
							</Typography>
							<Link to="/setting">
								<Button
									className={style.settingButton}
									variant="contained"
									color="primary"
								>
									<SettingsIcon /> &nbsp; Edit Profile
								</Button>
							</Link>
						</Box>
					</Paper>
				</Container>
			</Box>
			<Container>
				<Grid container className={style.grid} spacing={2}>
					<Grid item lg={4}>
						<Paper className={style.boardInfo}>
							<Typography onClick={handleLoadAllPost}>
								<TextSnippetIcon />
								&nbsp; My articles
							</Typography>

							<Typography onClick={handleLoadFavorited}>
								<FavoriteRounded />
								&nbsp; Favorited
							</Typography>
							<Typography>
								<Textsms />
								&nbsp; comments written
							</Typography>
							<Typography>
								<Grid3x3 />
								&nbsp; tags followed
							</Typography>
						</Paper>
					</Grid>

					<Grid item lg={8}>
						{articleByUser.map((article) => {
							const date = new Date(article?.createdAt);
							return (
								<Paper className={style.ContainArticle}>
									<Box className={style.userInfo}>
										<Avatar
											sx={{ width: '32px', height: '32px' }}
											src={profileCurrent.profile.image}
										/>
										<Box>
											<Typography>quanghoapq1</Typography>
											<Typography>{date.toDateString()}</Typography>
										</Box>
									</Box>
									<Box className={style.userArticle}>
										<Link to="/" className={style.userArticle_title}>
											{article.slug}
										</Link>
										<Link to="/tagList" className={style.userArticle_tagList}>
											{article.tagList}
										</Link>
									</Box>
									<Box className={style.userActions} mt={4}>
										<Box>
											<Button>
												{article.favoritesCount === 0 ? (
													<FavoriteBorderOutlined color="inherit" />
												) : (
													<FavoriteRounded color="error" />
												)}
												&nbsp; {article.favoritesCount} &nbsp;Reactions
											</Button>
											<Button onClick={() => navigate.push(`/${article.slug}`)}>
												<AddCommentOutlined /> &nbsp; Add comments
											</Button>
										</Box>

										<Box>
											<Button onClick={() => handleDeleteArticle(article.slug)}>
												<DeleteOutlined /> &nbsp; Remove
											</Button>
										</Box>
									</Box>
								</Paper>
							);
						})}
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

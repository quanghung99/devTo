import {
	Container,
	Grid,
	Pagination,
	Skeleton,
	Tab,
	Tabs,
} from '@mui/material';
import { Box } from '@mui/system';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import ArticleFilter from 'components/Aritcle/ArticleFilter';
import ArticleList from 'components/Aritcle/ArticleList';
import MenuSidebar from 'components/common/MenuSidebar';
import { articleFilter } from 'models';
import React, { useEffect, useState } from 'react';
import {
	articleAction,
	selectArticleList,
	selectIsLoading,
} from './articleSlice';

const Article = () => {
	const isLoading = useAppSelector(selectIsLoading);
	const isLogged = useAppSelector((state) => state.auth.isLogged);
	const articleList = useAppSelector(selectArticleList);
	const hashTag = useAppSelector((state) => state.article.tags);
	const filter = useAppSelector((state) => state.article.filter);
	const totalCount = useAppSelector((state) => state.article.totalCount);
	const dispatch = useAppDispatch();
	const [tagValue, setTagValue] = useState('2');
	const [hashTagValue, setHashTagValue] = useState('');
	const [page, setPage] = React.useState(1);
	useEffect(() => {
		dispatch(articleAction.getTag());
	}, [dispatch]);
	useEffect(() => {
		if (tagValue === '2') {
			const newFilter: articleFilter = {
				limit: 3,
				offset: (page - 1) * 3,
			};
			dispatch(articleAction.getListArticle(newFilter));
			console.log(tagValue);
		} else if (tagValue === '1') {
			const newFilter: articleFilter = {
				limit: 3,
				offset: (page - 1) * 3,
			};
			dispatch(articleAction.getListFeed(newFilter));
		} else if (tagValue === '3') {
			const newFilter: articleFilter = {
				...filter,
				tag: hashTagValue,
			};
			dispatch(articleAction.changeFilter(newFilter));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tagValue, dispatch, page, hashTagValue]);
	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setHashTagValue('');
		setPage(1);
		setTagValue(newValue);
	};
	const handleChangePagination = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setPage(value);
	};
	const handleClickTag = (tag: string) => {
		setHashTagValue(tag);
		setPage(1);
		setTagValue('3');
	};
	return (
		<Container maxWidth={'lg'} sx={{ mt: '40px' }}>
			<Grid container spacing={2}>
				<Grid item md={3} lg={2} sx={{ display: { xs: 'none', md: 'block' } }}>
					<MenuSidebar />
				</Grid>
				<Grid item md={9} lg={8} xs={12}>
					<Box sx={{ borderBottom: 1, borderColor: '#e7ebf0' }}>
						<Tabs
							value={tagValue}
							onChange={handleChange}
							aria-label="basic tabs example"
						>
							{isLogged && (
								<Tab
									sx={{ textTransform: 'none' }}
									label="Your Feed"
									value="1"
								/>
							)}
							<Tab
								sx={{ textTransform: 'none' }}
								label="Global Feed"
								value="2"
							/>
							<Tab sx={{ textTransform: 'none' }} label="Latest" value="4" />
							<Tab sx={{ textTransform: 'none' }} label="Popular" value="5" />
							{hashTagValue.length > 0 ? (
								<Tab
									sx={{ textTransform: 'none' }}
									label={`#${hashTagValue}`}
									value="3"
								/>
							) : (
								<Tab></Tab>
							)}
						</Tabs>
					</Box>
					{isLoading ? (
						<Box sx={{ my: '50px' }}>
							<Skeleton variant="rectangular" width={'100%%'} height={'40vh'} />
							<Skeleton variant="text" width={'100%'} height={'40vh'} />
						</Box>
					) : (
						<ArticleList articleList={articleList} />
					)}
					<Pagination
						page={page}
						count={Math.ceil(totalCount / 3)}
						onChange={handleChangePagination}
						color="primary"
					/>
				</Grid>
				<Grid
					item
					md={2}
					lg={2}
					xs={12}
					sx={{ display: { xs: 'none', md: 'none', lg: 'block' } }}
				>
					{hashTag?.length ? (
						<ArticleFilter tags={hashTag} clickTag={handleClickTag} />
					) : (
						<Box sx={{ my: '50px' }}>
							<Skeleton variant="rectangular" width={'100%%'} height={'20vh'} />
						</Box>
					)}
				</Grid>
			</Grid>
		</Container>
	);
};

export default Article;

import {
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Paper,
} from '@mui/material';
import { articleModel } from 'models';
import * as React from 'react';

export interface TagOverviewProps {
	tagName: string;
	listArticle: articleModel[];
}

export default function TagOverview({
	tagName,
	listArticle,
}: TagOverviewProps) {
	return (
		<Paper>
			<List subheader={tagName}>
				{listArticle?.map((art, index) => (
					<ListItem key={index} disablePadding>
						<ListItemButton>
							<ListItemText primary={art.description} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Paper>
	);
}

import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import styles from './styles.module.scss';

interface Props {
	tags?: string[];
	clickTag: (tag: string) => void;
}

export default function ArticleFilter({ tags, clickTag }: Props) {
	return (
		<div className={styles.tagSession}>
			<Typography>Filter by tag</Typography>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					flexWrap: 'wrap',
				}}
			>
				{tags?.map((tag, index) => (
					<div
						className={styles.tagSession_box}
						onClick={() => clickTag(tag)}
						key={index}
					>
						{tag}
					</div>
				))}
			</Box>
		</div>
	);
}

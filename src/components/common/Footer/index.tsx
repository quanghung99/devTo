import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import './styles.scss';

const Footer = () => {
	return (
		<footer>
			<Container>
				<Box sx={{ paddingTop: '40px', paddingBottom: '80px' }}>
					<Typography>
						<span> DEV Community</span> — A constructive and inclusive social
						network for software developers. With you every step of your
						journey.
					</Typography>
					<Typography>
						Built on <span>Forem</span> — the open source software that powers{' '}
						<span>DEV</span> and other inclusive communities.
					</Typography>
					<Typography>
						Made with love and <span> Ruby on Rails</span>. DEV Community © 2016
						- 2022.
					</Typography>
				</Box>
			</Container>
		</footer>
	);
};

export default Footer;

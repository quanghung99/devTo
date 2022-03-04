import {
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import * as React from 'react';

export interface IMenuSidebarProps {}

export default function MenuSidebar(props: IMenuSidebarProps) {
	return (
		<>
			<List>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<img src="/assets/001-house.png" alt="" />
						</ListItemIcon>
						<ListItemText primary="Home" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<img src="/assets/002-open-book.png" alt="" />
						</ListItemIcon>
						<ListItemText primary="Reading List" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<img src="/assets/003-checklist.png" alt="" />
						</ListItemIcon>
						<ListItemText primary="Listing" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<img src="/assets/004-headphone.png" alt="" />
						</ListItemIcon>
						<ListItemText primary="Postcasts" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<img src="/assets/005-video-player.png" alt="" />
						</ListItemIcon>
						<ListItemText primary="Video" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<img src="/assets/006-tag.png" alt="" />
						</ListItemIcon>
						<ListItemText primary="Tags" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<img src="/assets/007-light-bulb.png" alt="" />
						</ListItemIcon>
						<ListItemText primary="FAQ" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<img src="/assets/008-about.png" alt="" />
						</ListItemIcon>
						<ListItemText primary="About" />
					</ListItemButton>
				</ListItem>
			</List>
		</>
	);
}

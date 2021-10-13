import * as React from "react";
import {
	Dialog,
	DialogTitle,
	ListItemText,
	ListItemAvatar,
	ListItem,
	List,
	Avatar,
} from "@material-ui/core";

const emails = ["username@gmail.com", "user02@gmail.com"];

const PlaylistDialog = ({ playlists, open, onClose }) => {
	const handleClose = () => {
		onClose();
	};

	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle>Set backup account</DialogTitle>
			<List sx={{ pt: 0 }}>
				{emails.map((email) => (
					<ListItem button key={email}>
						<ListItemAvatar>
							<Avatar>HH</Avatar>
						</ListItemAvatar>
						<ListItemText primary={email} />
					</ListItem>
				))}

				{/* <ListItem
					autoFocus
					button
					onClick={() => handleListItemClick("addAccount")}
				>
					<ListItemAvatar>
						<Avatar>
							<AddIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="Add account" />
				</ListItem> */}
			</List>
		</Dialog>
	);
};

export default PlaylistDialog;

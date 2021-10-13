import * as React from "react";
import { Box, Typography, Modal } from "@material-ui/core";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	outline: "none",
	p: 4,
};

const Alert = ({ open, onClose, content }) => {
	return (
		<div>
			<Modal
				open={open}
				onClose={onClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<button
						style={{
							backgroundColor: "transparent",
							border: "none",
							outline: "none",
							fontSize: 20,
							fontWeight: 700,
							color: "gray",
							position: "absolute",
							top: 10,
							right: 10,
							transform: "rotate(45deg)",
							cursor: "pointer",
						}}
						onClick={onClose}
					>
						+
					</button>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Attention
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						<p>{content}</p>
					</Typography>
				</Box>
			</Modal>
		</div>
	);
};

export default Alert;

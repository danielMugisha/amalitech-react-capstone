import * as React from "react";
import { Box, Button, Typography, Modal } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	display: "flex",
	justifyContent: "center",
	p: 4,
};

const Waiting = ({ open }) => {
	return (
		<div>
			<Modal
				open={open}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					{/* <button
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
					</button> */}
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						<CircularProgress color="inherit" />
					</Typography>
				</Box>
			</Modal>
		</div>
	);
};

export default Waiting;

import React from "react";
import "./Login.css";
import { accessUrl } from "../../util/Spotify";

const Login = () => {
	return (
		<div>
			<div className="login">
				<div className="welcome">
					Hey buddy, Jamming will help you create spotify playlists smoothly 😉,{" "}
					<br />
					wanna give it a try?
				</div>
				<a className="linkButton" href={accessUrl}>
					LOGIN WITH SPOTIFY
				</a>
			</div>
		</div>
	);
};

export default Login;

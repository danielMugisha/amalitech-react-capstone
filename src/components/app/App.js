import React from "react";
import "./App.css";
import Playlist from "../playlist/Playlist";
import SearchBar from "../searchBar/SearchBar";
import SearchResults from "../searchResults/SearchResults";
import Spotify, { getTokenFromResponse } from "../../util/Spotify";
import Login from "../login/Login";
import SpotifyWebApi from "spotify-web-api-js";
import PlaylistDialog from "../playlistsDialog/PlaylistDialog";
import Alert from "../alert/Alert";
import Waiting from "../waiting/Waiting";

const spotify = new SpotifyWebApi();
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: [],
			playlistName: "New Playlist",
			playlistTracks: [],
			token: null,
			user: null,
			existingPlaylists: null,
			showMenu: false,
			showPlaylists: false,
			showAlert: false,
			wait: false,
		};
		this.search = this.search.bind(this);
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.updatePlaylistName = this.updatePlaylistName.bind(this);
		this.savePlaylist = this.savePlaylist.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.logout = this.logout.bind(this);
	}

	search = (term) => {
		if (term) {
			this.setState({ wait: true });
			Spotify.search(term, this.state.token).then((searchResults) => {
				console.log(searchResults);
				this.setState({ searchResults: searchResults });
				this.setState({ wait: false });
			});
		} else {
			this.setState({ showAlert: true });
		}
	};

	addTrack = (track) => {
		let tracks = this.state.playlistTracks;
		if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
			return;
		}
		tracks.push(track);
		this.setState({ playlistTracks: tracks });
	};

	removeTrack = (track) => {
		let tracks = this.state.playlistTracks;
		tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);

		this.setState({ playlistTracks: tracks });
	};

	updatePlaylistName = (name) => {
		this.setState({ playlistName: name });
	};

	savePlaylist = () => {
		if (this.state.playlistName) {
			if (this.state.playlistTracks.length) {
				this.setState({ wait: true });
				const trackUris = this.state.playlistTracks.map((track) => track.uri);
				Spotify.savePlaylist(
					this.state.playlistName,
					trackUris,
					this.state.token
				).then(() => {
					this.setState({
						existingPlaylists: [
							...this.state.existingPlaylists,
							{
								name: this.state.playlistName,
								tracks: this.state.playlistTracks,
							},
						],
						playlistName: "",
						playlistTracks: [],
					});
					this.setState({ wait: false });
				});
			} else {
				this.setState({ showAlert: true });
			}
		} else {
			this.setState({ showAlert: true });
		}
	};

	handleClick = () => {
		this.setState({ showMenu: !this.state.showMenu });
	};

	logout = () => {
		this.setState({ token: null, user: null });
	};

	handleClose = () => {
		this.setState({ showPlaylists: false });
	};

	handleOpen = () => {
		this.setState({ showPlaylists: true });
	};

	closeAlert = () => {
		this.setState({ showAlert: false });
	};

	componentDidMount = () => {
		const hash = getTokenFromResponse();
		const _token = hash.access_token;
		window.location.hash = "";
		if (_token) {
			this.setState({
				token: _token,
			});
			spotify.setAccessToken(_token);
			spotify.getMe().then((_user) => {
				this.setState({ user: _user });
				spotify
					.getUserPlaylists(_user.id)
					.then((res) => this.setState({ existingPlaylists: res.items }));
			});
		}
	};

	render() {
		return (
			<>
				<PlaylistDialog
					open={this.state.showPlaylists}
					onClose={this.handleClose}
					playlists={this.state.existingPlaylists}
				/>
				<Alert
					open={this.state.showAlert}
					onClose={this.closeAlert}
					content="Empty field not allowed"
				/>
				<Waiting open={this.state.wait} />
				<div className="topNav">
					<h1>
						Ja<span className="highlight">mmm</span>ing
					</h1>
					{this.state.user ? (
						<div style={{ display: "flex", alignItems: "center" }}>
							<div className="profile">
								<p
									style={{ color: "white", fontWeight: 800 }}
									onClick={this.handleClick}
								>
									{this.state.user.display_name}
								</p>
								{"🔻"}
								{this.state.showMenu ? (
									<div className="menu">
										<ul>
											<li
												onClick={() => this.setState({ showPlaylists: true })}
											>
												Playlists{" "}
												<div className="playlistsNumber">
													{this.state.existingPlaylists?.length}
												</div>
											</li>
											<li onClick={this.logout}>Logout</li>
										</ul>
									</div>
								) : (
									""
								)}
							</div>
							<img
								className="profileImage"
								src={this.state.user.images[0]?.url}
								alt="profile"
							/>
						</div>
					) : (
						" "
					)}
				</div>
				{this.state.token ? (
					<div>
						{console.log(this.state.user)}
						<div className="App">
							<SearchBar onSearch={this.search} />
							<div className="App-playlist">
								<SearchResults
									searchResults={this.state.searchResults}
									onAdd={this.addTrack}
								/>
								<Playlist
									playlistName={this.state.playlistName}
									playlistTracks={this.state.playlistTracks}
									onNameChange={this.updatePlaylistName}
									onRemove={this.removeTrack}
									onSave={this.savePlaylist}
								/>
							</div>
						</div>
					</div>
				) : (
					<Login />
				)}
			</>
		);
	}
}

export default App;

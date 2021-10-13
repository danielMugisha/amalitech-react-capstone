import React from "react";
import "./App.css";
import Playlist from "../playlist/Playlist";
import SearchBar from "../searchBar/SearchBar";
import SearchResults from "../searchResults/SearchResults";
import Spotify, { getTokenFromResponse } from "../../util/Spotify";
import Login from "../login/Login";
import SpotifyWebApi from "spotify-web-api-js";
import PlaylistDialog from "../playlistsDialog/PlaylistDialog";

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
		Spotify.search(term, this.state.token).then((searchResults) => {
			console.log(searchResults);
			this.setState({ searchResults: searchResults });
		});
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
		const trackUris = this.state.playlistTracks.map((track) => track.uri);
		Spotify.savePlaylist(
			this.state.playlistName,
			trackUris,
			this.state.token
		).then(() => {
			this.setState({
				playlistName: "New Playlist",
				playlistTracks: [],
			});
		});
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
					playlists={this.state.existingPlaylists}
					open={this.state.showPlaylists}
					onClose={this.handleClose}
				/>
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
											<li onClick={this.handleOpen}>
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

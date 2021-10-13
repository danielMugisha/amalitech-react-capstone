import React from "react";
import "./Playlist.css";
import TrackList from "../trackList/TrackList";

class Playlist extends React.Component {
	constructor(props) {
		super(props);
		this.handleNameChange = this.handleNameChange.bind(this);
	}

	handleNameChange(event) {
		this.props.onNameChange(event.target.value);
	}

	render() {
		return (
			<div className="Playlist">
				<div style={{ width: "100%", borderBottom: "2px solid white" }}>
					<h2>New Playlist</h2>
				</div>
				<input
					onChange={this.handleNameChange}
					// defaultValue={"New Playlist"}
					value={this.props.playlistName}
					placeholder="Add your playlist name..."
				/>
				<TrackList
					tracks={this.props.playlistTracks}
					isRemoval={true}
					onRemove={this.props.onRemove}
				/>
				<button className="Playlist-save" onClick={this.props.onSave}>
					SAVE TO SPOTIFY
				</button>
			</div>
		);
	}
}

export default Playlist;

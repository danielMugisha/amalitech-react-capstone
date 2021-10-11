import React from "react";
import "./TrackList.css";
import Track from "../track/Track";

class TrackList extends React.Component {
	render() {
		return (
			<div className="TrackList">
				{this.props.tracks?.map((track) => {
					return (
						<Track
							track={track}
							key={track.id}
							onAdd={this.props.onAdd}
							isRemoval={this.props.isRemoval}
							onRemove={this.props.onRemove}
						/>
					);
				})}
			</div>
		);
	}
}

export default TrackList;

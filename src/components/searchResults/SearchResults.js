import React from "react";
import "./SearchResults.css";
import TrackList from "../trackList/TrackList";

class SearchResults extends React.Component {
	render() {
		return (
			<div className="SearchResults">
				<div style={{ borderBottom: "2px solid white" }}>
					<h2>Search Results</h2>
				</div>
				<TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} />
			</div>
		);
	}
}

export default SearchResults;

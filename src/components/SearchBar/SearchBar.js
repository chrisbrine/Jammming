import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchInput: '',
		};
		this.onChange = this.onChange.bind(this);
		this.onClick = this.onClick.bind(this);
	}
	onChange(event) {
		this.setState({
			searchInput: event.target.value,
		});
	}
	onClick() {
		this.props.onClick(this.state.searchInput);
	}
	render() {
		return (
			<div className="SearchBar">
				<input 
					onChange={this.onChange} 
					placeholder="Enter A Song Title" 
				/>
          		<a 
          			onClick={this.onClick}
          		>
          			SEARCH
          		</a>
			</div>
		);
	}
}

export default SearchBar;
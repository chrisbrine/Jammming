import React from 'react';
import './TrackAction.css';

class TrackAction extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}
	onClick() {
		this.props.onClick(this.props.track);
	}
	render() {
		return (
			<a className="TrackAction" onClick={this.onClick}>
				{this.props.action === 'remove' ? '+' : '-'}
			</a>
		);
	}
}

export default TrackAction;
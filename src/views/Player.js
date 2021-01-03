import React from 'react';
import PropTypes from 'prop-types';

function Player(props) {
  return <div>{props.name} is not implemented yet :(</div>;
}

Player.propTypes = {
  name: PropTypes.string
};

export default Player;
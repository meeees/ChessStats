import React from 'react';
import HomePageComponent from '@src/views/HomePage';
import Player from '@src/views/Player';
import PropTypes from 'prop-types';

export const Views = {
  HOME: 'home',
  PLAYER: 'player'
};

function ViewController(props) {

  var comp;
  console.log(props.curView);
  switch (props.curView) {
  case Views.HOME:
    comp = <HomePageComponent />;
    break;
  case Views.PLAYER:
    comp = <Player />;
    break;
  }return comp;
}
ViewController.propTypes = {
  curView: PropTypes.string
};

export default ViewController;
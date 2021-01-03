import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

function Homepage() {
  return <div>
    <h1> This is the home page o.o </h1>
    <ChessBoard/>
  </div>;
}

Homepage.propTypes = {

};

function ChessBoard() {
  let squares = [];
  let markers = [];
  var i = 0;
  for (i = 0; i < 64; i++) {
    squares.push(<Square key={i} index={i}/>);
  }
  for(i = 0; i < 16; i++) {
    markers.push(<Marker key={i} index={i} horizontal={false}>{<Fragment>{(7 - i % 8) + 1}</Fragment>}</Marker>);
  }
  for(i = 0; i < 16; i++) {
    markers.push(<Marker key={i+16} index={i} horizontal={true}><Fragment>{String.fromCharCode(65 + i % 8)}</Fragment></Marker>);
  }
  return <div className = 'Board' style = {{width: remify(boardWidth), height: remify(boardWidth)}}>
    {squares}
    {markers}
  </div>;
}

const squareWidth = 6;
const fontSize = 1.5;
const paddingSize = 0.1;
const boardWidth = squareWidth * 8 + fontSize * 2 + paddingSize * 4;

function remify(i) {
  return i + 'rem';
}

function Square(props) {
  var i = props.index;
  var row = Math.floor(i / 8);
  var col = i % 8;
  var white = '#eeeeee';
  var black = '#111111';
  var color = row % 2 ? (i % 2 == 1 ? white : black) : (i % 2 == 1 ? black : white);
  return <div className = 'Square' style = {{
    backgroundColor: color,
    gridRowStart: '' + (row + 2),
    gridColumnStart: '' + (col + 2),
    width: remify(squareWidth),
    height: remify(squareWidth)
  }}>
  </div>;
}

Square.propTypes = {
  white: PropTypes.bool,
  index: PropTypes.number
};

function Marker(props) {
  var i = props.index;
  return <div className='Marker' style={{
    gridRowStart: '' + (props.horizontal ? (i / 8 < 1 ? 1 : 10) : (i % 8 + 2)),
    gridColumnStart: '' + (props.horizontal ? (i % 8 + 2) : (i / 8 < 1 ? 1 : 10)),
    fontSize: remify(fontSize),
    paddingLeft: remify(paddingSize),
    paddingRight: remify(paddingSize)
  }}>
    {props.children}
  </div>;
}

Marker.propTypes = {
  children: PropTypes.element,
  horizontal: PropTypes.bool,
  index: PropTypes.number
};

export default Homepage;
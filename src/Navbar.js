import React, { useState, useEffect, useRef, Fragment, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Views } from '@src/ViewController';
import './Navbar.css';

/*
import homeImg from '@assets/nav_icons/home.png';
import encounterImg from '@assets/nav_icons/encounters.png';
import areaImg from '@assets/nav_icons/areas.png';
import npcImg from '@assets/nav_icons/npcs.png';
import playerImg from '@assets/nav_icons/players.png';*/

function NavbarComponent(props) {

  const buttonDefs = [
    { name: 'Home', symbol: <Fragment><b><h1>?</h1></b></Fragment>, toView: Views.HOME },
    { name: 'Player', symbol: <Fragment><b><h1>?</h1></b></Fragment>, toView: Views.PLAYER },
  ];
  var buttonRefs = useRef([]);
  buttonRefs.current = new Array(buttonDefs.length);
  var buttons = buttonDefs.map((b, i) =>
    <NavbarItem key={b.name}
      ref={el => buttonRefs.current[i] = el}
      symbol={b.symbol}
      name={b.name}
      navCallback={(newPage) => { props.navCallback(newPage); }}
      toView={b.toView}
      curView={props.curView}
    />
  );

  function resetButtonCSS() {
    for (const b in buttonRefs.current) {
      buttonRefs.current[b].updateClass();
    }
  }
  useEffect(resetButtonCSS, [props.curView]);

  return (
    <div className='Navbar'>
      {buttons}
    </div>
  );
}

NavbarComponent.propTypes = {
  navCallback: PropTypes.func,
  curView: PropTypes.string
};

const NavbarItem = forwardRef(function NavbarItem2(props, ref) {

  useImperativeHandle(ref, () => ({
    updateClass() {
      setClass();
    }
  }),
  );

  const [expanded, setExpanded] = useState(false);

  const myItem = useRef();
  useEffect(setClass, [expanded]);

  function setClass() {
    let className = 'NavbarButton';
    className += expanded ? ' NavbarButton-Expanded' : '';
    className += props.curView == props.toView ?
      ` NavbarButton-Selected${expanded ? '-Expanded' : ''}` : '';
    myItem.current.className = className;
  }

  function expandItem() {
    setExpanded(true);
  }

  function collapseItem(e) {
    setExpanded(false);
    e.target.blur();
  }

  function triggerNav() {
    props.navCallback(props.toView);
  }

  return (
    <div className='NavbarButtonDiv'>
      <button ref={myItem}
        onMouseOver={expandItem}
        onMouseLeave={collapseItem}
        onClick={triggerNav}
        onFocus={expandItem}
        onBlur={collapseItem}>
        {/*<img src={props.symbol} />*/}
        {props.symbol}
        {expanded ? <span>{props.name}</span> : null}
      </button>
    </div>);
});

NavbarItem.propTypes = {
  name: PropTypes.string,
  symbol: PropTypes.any,
  navCallback: PropTypes.func,
  toView: PropTypes.string,
  curView: PropTypes.string,
};

export default NavbarComponent;
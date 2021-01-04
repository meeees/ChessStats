import React, {Fragment, useEffect, useState} from 'react';
import ChessWebAPI from 'chess-web-api';
import PropTypes from 'prop-types';


function Player() {
  const [pName, setPName] = useState('meeees');
  const [playerData, setPlayerData] = useState({});
  const [playerFrags, setPlayerFrags] = useState([]);
  const [playerStats, setPlayerStats] = useState([]);
  useEffect(() => {
    console.log(playerData);
    const tmp = [];
    for (const pd in playerData.base) {
      tmp.push(<Fragment key={pd}>{pd}: {playerData.base[pd]}<br/></Fragment>);
    }
    const tmp2 = [];
    for(const pd in playerData.stats) {
      if(typeof(playerData.stats[pd]) === 'object') {
        if(pd.startsWith('chess')) {
          tmp2.push(<ChessSection key={pd} name={pd.substr(6)} record={playerData.stats[pd].record}/>);
        }
        else {
          tmp2.push(<Fragment key={pd}>{pd}: object<br/></Fragment>);
        }
      }
      else {
        tmp2.push(<Fragment key={pd}>{pd}: {playerData.stats[pd]}<br/></Fragment>);
      }
    }
    setPlayerFrags(tmp);
    setPlayerStats(tmp2);

  }, [playerData]);

  
  function requestPlayerData(name) {
    console.log(name);
    var api = new ChessWebAPI();
    const tmp = {};
    api.getPlayer(name).then(r => {tmp.base = r.body;})
      .then(() => api.getPlayerStats(name)
        .then(r => {tmp.stats = r.body;}))
      .then(() => setPlayerData(tmp));
    

  }
  
  return <div>
    <form onSubmit={(e) => {
      requestPlayerData(pName);
      e.preventDefault();
    }}>
      <input type='text' value={pName} onChange={e =>{setPName(e.target.value);}}/>
      <button>Submit</button>
    </form>
    {playerFrags}
    <br/>
    {playerStats}
    <br/>
  </div>;
}

function percentify(f, p) {
  return (f * 100).toFixed(p);
}

function ChessSection(props) {
  console.log(props.record);
  const {win, loss, draw} = props.record;
  var total = win + loss + draw;
  total = total > 0 ? total : 1;
  return <div>
    <b>{props.name}</b>
    <br/>
    W/L/D {win}/{loss}/{draw} {percentify(win/total)}/{percentify(loss/total)}/{percentify(draw/total)}
    <br/>
    <br/>
  </div>;
}

ChessSection.propTypes = {
  record: PropTypes.object,
  name: PropTypes.string
};

export default Player;
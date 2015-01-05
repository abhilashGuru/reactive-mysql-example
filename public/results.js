var results = [];

var scoreList = React.render(
  <ScoreList results={results} />,
  document.getElementById('example')
);

var sock = new SockJS('/sock');
sock.onmessage = function(e) {
  var msg = JSON.parse(e.data);
  switch(msg.type){
    case 'init':
      results = msg.data.slice();
      break;
    case 'added':
    case 'changed':
      results[msg.index] = msg.data;
      break;
    case 'removed':
      // Results are always removed from end
      results.pop();
  }
  scoreList.setProps({ results: results });
};

function incrementScore(id) {
  sock.send(JSON.stringify({
    type: 'increment',
    id: id
  }));
}

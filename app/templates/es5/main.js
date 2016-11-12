const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '<%= projectName %>-game');

<% //loop over the game states and make a 'game.state.add' statement for each one
for(var i=0;i<gameStates.length;i++){
  var state = gameStates[i];

%>game.state.add('<%= state %>', require('./states/<%= state %>'));
<% } %>
game.state.start('boot');

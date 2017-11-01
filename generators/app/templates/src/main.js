<% const states = gameStates.length;
for (let i = 0; i< states; i++){
  const state = gameStates[i]
  const up_state = state.charAt(0).toUpperCase() + state.slice(1);

%>import <%= up_state %> from './states/<%= state %>';
<% } %>

const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '<%= projectName %>-game');

<% // loop over the game states and make a 'game.state.add' statement for each one
for (let i = 0; i < states; i++) {
  const state = gameStates[i];
  const up_state = state.charAt(0).toUpperCase() + state.slice(1);

%>game.state.add('<%= state %>', new <%= up_state %>());
<% } %>
game.state.start('boot');

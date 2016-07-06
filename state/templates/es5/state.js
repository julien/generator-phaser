<% var up_state = stateName.charAt(0).toUpperCase() + stateName.slice(1); %>
'use strict';

function <%= up_state %>() {}
<%= up_state %>.prototype = {
  preload: function() {
    // Load operations (uses Loader), method called first
  },
  create: function() {
    // Setup code, method called after preload
  },
  update: function() {
    // Code ran on each frame of game
  },
  paused: function() {
    // Called when game is paused
  },
  render: function() {
    // You're able to do any final post-processing style effects here.
  },
  shutdown: function() {
    // Called when switching to a new state
  }
};

module.exports = <%= up_state %>;

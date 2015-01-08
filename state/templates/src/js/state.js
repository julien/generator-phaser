(function() {
  'use strict';

  function <%= _.capitalize(stateName) %>() {
    
  }

  <%= _.capitalize(stateName) %>.prototype = {

    create: function () {
    
    },
    update: function () {
    
    },
    paused: function() {
    
    },
    render: function() {
    
    },
    shutdown: function() {
    
    }

  };

  window['<%= _.slugify(projectName) %>'] = window['<%= _.slugify(projectName) %>'] || {};
  window['<%= _.slugify(projectName) %>'].<%= _.capitalize(stateName) %> = <%= _.capitalize(stateName) %>;

}());

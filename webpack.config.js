'use strict';

module.exports = {
  entry: './js/script.js',
  output: {
    filename: './build/js/script.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', '/']
  }
};

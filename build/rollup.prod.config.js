import uglify from 'rollup-plugin-uglify';

import config from './rollup.dev.config';
config.dest = 'dist/popo.min.js';

config.plugins.push(uglify({
  output: {
      comments: function (node, comment) {
          var text = comment.value;
          var type = comment.type;
          if (type == "comment2") {
              return /PoPo /i.test(text);
          }
      }
  }
}));

export default config;
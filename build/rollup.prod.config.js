import base from './rollup.config';
import uglify from 'rollup-plugin-uglify';

base.dest = 'dist/popo.min.js';
base.plugins.push(uglify({
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

export default base;
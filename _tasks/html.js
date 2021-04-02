import { src, dest } from 'gulp';
import pug from 'gulp-pug';
import plumber from 'gulp-plumber';

const htmlTask = () => {
	console.log('Rendering: All templates');
	return src('src/**.pug')
		.pipe(
			plumber(function (err) {
				console.log(err);
				this.emit('end');
			}),
		)
		.pipe(
			pug({
				pretty: '\t',
			}),
		)
		.pipe(dest('_dist'));
};

module.exports = {
	htmlTask,
};

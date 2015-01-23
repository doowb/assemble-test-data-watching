
var assemble = require('assemble');
var extname = require('gulp-extname');

assemble.option('layout', 'default');

assemble.task('preload', function (cb) {
  assemble.layouts(['layouts/*.hbs']);
  assemble.data(['data/*.yaml', 'defaults/*.yaml']);
  console.log('assemble.cache.data', assemble.cache.data);
  cb();
});

assemble.task('site1', ['preload'], function () {
  return assemble.src('templates/site1/*.hbs')
    .pipe(extname())
    .pipe(assemble.dest('build'));
});

assemble.task('site2', ['preload'], function () {
  return assemble.src('templates/site2/*.hbs')
    .pipe(extname())
    .pipe(assemble.dest('build'));
});

assemble.task('build', ['preload', 'site1', 'site2']);

assemble.task('watch', function () {
  assemble.watch(['templates/**/*.hbs', '{defaults,data}/*.yaml'], ['build']);
});

assemble.task('default', ['build', 'watch']);

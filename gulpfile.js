var gulp = require('gulp');
var replace = require('gulp-string-replace');

gulp.task('default', function () {
  return gulp
    .src('./build/index.html')
    .pipe(replace('lang="ru"', 'lang="en"'))
    .pipe(
      replace(
        'Играйте в увлекательную онлайн-игру «Уголки» без регистрации! Эта захватывающая мультиплеерная игра позволяет вам пригласить друга и наслаждаться игровым процессом вместе в любое время и в любом месте. Игра с друзьями — это отличный способ проверить свои стратегические навыки и развлечься в компании.',
        'Play the exciting online game Corners without registration! This exciting multiplayer game allows you to invite a friend and enjoy the gameplay together anytime and anywhere. Playing with friends is a great way to test your strategic skills and have fun in a company.'
      )
    )
    .pipe(replace('«Уголки» | Играй с друзьями онлайн!', 'Corners | Play with friends online!'))
    .pipe(replace('Уголки', 'Corners'))
    .pipe(replace('не подключен', 'not connected'))
    .pipe(replace('игра', 'game'))
    .pipe(replace('QR код', 'QR code'))
    .pipe(replace('Вставить ссылку', 'Paste URL'))
    .pipe(replace('Скопировать ссылку', 'Copy URL'))
    .pipe(replace('Открыть настройки', 'Toggle settings'))
    .pipe(replace('Размер', 'Size'))
    .pipe(replace('Повернуть карту', 'Rotate desk'))
    .pipe(replace('Настольные игры', 'Board games'))
    .pipe(replace('Онлайн игры', 'Online games'))
    .pipe(replace('Мультиплеер', 'Multiplayer'))
    .pipe(replace('Игры с друзьями', 'Games with friends'))
    .pipe(replace('Кооперативные игры', 'Cooperative games'))
    .pipe(replace('Социальные игры', 'Social games'))
    .pipe(replace('Игровые платформы', 'Gaming platforms'))
    .pipe(replace('Игры на двоих', 'Two-player games'))
    .pipe(replace('Бесплатные игры', 'Free games'))
    .pipe(replace('Игры для компании', 'Party games'))
    .pipe(replace('Виртуальные развлечения', 'Virtual entertainment'))
    .pipe(gulp.dest('./build/en/'));
});

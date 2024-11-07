var gulp = require('gulp');
var replace = require('gulp-string-replace');

gulp.task('default', function () {
  return gulp
    .src('./build/index.html')
    .pipe(replace('lang="ru"', 'lang="en"'))
    .pipe(replace('Игра «Уголки» онлайн с другом.', 'Corners game play online with friend'))
    .pipe(
      replace(
        'Играйте в увлекательную игру «Уголки» онлайн без необходимости регистрации! Пригласите друга присоединиться к вам — просто отправьте ему ссылку, и вы сможете наслаждаться игрой вместе в любое время и в любом месте. «Уголки» — это отличная возможность проверить свои стратегические навыки и развлечься в компании. Присоединяйтесь к нам и погрузитесь в мир захватывающих сражений и дружеского соперничества!',
        'Play the exciting game "Corners" online without the need for registration! Invite a friend to join you—just send them the link, and you can enjoy the game together anytime and anywhere. "Corners" is a great opportunity to test your strategic skills and have fun with company. Join us and immerse yourself in a world of thrilling battles and friendly competition!'
      )
    )
    .pipe(replace('Уголки', 'Corners'))
    .pipe(replace('не подключен', 'not connected'))
    .pipe(replace('игра', 'game'))
    .pipe(replace('QR код', 'QR code'))
    .pipe(replace('Вставить ссылку', 'Paste URL'))
    .pipe(replace('Скопировать ссылку', 'Copy URL'))
    .pipe(replace('Открыть настройки', 'Toggle settings'))
    .pipe(replace('Размер', 'Size'))
    .pipe(replace('Повернуть карту', 'Rotate desk'))
    .pipe(gulp.dest('./build/en/'));
});

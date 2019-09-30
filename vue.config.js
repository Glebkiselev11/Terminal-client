const path = require('path');

module.exports = {
    // Это путь куда мы собираем продакшн (вызывая команду npm run build)
    outputDir: path.resolve(__dirname, '../public'),
}
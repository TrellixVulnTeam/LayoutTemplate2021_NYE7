git init - для инициализации гита;
git config --local(или --global для всех проектов) user.name(или email.name) "иммя(или почта)";
git status - для проверки статуса ;

git branch -M main - создается новая ветка;
git push -u oring main - загрузить файлы на github;

//Команды для работы
git add (-A или определённый файл например index.html или все *.html)
git commit -a -m"название комиита"
git push (загрузить на указанный выше брендч)
git pull - скачать с репозитория проект


…or push an existing repository from the command line
git remote add origin https://github.com/nardxxx/test.git
git branch -M main
git push -u origin main


//Инициализация git
git init
//Подключение к существуещему репозиторию
git remote add origin https://github.com/nardxxx/TerraCraft
//Или
git remote set-url origin https://github.com/nardxxx/TerraCraft
//Получение из репозитория коммитов
git fetch origin
//вносить свои изменения не с нуля, а начиная с головы репозитория.
git reset --mixed origin/ветка
git add
git commit -m "комментарий к коммиту"
git push -u origin ветка
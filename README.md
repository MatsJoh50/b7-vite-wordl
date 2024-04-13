# b7-vite-wordl
At the moment this is an unhardend version of a wordle game.
in the writing moment im working on a hardend upgrade, not sure if it will be compleate before deadline.

This app is using local mongoDB.
dbName: Highscores
collection: scores 
(connection found in "/backend/.env")


FRONTEND IS PRE-BUILT, no need to think about it.

==== how to start. ====
go to /backend
npm install
npm start
web browser => localhost:5080

the frontpage(index) is the game, choose your difficulty via the checkbox for filtering reaccuring letters or not.
the drop list to choose the length of your word
then press "start game"


Correct anwsers will be displayed as green
Incorrect as red
Misplaced as yellow.

HIGHSCORE
Similar to the game UI you filter what difficulty you want to see.
you will then be rediected to a renderd list for thepropper filter.
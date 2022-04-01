nohup npm run --prefix server start:dev > ./logs/server.log 2>&1 &
nohup npm run --prefix web start:dev > ./logs/web.log 2>&1 &

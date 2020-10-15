nohup npm run --prefix server start > ./logs/server.log 2>&1 &
nohup npm run --prefix web start > ./logs/web.log 2>&1 &

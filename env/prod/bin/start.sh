nohup npm run --prefix server start:debug > ./logs/server.log 2>&1 &
nohup npm run --prefix web start:qa > ./logs/web.log 2>&1 &

nohup npm run --prefix server --host=0.0.0.0 start > ./logs/server.log 2>&1 &
nohup npm run --prefix web --host=0.0.0.0 start > ./logs/web.log 2>&1 &

#!/bin/bash

ENVI=;
LPATH=;
if [[ 1 -gt $# ]]; then
  echo "Please specify the desired install configuration for the environment."
  echo " - (l) Local"
  echo " - (d) Dev"
  echo " - (q) QA"
  echo " - (p) Production"
  read -p "Environment (l/d/q/p): " ENVI
  echo;
else
  ENVI=$1
fi

case "$ENVI" in
  l)
    LPATH="/env/local/bin"
    ;;
  d)
    LPATH="/env/dev/bin"
    ;;
  q)
    LPATH="/env/qa/bin"
    ;;
  p)
    LPATH="/env/prod/bin"
    ;;
  *)
    echo $"Usage: $0 {l|d|q|p}"
    echo " - (l) Env = Local"
    echo " - (d) Env = Dev"
    echo " - (q) Env = QA"
    echo " - (p) Env = Production"
    exit 1
    ;;
esac

ln -s "$PWD$LPATH/start.sh" ./bin/startComponents.sh
LINK1S=$?
ln -s "$PWD$LPATH/stop.sh" ./bin/stopComponents.sh
LINK2S=$?

if [[ $LINK1S -ne 0 || $LINK2S -ne 0 ]]; then
  echo "FATAL: Problem creating symlinks!"
  exit 1
fi

npm --prefix ./server install ./server
N1S=$?
npm --prefix ./web install ./web
N2S=$?

if [[ $N1S -ne 0 || $N2S -ne 0 ]]; then
  echo "FATAL: Problem installing npm packages! Please install packages before starting components"
  exit 1
fi

echo;
echo "~~~~~ Web and Server components installed! ~~~~~"
echo "!! Please make sure that MongoDB is installed !!"
echo "!!    on the OS before using DB scripts or    !!"
echo "!!             starting components            !!"
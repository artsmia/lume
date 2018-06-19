#! /bin/bash

echo "Reserved Branches: cms, api, lume, dev"

reserved=(cms api dev lume)

echo $reserved

branch=$(git symbolic-ref --short HEAD)

echo $branch

for name in $reserved
do
  echo $name
  if [ $name == $branch ]
  then
    echo "Please choose a new name for your branch. $branch is a a reserved branch name."
    exit 1
  fi
done

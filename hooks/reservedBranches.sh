#! /bin/bash


reserved=(cms api dev lume)

echo "
Checking for reserved branches: (${reserved[*]})
"
echo ""

branch=$(git symbolic-ref --short HEAD)


for name in "${reserved[*]}"
do
  if [ "$name" == "$branch" ]
  then
    echo "Please choose a new name for your branch. $branch is a a reserved branch name."
    exit 1
  fi
done

echo "
No problems here. $branch is approved.
"
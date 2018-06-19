#! /bin/bash

echo "Reserved Branches: cms, api, lume, dev"

branch=$(git symbolic-ref HEAD)

echo $branch

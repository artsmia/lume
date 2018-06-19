#! /bin/bash

echo "Reserved Branches: cms, api, lume, dev"

branch=$(git symbolic-ref --short HEAD)

echo $branch

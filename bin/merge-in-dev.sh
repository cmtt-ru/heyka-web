#!/bin/bash

# Get current branch name
current_branch=$(git symbolic-ref -q HEAD)
current_branch=${current_branch##refs/heads/}
current_branch=${current_branch:-HEAD}

# Checkout develop branch
git checkout develop
git pull origin develop

# Merge current branch to develop
git merge $current_branch -m "Merge from sh script"
git push origin develop

# Checkout current branch back
git checkout $current_branch

printf "done"

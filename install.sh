#!/bin/bash

# [MACOS] install node
brew update
brew install node

# verify npm version
echo "npm version"
npm -v

# verify node installation
echo "node version"
node -v

# install packages and start server
npm install
npm start
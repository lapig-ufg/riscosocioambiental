#!/bin/bash
export NODE_ENV=prod; nohup /home/lapig-server/.nvm/v8.11.1/bin/node app-sicar-cluster.js &> app.out &
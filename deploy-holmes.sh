#!/bin/bash

set -e

cd /home/ubuntu/holmes-221b

echo "================================="
echo "Starting deployment..."
echo "================================="

echo "Pulling latest code..."
git pull origin main

echo "Installing dependencies..."
npm ci

echo "Building Next.js..."
npm run build

echo "Restarting application..."
pm2 restart nextjs-app

echo "Saving PM2..."
pm2 save

echo "================================="
echo "Deployment completed successfully"
echo "================================="
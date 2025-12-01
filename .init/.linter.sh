#!/bin/bash
cd /home/kavia/workspace/code-generation/angular-micro-front-end-components-and-authentication-suite-6574-6583/angular_frontend
npx eslint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi


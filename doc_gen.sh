#!/bin/sh
npx typedoc --tsconfig ./apps/express-backend/tsconfig.json  apps/express-backend/src/app/controllers/* apps/express-backend/src/db.connection.ts

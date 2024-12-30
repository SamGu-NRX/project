#!/bin/bash

pnpm install
pnpx prisma generate
pnpx prisma db push

call pnpm i
call pnpx prisma generate
call pnpx prisma db push

:: Start the development server (Optional)
call pnpm run dev

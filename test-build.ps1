# Clean existing files and folders
Remove-Item -Force -Recurse -ErrorAction SilentlyContinue .next, out, node_modules, package-lock.json
Remove-Item -Force -ErrorAction SilentlyContinue package.json

# Install core dependencies
Write-Host "Installing core dependencies..."
npm init -y
npm install next@14.2.16 react@18.3.1 react-dom@18.3.1
npm install @radix-ui/react-icons @radix-ui/react-slot @radix-ui/react-select class-variance-authority clsx date-fns lucide-react react-day-picker tailwind-merge tailwindcss-animate
npm install -D typescript @types/node @types/react @types/react-dom autoprefixer postcss tailwindcss eslint eslint-config-next

# Install and setup shadcn/ui
Write-Host "Setting up shadcn/ui..."
npm install -D @shadcn/ui
npx shadcn-ui@latest init

Write-Host "Adding shadcn/ui components..."
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add calendar
npx shadcn-ui@latest add select

Write-Host "Building project..."
npm run build

Write-Host "Build process completed. Check for any errors above." 
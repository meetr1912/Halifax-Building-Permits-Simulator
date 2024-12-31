# Clean existing files and folders
Remove-Item -Force -Recurse -ErrorAction SilentlyContinue .next, out, node_modules, package-lock.json
Remove-Item -Force -ErrorAction SilentlyContinue package.json

# Install correct Node.js version using nvm-windows
Write-Host "Installing correct Node.js version..."
nvm install 18.18.0
nvm use 18.18.0

# Create Next.js project with all the defaults
Write-Host "Creating Next.js project..."
$env:NEXT_TELEMETRY_DISABLED = "1"
npx create-next-app@latest halifax-permits --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-git --yes
Move-Item -Force halifax-permits/* .
Remove-Item -Force -Recurse halifax-permits

# Install additional dependencies
Write-Host "Installing additional dependencies..."
npm install @radix-ui/react-icons @radix-ui/react-slot @radix-ui/react-select class-variance-authority clsx date-fns lucide-react react-day-picker tailwind-merge tailwindcss-animate

# Create components.json for shadcn/ui
@'
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
'@ | Set-Content components.json

# Install and setup shadcn/ui
Write-Host "Setting up shadcn/ui..."
npm install -D @shadcn/ui
npx @shadcn/ui add button
npx @shadcn/ui add card
npx @shadcn/ui add calendar
npx @shadcn/ui add select

Write-Host "Building project..."
npm run build

Write-Host "Build process completed. Check for any errors above." 
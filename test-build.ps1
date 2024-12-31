# Clean up any existing files
Remove-Item -Force -Recurse -ErrorAction SilentlyContinue .next, out, node_modules, package-lock.json, .git
Remove-Item -Force -ErrorAction SilentlyContinue package.json, components.json, tailwind.config.ts
Remove-Item -Force -ErrorAction SilentlyContinue app/globals.css, lib/utils.ts

# Create Next.js project
Write-Host "Creating Next.js project..."
$env:NEXT_TELEMETRY_DISABLED = "1"
npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-git --yes

Write-Host "Installing additional dependencies..."
npm install @radix-ui/react-icons @radix-ui/react-slot @radix-ui/react-select class-variance-authority clsx date-fns lucide-react react-day-picker tailwind-merge tailwindcss-animate

Write-Host "Installing and initializing shadcn-ui..."
npm install -D @shadcn/ui
npx @shadcn/ui@latest init -y

Write-Host "Adding shadcn/ui components..."
$components = @("button", "card", "calendar", "select")
foreach ($component in $components) {
    Write-Host "Adding component: $component"
    echo "y" | npx @shadcn/ui@latest add $component
}

Write-Host "Building project..."
npm run build

Write-Host "Build process completed. Check for any errors above." 
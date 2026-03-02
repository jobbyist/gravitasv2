# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/65c2f9ed-16cc-427a-af29-7a59108fd09a

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/65c2f9ed-16cc-427a-af29-7a59108fd09a) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

This project is configured to automatically deploy to GitHub Pages with a custom domain.

### Automatic Deployment

The project uses GitHub Actions for automatic deployment:

- **Trigger**: Pushes to the `main` branch automatically trigger a deployment
- **Manual Deploy**: You can also trigger a deployment manually from the Actions tab
- **Custom Domain**: The site is deployed to [https://gravitas.uno](https://gravitas.uno)

### Deployment Configuration

The deployment is configured using:

- `.github/workflows/deploy.yml` - GitHub Actions workflow for building and deploying
- `public/CNAME` - Custom domain configuration (gravitas.uno)
- `.env.production` - Production environment variables
- `public/.nojekyll` - Prevents Jekyll processing on GitHub Pages

### GitHub Pages Setup

To enable GitHub Pages for this repository:

1. Go to repository Settings → Pages
2. Under "Build and deployment", select "Source: GitHub Actions"
3. The workflow will automatically deploy on pushes to main

### Custom Domain Setup

The custom domain `gravitas.uno` is already configured. To set up DNS:

1. Add an A record pointing to GitHub Pages IPs:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153
2. Or add a CNAME record pointing to: `jobbyist.github.io`

### Manual Deployment via Lovable

You can also deploy via [Lovable](https://lovable.dev/projects/65c2f9ed-16cc-427a-af29-7a59108fd09a) by clicking Share → Publish.

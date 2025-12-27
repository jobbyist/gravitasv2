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

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

### Automatic Deployment

Every push to the `main` branch will trigger an automatic deployment to GitHub Pages. The workflow will:
1. Install dependencies
2. Build the project using Vite
3. Deploy the built files to GitHub Pages

### Custom Domain Setup

This project is configured to use the custom domain **gravitas.uno**. To complete the DNS setup:

1. Go to your DNS provider and add these DNS records:
   - For apex domain (gravitas.uno):
     ```
     A     @     185.199.108.153
     A     @     185.199.109.153
     A     @     185.199.110.153
     A     @     185.199.111.153
     ```
   - For www subdomain (optional):
     ```
     CNAME www   jobbyist.github.io
     ```

2. In your GitHub repository settings:
   - Go to Settings → Pages
   - Under "Custom domain", enter: `gravitas.uno`
   - Enable "Enforce HTTPS" (wait for SSL certificate to provision)

3. Wait for DNS propagation (can take up to 48 hours, usually much faster)

### Manual Deployment

You can also manually trigger a deployment:
1. Go to the "Actions" tab in your GitHub repository
2. Select the "Deploy to GitHub Pages" workflow
3. Click "Run workflow"

### Alternative: Lovable Deployment

You can also deploy via [Lovable](https://lovable.dev/projects/65c2f9ed-16cc-427a-af29-7a59108fd09a) by clicking Share → Publish.

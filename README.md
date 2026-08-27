 # readme / studio

 An editable GitHub Profile README builder with live GitHub data, GitHub Flavored Markdown preview, generated animated SVG assets, and optional one-click publishing.

 ## Run locally

 ```bash
 npm install
 npm run dev
 ```

 Open http://localhost:3000.

 ## GitHub data

 Enter a public GitHub username in the editor. The app fetches public profile data through `/api/github/profile` and uses the repository count, contribution total, followers, following, avatar, and profile URL in the preview and generated Markdown.

 ## Publish to GitHub

 Copy `.env.example` to `.env.local`, create a GitHub OAuth App at https://github.com/settings/developers, and set:

 ```bash
 GITHUB_CLIENT_ID=your-client-id
 GITHUB_CLIENT_SECRET=your-client-secret
 GITHUB_REDIRECT_URI=http://localhost:3000/api/auth/github/callback
 ```

 The **Add to GitHub** action uses OAuth with `repo` access, creates the user profile repository when needed, and publishes `README.md` plus the generated SVG files under `assets/`. Do not commit `.env.local` or OAuth secrets.

 ## SVG assets

 The Studio generates editable SVGs for the hero, process diagram, project showcase, and footer. The downloaded README expects:

 ```text
 README.md
 assets/
	 profile-hero.svg
	 process-flow.svg
	 projects-showcase.svg
	 community-footer.svg
 ```

 ## Validate

 ```bash
 npm run build
 ```

# Getting started

This guide is written for someone new to web development. Do one step at a time.

## Tools to install

1. **Node.js (LTS):** https://nodejs.org/
2. **Visual Studio Code:** https://code.visualstudio.com/
3. **Git:** https://git-scm.com/downloads (optional initially; useful for working with GitHub)
4. **GitHub account:** https://github.com/

After installing Node.js, open Terminal (macOS) or PowerShell (Windows) and check:

```bash
node -v
npm -v
```

Both commands should print version numbers.

## Create the Next.js project

Open a terminal in the folder where you want the project to live, then run:

```bash
npx create-next-app@latest taste-of-leeds
```

When prompted, these beginner-friendly choices are recommended:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: Yes
- App Router: Yes
- Import alias: keep the default

Then:

```bash
cd taste-of-leeds
npm run dev
```

Open http://localhost:3000 in your browser. This is your local development website. Keep the terminal running while you view it.

## Open the project in VS Code

In the project terminal, run:

```bash
code .
```

If that command is not available, open VS Code and choose **File → Open Folder**, then select the `taste-of-leeds` folder.

## Connect the project to GitHub

Create an empty GitHub repository named `taste-of-leeds`. Do not add a README or .gitignore on GitHub if you already created those locally; this avoids an initial merge conflict.

In the project terminal, run the commands below, replacing `YOUR-GITHUB-USERNAME` with your GitHub username:

```bash
git init
git add .
git commit -m "Initial Taste of Leeds project"
git branch -M main
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/taste-of-leeds.git
git push -u origin main
```

If Git asks you to identify yourself, configure your Git name and email. Do not share passwords or access tokens in chat or commit them to the repository.

## Everyday development

1. Open the project folder in VS Code.
2. Run `npm run dev` in the terminal.
3. Edit files and save them.
4. Refresh the local website if needed.
5. When a change works, save it to GitHub:

```bash
git add .
git commit -m "Describe the change"
git push
```

## Important beginner notes

- `localhost:3000` is only your computer's local preview; other people cannot access it.
- GitHub stores your code; it does not automatically make a Next.js website live.
- We will connect Vercel for deployment later.
- Never commit `.env.local`, passwords, API keys or private user data.
- If a command fails, copy the full error message and ask for help before trying random fixes.

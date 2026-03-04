# XpCV

A Windows XP-themed portfolio site built with SvelteKit 5 and XP.css.

Live at [amoeslund.dk](https://amoeslund.dk)

## Features

- Authentic Windows XP desktop with draggable, resizable windows
- Start menu, taskbar, system tray with clock
- Desktop icons with drag-select support
- Login screen with Windows XP startup sound
- Right-click context menus

### Programs

- **About Me** - Portfolio introduction with tabbed interface
- **My Resume** - CV with experience, education, and skills
- **My Projects** - Project showcase with tree view
- **Contact Me** - Contact information
- **Internet Explorer** - With a ridiculous amount of toolbars
- **Notepad** - Classic notepad with menus
- **Minesweeper** - Fully playable with difficulty levels
- **DOOM** - Playable via js-dos (runs in isolated iframe)
- **Paint** - Drawing application
- **Run** - Try running something, I dare you

## Tech Stack

- **SvelteKit 5** with Svelte 5 runes
- **TypeScript**
- **XP.css** for Windows XP styling
- **Static adapter** for deployment

## Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

## Deployment

Pushes to `main` trigger a GitHub Actions workflow that builds the site and deploys it via rsync over SSH.

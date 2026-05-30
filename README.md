# Codex Now

Codex Now is a tiny macOS helper for beginners who want to open the current Finder folder with Codex without typing command-line steps.

Put the app in the Finder toolbar, open any folder, click Codex Now, then pick either:

- `Codex App`: runs `codex app` in that folder.
- `Codex CLI`: runs `codex` in that folder.

If no Finder folder is available, Codex Now will ask you to choose a folder.

`Codex App` opens quietly. `Codex CLI` opens Terminal because the CLI is interactive.

## Why

This project was inspired by Kazike's Claude Code Now. I made this small tool for my own Codex workflow, and for other beginners who want an easier first step into Codex CLI.

Codex CLI is powerful, but the first step can feel unfriendly if you are new:

```bash
cd /your/project/folder
codex app
```

Codex Now turns that into a small Mac app.

## Install

Clone this repository, then run:

```bash
./scripts/install.sh
```

The app will be installed to:

```text
~/Applications/Codex Now.app
```

To add it to Finder:

1. Open `~/Applications`.
2. Hold `Command`.
3. Drag `Codex Now.app` into the Finder toolbar.

After that, you can open any folder in Finder and click the toolbar icon to start Codex there.

## Build Only

```bash
./scripts/build.sh
```

The built app will appear in:

```text
build/Codex Now.app
```

## Requirements

- macOS
- Codex CLI installed and logged in
- Terminal app

## Notes

This is intentionally simple. It does not replace Codex. It only helps you start Codex in the right folder.

## License

MIT

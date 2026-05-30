# Codex Now

Codex Now is a tiny macOS helper for beginners who want to open a folder with Codex without typing command-line steps.

Double-click the app, choose your project folder, then pick either:

- `Codex App`: runs `codex app` in that folder.
- `Codex CLI`: runs `codex` in that folder.

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

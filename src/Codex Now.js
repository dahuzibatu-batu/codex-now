const app = Application.currentApplication();
app.includeStandardAdditions = true;
ObjC.import("Foundation");

function pathFromFileUrl(fileUrl) {
  const nsUrl = $.NSURL.URLWithString(fileUrl);
  return ObjC.unwrap(nsUrl.path);
}

function currentFinderFolderPath() {
  const finder = Application("Finder");

  if (!finder.running()) {
    return null;
  }

  try {
    if (finder.windows.length > 0) {
      return pathFromFileUrl(finder.windows[0].target().url());
    }
  } catch (error) {
    // Fall back to Finder's insertion location below.
  }

  try {
    return pathFromFileUrl(finder.insertionLocation().url());
  } catch (error) {
    return null;
  }
}

function chooseFolderPath() {
  const folder = app.chooseFolder({
    withPrompt: "Choose the folder you want to open with Codex:",
  });

  return Path(folder).toString();
}

function appExists(appPath) {
  return $.NSFileManager.defaultManager.fileExistsAtPath(appPath);
}

function openCliInTerminal(command) {
  const terminal = Application("Terminal");
  terminal.activate();
  terminal.doScript(`/bin/zsh -lc ${JSON.stringify(command)}`);
}

function openCliInIterm(command) {
  const iterm = Application("iTerm");
  iterm.activate();
  iterm.createWindowWithDefaultProfile();
  iterm.currentWindow.currentSession.write({ text: `/bin/zsh -lc ${JSON.stringify(command)}` });
}

const folderPath = currentFinderFolderPath() || chooseFolderPath();

const choice = app.displayDialog("How would you like to start Codex?", {
  buttons: ["Cancel", "Codex CLI", "Codex App"],
  defaultButton: "Codex App",
  cancelButton: "Cancel",
}).buttonReturned;

const codexCommand = choice === "Codex App" ? "codex app" : "codex";
const escapedFolder = folderPath.replace(/'/g, "'\\''");
const pathSetup = [
  "$HOME/.npm-global/bin",
  "$HOME/.local/bin",
  "/opt/homebrew/bin",
  "/usr/local/bin",
  "/usr/bin",
  "/bin",
  "/usr/sbin",
  "/sbin",
].join(":");

const shellCommand = [
  `export PATH="${pathSetup}:$PATH";`,
  "if ! command -v codex >/dev/null 2>&1; then",
  "echo 'Codex CLI was not found. Please install Codex CLI first, then try again.';",
  "exit 127;",
  "fi;",
  `cd '${escapedFolder}' && ${codexCommand}`,
].join(" ");

if (choice === "Codex App") {
  try {
    app.doShellScript(`/bin/zsh -lc ${JSON.stringify(shellCommand)}`);
  } catch (error) {
    app.displayDialog(String(error), {
      buttons: ["OK"],
      defaultButton: "OK",
      withIcon: "stop",
    });
  }
} else {
  if (appExists("/Applications/iTerm.app") || appExists("/Applications/iTerm2.app")) {
    openCliInIterm(shellCommand);
  } else {
    openCliInTerminal(shellCommand);
  }
}

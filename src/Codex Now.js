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

const folderPath = currentFinderFolderPath() || chooseFolderPath();

const choice = app.displayDialog("How would you like to start Codex?", {
  buttons: ["Cancel", "Codex CLI", "Codex App"],
  defaultButton: "Codex App",
  cancelButton: "Cancel",
}).buttonReturned;

const codexCommand = choice === "Codex App" ? "codex app" : "codex";
const escapedFolder = folderPath.replace(/'/g, "'\\''");
const shellCommand = `cd '${escapedFolder}' && ${codexCommand}`;

if (choice === "Codex App") {
  app.doShellScript(`/bin/zsh -lc ${JSON.stringify(shellCommand)}`);
} else {
  const terminal = Application("Terminal");
  terminal.activate();
  terminal.doScript(`/bin/zsh -lc ${JSON.stringify(shellCommand)}`);
}

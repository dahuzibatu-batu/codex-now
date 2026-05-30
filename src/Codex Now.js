const app = Application.currentApplication();
app.includeStandardAdditions = true;

const folder = app.chooseFolder({
  withPrompt: "Choose the folder you want to open with Codex:",
});

const folderPath = Path(folder).toString();

const choice = app.displayDialog("How would you like to start Codex?", {
  buttons: ["Cancel", "Codex CLI", "Codex App"],
  defaultButton: "Codex App",
  cancelButton: "Cancel",
}).buttonReturned;

const codexCommand = choice === "Codex App" ? "codex app" : "codex";
const escapedFolder = folderPath.replace(/'/g, "'\\''");
const shellCommand = `cd '${escapedFolder}' && ${codexCommand}`;

const terminal = Application("Terminal");
terminal.activate();
terminal.doScript(`/bin/zsh -lc ${JSON.stringify(shellCommand)}`);

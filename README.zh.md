# Codex Now

Codex Now 是一个给 macOS 新手用的小工具：不用先学一堆命令行，就可以在指定文件夹里启动 Codex。

你只需要双击 App，选择你的项目文件夹，然后选择启动方式：

- `Codex App`：在这个文件夹里运行 `codex app`
- `Codex CLI`：在这个文件夹里运行 `codex`

## 为什么做这个

这个项目受卡兹克大佬的 Claude Code Now 启发。我做它最开始是给自己用 Codex 准备的，也希望它能帮到同样刚开始接触 Codex CLI 的新手。

Codex CLI 很强，但对新手来说，第一步可能就有点吓人：

```bash
cd /你的项目文件夹
codex app
```

Codex Now 想把这一步变成一个轻量的小 App。

## 安装

下载这个项目后，在项目文件夹里运行：

```bash
./scripts/install.sh
```

安装后 App 会出现在：

```text
~/Applications/Codex Now.app
```

以后你可以直接双击它。

## 只构建，不安装

```bash
./scripts/build.sh
```

构建后的 App 会出现在：

```text
build/Codex Now.app
```

## 需要什么

- macOS
- 已经安装并登录 Codex CLI
- macOS 自带的 Terminal

## 它不做什么

它不是 Codex 的替代品，也不会改你的项目文件。它只做一件事：帮你在正确的文件夹里启动 Codex。

## 许可证

MIT

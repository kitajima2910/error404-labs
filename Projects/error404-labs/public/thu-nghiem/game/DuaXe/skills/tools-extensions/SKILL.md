---
name: tools-extensions
description: VS Code extension — commands, views, providers, config. Không block UI, đúng lifecycle, production-ready.
---

# tools-extensions — IDE Extensions

## VS Code Extension (cơ bản)

```typescript
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  // Status bar item
  const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  statusBar.text = "$(tools) Công cụ của tôi";
  statusBar.command = "mytool.open";
  statusBar.show();
  context.subscriptions.push(statusBar);

  // Command
  const disposable = vscode.commands.registerCommand("mytool.hello", () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage("Không có editor nào đang mở");
      return;
    }
    const selection = editor.selection;
    const text = editor.document.getText(selection);
    vscode.window.showInformationMessage(`Đã chọn: ${text.substring(0, 100)}`);
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {
  // Cleanup resources
}
```

## Tree View Provider

```typescript
class MyTreeItem extends vscode.TreeItem {
  constructor(
    public label: string,
    public collapsibleState: vscode.TreeItemCollapsibleState,
    public description?: string
  ) {
    super(label, collapsibleState);
  }
}

class MyTreeProvider implements vscode.TreeDataProvider<MyTreeItem> {
  private _onDidChangeTreeData = new vscode.EventEmitter<MyTreeItem | undefined>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire(undefined);
  }

  getTreeItem(element: MyTreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: MyTreeItem): Thenable<MyTreeItem[]> {
    if (element) return Promise.resolve([]);
    return Promise.resolve([
      new MyTreeItem("Item 1", vscode.TreeItemCollapsibleState.None, "Description"),
      new MyTreeItem("Item 2", vscode.TreeItemCollapsibleState.Collapsible, "Has children"),
    ]);
  }
}
```

## Webview Panel

```typescript
class MyWebview {
  private panel: vscode.WebviewPanel | undefined;

  show(context: vscode.ExtensionContext) {
    if (this.panel) {
      this.panel.reveal();
      return;
    }

    this.panel = vscode.window.createWebviewPanel(
      "myTool",
      "My Tool",
      vscode.ViewColumn.One,
      { enableScripts: true }
    );

    this.panel.webview.html = this.getHtml();
    this.panel.onDidDispose(() => { this.panel = undefined; });
  }

  private getHtml(): string {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { padding: 16px; font-family: var(--vscode-font-family); }
    button { background: var(--vscode-button-background); color: var(--vscode-button-foreground); border: none; padding: 8px 16px; cursor: pointer; }
  </style>
</head>
<body>
  <h1>My Tool</h1>
  <button onclick="hello()">Hello</button>
  <script>
    function hello() { alert('Hello from extension!'); }
  </script>
</body>
</html>`;
  }
}
```

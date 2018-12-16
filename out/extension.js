"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 'use strict';
const vscode = require("vscode");
const vscode_1 = require("vscode");
// import { writeFile } from 'fs';
function activate(context) {
    console.log('TypeScriptRunner is active');
    let createTypings = vscode.commands.registerCommand('AdobeTypescriptRunner.injectAI', () => {
        let tempType = new adobeType();
        let controller = new adobeTypeController(tempType);
        vscode.window.showInformationMessage('Generating tsconfig for Illustrator');
        const hasPath = vscode.window.activeTextEditor.document.fileName || false;
        const directory = (hasPath) ? hasPath.match(/.*(\\|\/)/)[0] : false;
        const tempfile = vscode_1.Uri.file(`${directory}tsconfig.json`);
        const tempdir = vscode_1.Uri.file(vscode.window.activeTextEditor.document.fileName);
        const tempspace = vscode.workspace.getWorkspaceFolder(tempdir);
        tempfile.scheme === 'file';
        tempfile.path === `${directory}tsconfig.json`;
        tempfile.fragment === '';
        console.log(hasPath);
        console.log(directory);
        console.log(tempspace.uri.path);
        // If workspace root has node_modules
        // If has pravdomil/types
        // create tsconfig
        // Else open terminal and install pravdomil/types
        // create tsconfig
        // Else open terminal
        // npm init -y
        // npm install pravdomil/types-for-adobe
        // create tsconfig
        // writeFile(`${directory}tsconfig.json`, JSON.stringify(tempFile.settings), null)
    });
    context.subscriptions.push(createTypings);
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
class adobeType {
    constructor() {
        this._statusBarItem = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left);
        this.settings = {
            compileOnSave: true,
            compilerOptions: {
                outFile: 'compile.jsx',
                allowJs: true,
                noLib: true,
                types: ['types-for-adobe/illustrator/2015.3']
            },
            files: ['main.ts'],
            exclude: ['node_modules']
        };
    }
    _getActiveApp(doc) {
        let docContent = doc.getText();
        return 'ILST';
    }
    _updateActiveApp() {
        let editor = vscode_1.window.activeTextEditor;
        if (!editor) {
            this._statusBarItem.hide();
            return;
        }
        let doc = editor.document;
        if (doc.languageId === "typescript") {
            this._statusBarItem.text = `$(code) Illustrator is active`;
            this._statusBarItem.show();
        }
        else {
            this._statusBarItem.hide();
        }
    }
    dispose() {
        this._statusBarItem.dispose();
    }
}
class adobeTypeController {
    constructor(adobeType) {
        this._adobeType = adobeType;
        let subscriptions = [];
        vscode_1.window.onDidChangeTextEditorSelection(this._onEvent, this, subscriptions);
        vscode_1.window.onDidChangeActiveTextEditor(this._onEvent, this, subscriptions);
        this._adobeType._updateActiveApp();
        this._disposable = vscode_1.Disposable.from(...subscriptions);
    }
    dispose() {
        this._disposable.dispose();
    }
    _onEvent() {
        this._adobeType._updateActiveApp();
    }
}
//# sourceMappingURL=extension.js.map
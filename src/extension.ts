// 'use strict';
import * as vscode from 'vscode';
import { window, commands, Uri, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument } from 'vscode';
// import { writeFile } from 'fs';

export function activate(context: vscode.ExtensionContext) {
    console.log('TypeScriptRunner is active');

    let createTypings = vscode.commands.registerCommand('AdobeTypescriptRunner.injectAI', () => {
        let tempType = new adobeType();
        let controller = new adobeTypeController(tempType);

        vscode.window.showInformationMessage('Generating tsconfig for Illustrator');

        const hasPath = vscode.window.activeTextEditor.document.fileName || false;
        const directory = (hasPath) ? hasPath.match(/.*(\\|\/)/)[0] : false;

        const tempfile = Uri.file(`${directory}tsconfig.json`);
        const tempdir = Uri.file(vscode.window.activeTextEditor.document.fileName);
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

export function deactivate() {
    
}


class adobeType {

    private _statusBarItem: StatusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);

    public settings = {
        compileOnSave: true,
        compilerOptions: {
            outFile: 'compile.jsx',
            allowJs: true,
            noLib: true,
            types: ['types-for-adobe/illustrator/2015.3']
        },
        files: ['main.ts'],
        exclude: ['node_modules']
    }

    public _getActiveApp(doc: TextDocument): string {
        let docContent = doc.getText();
        return 'ILST';
    }

    public _updateActiveApp() {
        let editor = window.activeTextEditor;
        if (!editor) {
            this._statusBarItem.hide();
            return;
        }
        let doc = editor.document;
        if (doc.languageId === "typescript") {
            this._statusBarItem.text = `$(code) Illustrator is active`;
            this._statusBarItem.show();
        } else {
            this._statusBarItem.hide();
        }
    }

    dispose() {
        this._statusBarItem.dispose();
    }
}

class adobeTypeController {

    private _adobeType: adobeType;
    private _disposable: Disposable;

    constructor(adobeType: adobeType) {
        this._adobeType = adobeType;
        let subscriptions: Disposable[] = [];
        window.onDidChangeTextEditorSelection(this._onEvent, this, subscriptions);
        window.onDidChangeActiveTextEditor(this._onEvent, this, subscriptions);
        this._adobeType._updateActiveApp();
        this._disposable = Disposable.from(...subscriptions);
    }

    dispose() {
        this._disposable.dispose();
    }

    private _onEvent() {
        this._adobeType._updateActiveApp();
    }
}
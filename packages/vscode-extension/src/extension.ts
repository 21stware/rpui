import * as vscode from 'vscode';
import { registerCompletion } from './completion';
import { registerDiagnostics } from './diagnostics';
import { registerPreview } from './preview';
import { registerHover } from './hover';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(registerCompletion(context));
  context.subscriptions.push(registerDiagnostics(context));
  context.subscriptions.push(registerHover(context));
  for (const d of registerPreview(context)) context.subscriptions.push(d);
}

export function deactivate() {
  /* disposables are cleaned up via context.subscriptions */
}

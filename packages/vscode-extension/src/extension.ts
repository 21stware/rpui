import * as vscode from 'vscode';
import { registerCompletion } from './completion';
import { registerDiagnostics } from './diagnostics';
import { registerPreview } from './preview';
import { registerHover } from './hover';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(registerCompletion(context));
  context.subscriptions.push(registerDiagnostics(context));
  context.subscriptions.push(registerHover(context));
  try {
    for (const d of registerPreview(context)) context.subscriptions.push(d);
  } catch (e: unknown) {
    // Guard against "command already exists" when a packaged .vsix and the dev
    // extension are both active simultaneously — activation still succeeds.
    if (!(e instanceof Error && e.message.includes('already exists'))) throw e;
  }
}

export function deactivate() {
  /* disposables are cleaned up via context.subscriptions */
}

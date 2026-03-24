import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from 'dotenv';

dotenv.config();
export function activate(context: vscode.ExtensionContext) {

    const disposable = vscode.commands.registerCommand(
        'sqlConverter.processFolder',
        async () => {

            try {
                // 1. Select Input Folder
                const inputUri = await vscode.window.showOpenDialog({
                    canSelectFolders: true,
                    canSelectFiles: false,
                    canSelectMany: false,
                    openLabel: 'Select Input Folder'
                });

                if (!inputUri) {
                    vscode.window.showWarningMessage("No input folder selected");
                    return;
                }

                const inputDir = inputUri[0].fsPath;

                // 2. Select Output Folder
                const outputUri = await vscode.window.showOpenDialog({
                    canSelectFolders: true,
                    canSelectFiles: false,
                    canSelectMany: false,
                    openLabel: 'Select Output Folder'
                });

                if (!outputUri) {
                    vscode.window.showWarningMessage("No output folder selected");
                    return;
                }

                const outputDir = outputUri[0].fsPath;
                
                const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
                const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

                // Ask user for prompt
                const userPrompt = await vscode.window.showInputBox({
                    prompt: "Enter prompt to process SQL files",
                    placeHolder: "e.g. Convert SQL to human-readable explanation"
                });

                if (!userPrompt) {
                    vscode.window.showWarningMessage("No prompt provided");
                    return;
                }

                const files = fs.readdirSync(inputDir);
                let processedCount = 0;

                for (const file of files) {
                    if (file.endsWith('.sql')) {

                        const srcPath = path.join(inputDir, file);
                        const fileNameWithoutExt = path.parse(file).name;

                        const content = fs.readFileSync(srcPath, 'utf-8');

                        // 🔥 GEMINI CALL
                        const result = await model.generateContent(
                            `${userPrompt}\n\nSQL:\n${content}`
                        );

                        const response = await result.response;
                        const aiOutput = response.text();

                        const outputFileName = fileNameWithoutExt + '_processed.txt';
                        const destPath = path.join(outputDir, outputFileName);

                        fs.writeFileSync(destPath, aiOutput, 'utf-8');

                        processedCount++;
                    }
                }

                vscode.window.showInformationMessage(
                    `Processed ${processedCount} files with Gemini AI 🚀`
                );
            } catch (error: any) {
                vscode.window.showErrorMessage(`Error: ${error.message}`);
            }
        }
    );

    context.subscriptions.push(disposable);
}

export function deactivate() {}

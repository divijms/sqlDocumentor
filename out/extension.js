"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const generative_ai_1 = require("@google/generative-ai");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
function activate(context) {
    const disposable = vscode.commands.registerCommand('sqlConverter.processFolder', async () => {
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
            const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
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
                    const result = await model.generateContent(`${userPrompt}\n\nSQL:\n${content}`);
                    const response = await result.response;
                    const aiOutput = response.text();
                    const outputFileName = fileNameWithoutExt + '_processed.txt';
                    const destPath = path.join(outputDir, outputFileName);
                    fs.writeFileSync(destPath, aiOutput, 'utf-8');
                    processedCount++;
                }
            }
            vscode.window.showInformationMessage(`Processed ${processedCount} files with Gemini AI 🚀`);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Error: ${error.message}`);
        }
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map
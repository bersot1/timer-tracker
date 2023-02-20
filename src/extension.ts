import * as vscode from 'vscode';
import * as fs from 'fs';

const child_process = require('child_process');
const os = require('os');
const path = require('path');


export function activate(context: vscode.ExtensionContext) {
	let startTime: Date;

	context.subscriptions.push(vscode.debug.onDidStartDebugSession(session => {
		startTime = new Date();
	}))

	context.subscriptions.push(vscode.debug.onDidTerminateDebugSession(session => {
		saveTimeSpent(startTime, 'debug');
	}));

	function saveTimeSpent(startTime: Date, commandName: string) {
		let endTime = new Date();
		let timeSpent = endTime.getTime() - startTime.getTime();
		const today = new Date().toISOString();

		const data = { today, timeSpent, commandName };

		const filePath = path.join(os.homedir(), '.builds.json');

		fs.writeFile(filePath, JSON.stringify(data) + '\n', { flag: 'a' }, (err: any) => {
			if (err) {
				console.error('Error saving build data:', err);
			} else {
				console.log('Build data saved successfully');
			}
		});
	}
}

export function deactivate() { }

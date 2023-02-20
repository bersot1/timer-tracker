import * as vscode from 'vscode';
import * as fs from 'fs';

const child_process = require('child_process');
const os = require('os');
const path = require('path');


export function activate(context: vscode.ExtensionContext) {

	const regex = /\d+(\.\d+)?/g;
	const regexGetOS = /(ios|android)/i;

	const buildDoneLogiOS = 'Xcode build done.';
	const buildDoneLogAndroid = 'Built build/app/outputs/flutter-apk';

	let buildStartTime: Date | undefined;

	let programName = '';
	let deviceName = '';


	context.subscriptions.push(vscode.debug.onDidReceiveDebugSessionCustomEvent(event => {

		console.log(event);

		buildStartTime = new Date;

		if (event.body.message.includes(buildDoneLogiOS) || event.body.message.includes(buildDoneLogAndroid)) {

			deviceName = event.session.configuration.deviceName.match(regexGetOS)[0];
			programName = event.session.configuration.cwd;

			if (deviceName == 'ios') {

				const result = event.body.message.match(regex);
				saveTimeSpent(result[0], 'Start Debugging (F5)');

			} else {

				let endTime = new Date();
				let timeSpent = (endTime.getTime() - buildStartTime.getTime()) / 1000;

				saveTimeSpent(timeSpent.toString(), 'Start Debugging (F5)')

			}
		}
	}))


	function saveTimeSpent(timeSpent: string, commandName: string) {
		const today = new Date().toISOString();

		const data = {
			"datetime": today,
			"command": commandName,
			"duration (seconds)": timeSpent,
			"project": programName,
			"device": deviceName,
		};

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

# Build Time Tracker for VS Code
This is an extension for Visual Studio Code that tracks the time spent building and debugging Flutter applications. It listens to events that occur during the build and debugging process and saves the data in a JSON file.

## Features
* Tracks the time spent building and debugging Flutter applications
* Saves the build data in a JSON file for later analysis
* Detects the platform (iOS or Android) being debugged and saves the data accordingly

## How to Install
1. Open Visual Studio Code
2. Click on the "Extensions" icon on the left-hand side of the screen
3. Search for "Build Time Tracker" and click "Install"
4. Restart Visual Studio Code

## How to Use
1. Open a Flutter project in Visual Studio Code
2. Press F5 to start debugging the application
3. The extension will automatically detect when the build is finished and save the data in the JSON file
4. The file is saved in the user's home directory under the name .builds.json

## Features to be Added
* The ability to view the build data in a more user-friendly format directly within the VS Code interface
* Integration with analytics platforms like Google Analytics to provide more insight into the build process
* The ability to filter build data by project, device, and date range
* Integration with popular project management tools like Trello and Asana to automatically log build data as tasks in these tools


## File Location
The data is saved in a JSON file called .builds.json located in the user's home directory. The file can be accessed using the following path:

`<user home directory>/.builds.json`

For example, on a Mac, the file would be located in the following path:

`/Users/<username>/.builds.json` 

## Contribution
This extension is open-source, and contributions are welcome! If you encounter any issues or have suggestions for improvements, please open an issue on the Github repository.

## License
This extension is licensed under the MIT License.
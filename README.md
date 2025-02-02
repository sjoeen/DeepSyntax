DeepSyntax - AI-powered VS Code Extension

This is a self-made Visual Studio Code extension that takes advantage of the open-source DeepSeek models.In order to comply with open-source licensing and free-use laws, I have not included the models within the GitHub repository. You must download them separately.

How to Run the Extension

1. Download the AI Model

You need to download the desired open-source AI model that best suits your computing power.(I have opted for the deepseek-r1:7b model.)

To download a model, you can use Ollama, which is required to run the extension.Make sure to run the download command inside the project directory.

To install DeepSeek 7B, run:

ollama pull deepseek-r1:7b

If you want to use a different model, modify the model name in src/extension.ts, inside the ollama.chat() function.

2. Install the Required Dependencies

Before running the extension, install the necessary dependencies by running:

npm install

3. Compile the Extension

Compile the TypeScript code to JavaScript:

npm run compile

4. Run the Extension in VS Code

To test the extension in a development environment, run:

code .

Then, start the extension with:

npm run watch

Or manually launch it by pressing F5 in VS Code.

5. Package and Install the Extension

Once you're satisfied with the extension, you can package and install it in VS Code:

Package the extension:

vsce package

This will generate a .vsix file, e.g., deepsyntax-0.0.1.vsix.

Install the extension:

Open VS Code.

Go to Extensions (Ctrl+Shift+X).

Click the ⋮ (three dots) at the top right and select "Install from VSIX...".

Select the generated .vsix file.

Start using the extension:

Open the Command Palette (Ctrl+Shift+P).

Run the command:

DeepSyntax: Open AI Chat

Enjoy AI-powered syntax assistance!

Customizing the Model

If you want to use another AI model, edit the model name in src/extension.ts, inside the ollama.chat() function:

const streamResponse = await ollama.chat({
    model: 'deepseek-r1:7b', // Change this if using another model
    messages: [{ role: 'user', content: userPrompt }],
    stream: true
});

Known Issues

The performance of the AI model depends on your CPU, GPU, and RAM.

DeepSeek 7B is heavy and may run slowly on low-end devices. Consider using a smaller model if you experience lag.

Ensure Ollama is installed and running before starting the extension.

Contributing

Feel free to submit issues, feature requests, or pull requests to improve the extension.

License

This project is licensed under the MIT License

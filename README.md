# DeepSyntax - AI-powered VS Code Extension

This is a self-made Visual Studio Code extension that takes advantage of the open-source DeepSeek models. In order to comply with open-source licensing and free-use laws, I have not included the models within the GitHub repository. You must download them separately.

## How to Run the Extension

### 1. Download the AI Model

You need to download the desired open-source AI model that best suits your computing power. (I have opted for the `deepseek-r1:7b` model.)

To download a model, you can use [Ollama](https://ollama.ai/), which is required to run the extension. Make sure to run the download command inside the project directory.

To install DeepSeek 7B, run:

```bash
ollama pull deepseek-r1:7b
```
If you want to use a different model, modify the model name in src/extension.ts, inside the ollama.chat() function. 

2. Install the Required tolls
```bash
npm install
```

3. Compile extension:
   
```bash
vsce package
```
Open VS Code.
Go to Extensions (Ctrl+Shift+X).

Click the ⋮ (three dots) at the top right and select "Install from VSIX...".

Select the generated .vsix file

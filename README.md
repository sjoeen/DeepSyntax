# DeepSyntax - AI-powered VS Code Extension

This is a self-made Visual Studio Code extension that takes advantage of the open-source **DeepSeek** models.  
In order to comply with open-source licensing and free-use laws, **I have not included the models within the GitHub repository**. You must download them separately.

---

## How to Run the Extension

### 1. Download the AI Model
You need to download the desired open-source AI model that best suits your computing power.  
**(I have opted for the `deepseek-r1:7b` model.)**  

To download a model, you can use **Ollama**, which is required to run the extension.  
Make sure to run the download command **inside the project directory**.

To install **DeepSeek 7B**, run:
```sh
ollama pull deepseek-r1:7b

**note** if you opt for a different LLM, you must change the variable name within the exstention.ts file.

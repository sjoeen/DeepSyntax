// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import ollama from 'ollama';



export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('deepsyntax.start', () => {
        const panel = vscode.window.createWebviewPanel(
            'deepSyntax',
            'Deep Seek Chat',
            vscode.ViewColumn.One,
            { enableScripts: true }
        );

        panel.webview.html = GetViewContent();

        // Lytter etter meldinger fra WebView
        panel.webview.onDidReceiveMessage(async (message: any) => {
            if (message.command === 'chat') {
                const userPrompt = message.text;
                let responseText = '';

                try {
                    const streamResponse = await ollama.chat({
                        model: 'deepseek-r1:7b',
                        messages: [{ role: 'user', content: userPrompt }],
                        stream: true
                    });

                    for await (const part of streamResponse) {
                        responseText += part.message.content;
                        // Send hele akkumulerte svaret hver gang
                        panel.webview.postMessage({ 
                            type: 'response',
                            content: responseText // Send hele teksten, ikke bare deler
                        });
                    }
                    

                } catch (err) {
                    vscode.window.showErrorMessage(`Feil ved AI-kommunikasjon: ${err}`);
                }
            }
        }, undefined, context.subscriptions);
    });

    context.subscriptions.push(disposable);
}



// This method is called when your extension is deactivated
export function deactivate() {}

function GetViewContent(): string {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Deep Seek Chat</title>
            <style>
                :root {
                    --primary-color: #10a37f;
                    --background-color: #ffffff;
                    --text-color: #333333;
                    --border-color: #e0e0e0;
                }

                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }

                body {
                    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
                    background-color: var(--background-color);
                    color: var(--text-color);
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                }

                .chat-container {
                    flex: 1;
                    max-width: 800px;
                    margin: 0 auto;
                    width: 100%;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                }

                .chat-header {
                    text-align: center;
                    padding: 20px 0;
                    border-bottom: 1px solid var(--border-color);
                    margin-bottom: 20px;
                }

                .chat-header h1 {
                    color: var(--primary-color);
                    font-size: 1.8rem;
                    font-weight: 600;
                }

                #chat {
                    flex: 1;
                    overflow-y: auto;
                    padding: 10px;
                    margin-bottom: 20px;
                    background-color: #f8f9fa;
                    border-radius: 8px;
                }

                .message {
                    max-width: 80%;
                    margin: 10px 0;
                    padding: 12px 16px;
                    border-radius: 12px;
                    line-height: 1.5;
                    animation: fadeIn 0.3s ease;
                }

                .user-message {
                    background-color: var(--primary-color);
                    color: white;
                    margin-left: auto;
                }

                .bot-message {
                    background-color: white;
                    color: var(--text-color);
                    border: 1px solid var(--border-color);
                    margin-right: auto;
                }

                .input-container {
                    display: flex;
                    gap: 10px;
                    padding: 20px 0;
                    border-top: 1px solid var(--border-color);
                }

                #prompt {
                    flex: 1;
                    padding: 12px 16px;
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    font-size: 1rem;
                    transition: border-color 0.2s;
                }

                #prompt:focus {
                    outline: none;
                    border-color: var(--primary-color);
                    box-shadow: 0 0 0 2px rgba(16, 163, 127, 0.1);
                }

                #askBtn {
                    padding: 12px 24px;
                    background-color: var(--primary-color);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: background-color 0.2s;
                }

                #askBtn:hover {
                    background-color: #0d8a6d;
                }

                .loading-indicator {
                    display: none;
                    padding: 12px;
                    text-align: center;
                    color: #666;
                    font-style: italic;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (prefers-color-scheme: dark) {
                    :root {
                        --background-color: #1a1a1a;
                        --text-color: #e0e0e0;
                        --border-color: #333333;
                    }

                    .bot-message {
                        background-color: #2d2d2d;
                    }

                    #chat {
                        background-color: #121212;
                    }
                }
            </style>
        </head>
        <body>
            <div class="chat-container">
                <div class="chat-header">
                    <h1>DeepSyntax Chat</h1>
                </div>
                
                <div id="chat">
                    <div class="message bot-message">
                        Halla sjef! Hvordan kan rizze deg idag? 😊
                    </div>
                </div>

                <div class="input-container">
                    <input type="text" id="prompt" placeholder="Skriv din melding her..." />
                    <button id="askBtn">Send</button>
                </div>
                <div class="loading-indicator" id="loading">Svar kommer...</div>
            </div>

            <script>
                const vscode = acquireVsCodeApi();
                const chatElement = document.getElementById('chat');
                const loadingIndicator = document.getElementById('loading');

                window.addEventListener('message', (event) => {
                    if (event.data.type === 'response') {
                        const lastMessage = chatElement.lastElementChild;
                        if (lastMessage && lastMessage.classList.contains('bot-message')) {
                            lastMessage.textContent = event.data.content;
                        } else {
                            const messageDiv = document.createElement('div');
                            messageDiv.className = 'message bot-message';
                            messageDiv.textContent = event.data.content;
                            chatElement.appendChild(messageDiv);
                        }
                        chatElement.scrollTop = chatElement.scrollHeight;
                        loadingIndicator.style.display = 'none';
                    }
                });

                document.getElementById('askBtn').addEventListener('click', () => {
                    const text = document.getElementById('prompt').value.trim();
                    if (text) {
                        // Add user message
                        const userDiv = document.createElement('div');
                        userDiv.className = 'message user-message';
                        userDiv.textContent = text;
                        chatElement.appendChild(userDiv);
                        
                        // Show loading
                        loadingIndicator.style.display = 'block';
                        chatElement.scrollTop = chatElement.scrollHeight;

                        // Send to extension
                        vscode.postMessage({ command: 'chat', text });
                        document.getElementById('prompt').value = '';
                    }
                });

                // Handle Enter key
                document.getElementById('prompt').addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        document.getElementById('askBtn').click();
                    }
                });
            </script>
        </body>
        </html>
    `;
}
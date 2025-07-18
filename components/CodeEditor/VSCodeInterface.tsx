import React, { useState } from "react";
import { FileTree } from "./FileTree";
import { EditorBreadcrumb } from "./EditorTabs";
import { MonacoEditor } from "./MonacoEditor";

interface OpenFile {
  path: string;
  name: string;
  content: string;
  isDirty: boolean;
}

export const VSCodeInterface: React.FC = () => {
  const [currentFile, setCurrentFile] = useState<OpenFile | null>(null);

  const handleFileSelect = (path: string, content: string) => {
    const fileName = path.split("/").pop() || path;

    // If the same file is selected, do nothing
    if (currentFile?.path === path) {
      return;
    }

    // Replace with the new file (only one open at a time)
    setCurrentFile({
      path,
      name: fileName,
      content,
      isDirty: false,
    });
  };

  const handleClose = () => {
    setCurrentFile(null);
  };

  const handleContentChange = (content: string) => {
    if (!currentFile) return;

    setCurrentFile((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        content,
        isDirty: true,
      };
    });
  };

  // Open layout.tsx by default
  React.useEffect(() => {
    if (!currentFile) {
      const defaultContent = `import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TypeScript Code Editor",
  description: "A powerful TypeScript code editor with Monaco Editor",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}`;
      handleFileSelect("app/layout.tsx", defaultContent);
    }
  }, []);

  return (
    <div className="h-screen bg-neutral-950 text-white flex flex-col">
      {/* Title Bar */}
      {/* <div className="h-8 bg-vscode-bg border-b border-vscode-border flex items-center px-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 text-center text-sm text-vscode-text-muted">
          VS Code - Monaco Editor
        </div>
      </div> */}

      <div className="flex flex-1 overflow-hidden">
        {/* File Explorer */}
        <FileTree
          onFileSelect={handleFileSelect}
          selectedFile={currentFile?.path ?? null}
        />

        {/* Editor Area */}
        <div className="flex-1 flex flex-col">
          {/* Editor Breadcrumb */}
          {currentFile && (
            <EditorBreadcrumb
              path={currentFile.path}
              isDirty={currentFile.isDirty}
              onClose={handleClose}
            />
          )}

          {/* Editor */}
          <div className="flex-1">
            {currentFile ? (
              <MonacoEditor
                value={currentFile.content}
                onChange={handleContentChange}
                language="typescript"
                fileName={currentFile.name}
              />
            ) : (
              <div className="h-full bg-neutral-950 flex items-center justify-center">
                <div className="text-center text-neutral-700">
                  <h2 className="text-2xl mb-4">Welcome to CODE-SHAKE</h2>
                  <p>Select a file from the explorer to start editing</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      {/* <div className="h-6 bg-vscode-selected border-t border-vscode-border flex items-center px-4 text-xs text-white">
        <span className="mr-4">TypeScript React</span>
        <span className="mr-4">UTF-8</span>
        <span className="mr-4">LF</span>
        <span className="mr-4">Spaces: 2</span>
        <div className="flex-1"></div>
        <span>Ln 1, Col 1</span>
      </div> */}
    </div>
  );
};

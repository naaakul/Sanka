import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';

interface MonacoEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  fileName: string;
}

export const MonacoEditor: React.FC<MonacoEditorProps> = ({
  value,
  onChange,
  language,
  fileName
}) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;

    // Define a custom theme based on vs-dark with the desired background color
    monaco.editor.defineTheme('custom-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#0F0F10' // Set the background color here
      }
    });

    // Set the custom theme
    monaco.editor.setTheme('custom-dark');

    // Configure TypeScript compiler options
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: 'React',
      allowJs: true,
      typeRoots: ['node_modules/@types']
    });

    // Enable TypeScript diagnostics
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false
    });

    // Add React types
    const reactTypes = `
declare module 'react' {
  export interface Component<P = {}, S = {}> {}
  export interface ReactNode {}
  export interface ReactElement {}
  export function createElement(type: any, props?: any, ...children: any[]): ReactElement;
  export const useState: <T>(initial: T) => [T, (value: T) => void];
  export const useEffect: (effect: () => void | (() => void), deps?: any[]) => void;
  export const FC: <P = {}>(props: P) => ReactElement | null;
}`;

    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      reactTypes,
      'file:///node_modules/@types/react/index.d.ts'
    );

    // Add Next.js types
    const nextTypes = `
declare module 'next' {
  export interface Metadata {
    title?: string;
    description?: string;
  }
}

declare module 'next/font/google' {
  export function Inter(options: { subsets: string[] }): { className: string };
}`;

    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      nextTypes,
      'file:///node_modules/@types/next/index.d.ts'
    );
  };

  const handleChange = (value: string | undefined) => {
    onChange(value || '');
  };

  const getLanguageFromFileName = (fileName: string): string => {
    if (fileName.endsWith('.tsx') || fileName.endsWith('.jsx')) return 'typescript';
    if (fileName.endsWith('.ts')) return 'typescript';
    if (fileName.endsWith('.js')) return 'javascript';
    if (fileName.endsWith('.css')) return 'css';
    if (fileName.endsWith('.html')) return 'html';
    if (fileName.endsWith('.json')) return 'json';
    return 'typescript';
  };

  return (
    <div className="h-full" style={{ backgroundColor: '#0F0F10' }}> {/* Optional: Set wrapper background to match */}
      <Editor
        height="100%"
        language={getLanguageFromFileName(fileName)}
        value={value}
        onChange={handleChange}
        onMount={handleEditorDidMount}
        theme="custom-dark" // Use the custom theme
        options={{
          fontSize: 14,
          fontFamily: 'Consolas, "Courier New", monospace',
          minimap: { enabled: true },
          lineNumbers: 'on',
          renderWhitespace: 'selection',
          tabSize: 2,
          insertSpaces: true,
          wordWrap: 'on',
          automaticLayout: true,
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: 'blink',
          cursorSmoothCaretAnimation: 'on',
          renderLineHighlight: 'line',
          selectionHighlight: true,
          matchBrackets: 'always',
          folding: true,
          foldingStrategy: 'indentation',
          showFoldingControls: 'mouseover',
          unfoldOnClickAfterEndOfLine: false,
          contextmenu: true,
          mouseWheelZoom: true,
          quickSuggestions: {
            other: true,
            comments: false,
            strings: false
          },
          parameterHints: {
            enabled: true
          },
          suggest: {
            showKeywords: true,
            showSnippets: true
          }
        }}
      />
    </div>
  );
};

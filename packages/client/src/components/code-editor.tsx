import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { useRef } from 'react';
import './code-editor.css';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';
import './syntax.css'

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>();
  //runs anytime monaco editor first mounts
  const onEditorDidMount: EditorDidMount = (getValue, MonacoEditor) => {
    editorRef.current = MonacoEditor;
    //detect anytime code in editor changes, using library's getValue function
    MonacoEditor.onDidChangeModelContent(() => {
      let value = getValue();
      onChange(value);
    });

    // editor tabs create two spaces 
    MonacoEditor.getModel()?.updateOptions({tabSize: 2})

    // use syntax highlighting with monaco-jsx-highlighter and jscodeshift settings
    const highlighter = new Highlighter(
      // @ts-ignore
      window.monaco,
      codeShift,
      MonacoEditor 
    );
    highlighter.highLightOnDidChangeModelContent(
      ()=> {},
      ()=> {},
      undefined,
      ()=> {}
    );
  };

  const onFormatClick = () => {
    //get current value from editor
    const unformatted = editorRef.current.getModel().getValue();

    // format the value
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');

    //set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      {/* button for formatting */}
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      {/* Monaco editor with options */}
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        theme="dark"
        language="javascript"
        height="100%"
      />
    </div>
  );
};

export default CodeEditor;

// JsonEditor.jsx
import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';

const JsonEditor = ({ onJsonChange }) => {
  const [error, setError] = useState(null);

  const handleEditorChange = (value = '{}') => {
    try {
      JSON.parse(value); // Validate JSON
      setError(null);
      onJsonChange(value);
    } catch (e) {
      setError('Invalid JSON format');
      onJsonChange(null); // Notify parent of invalid JSON
    }
  };

  return (
    <div>
      <MonacoEditor
        height="400px"
        defaultLanguage="json"
        defaultValue={`{
  "fields": []
}`}
        onChange={handleEditorChange}
        options={{ automaticLayout: true }}
      />
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default JsonEditor;

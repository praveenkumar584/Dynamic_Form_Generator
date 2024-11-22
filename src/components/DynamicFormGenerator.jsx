// DynamicFormGenerator.jsx
import React, { useState } from 'react';
import JsonEditor from './JsonEditor';
import FormPreview from './FormPreview';

const DynamicFormGenerator = () => {
  const [jsonSchema, setJsonSchema] = useState(null);

  const handleJsonChange = (newJsonSchema) => {
    try {
      const parsedSchema = JSON.parse(newJsonSchema);
      if (parsedSchema.fields) {
        setJsonSchema(parsedSchema);
      } else {
        setJsonSchema(null);
      }
    } catch {
      setJsonSchema(null); // Invalid JSON
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      {/* JSON Editor: Left Panel */}
      <div className="w-full md:w-1/2 h-full border-b md:border-r p-4">
        <h2 className="text-lg font-bold mb-4">JSON Editor</h2>
        <JsonEditor onJsonChange={handleJsonChange} />
      </div>

      {/* Form Preview: Right Panel */}
      <div className="w-full md:w-1/2 h-full p-4">
        <h2 className="text-lg font-bold mb-4">Form Preview</h2>
        {jsonSchema ? (
          <FormPreview jsonSchema={jsonSchema} />
        ) : (
          <div className="text-center text-gray-500">
            Please enter a valid JSON schema.
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicFormGenerator;

// FormPreview.jsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

const FormPreview = ({ jsonSchema }) => {
  const { fields = [] } = jsonSchema || {};
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Form Submitted:', data);
    alert('Form submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {fields.map((field, index) => (
        <div key={index} className="flex flex-col">
          <label className="font-semibold mb-1">{field.label}</label>
          <Controller
            name={field.id} // Use the "id" for the field name
            control={control}
            defaultValue=""
            render={({ field: inputField }) => {
              switch (field.type) {
                case 'text':
                  return <input {...inputField} type="text" className="border p-2 rounded" />;
                case 'email':
                  return <input {...inputField} type="email" className="border p-2 rounded" />;
                case 'select':
                  return (
                    <select {...inputField} className="border p-2 rounded">
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  );
                case 'radio':
                  return (
                    <div>
                      {field.options.map((option) => (
                        <label key={option.value} className="mr-4">
                          <input
                            {...inputField}
                            type="radio"
                            value={option.value}
                            className="mr-2"
                          />
                          {option.label}
                        </label>
                      ))}
                    </div>
                  );
                case 'textarea':
                  return <textarea {...inputField} className="border p-2 rounded" />;
                default:
                  return <input {...inputField} type="text" className="border p-2 rounded" />;
              }
            }}
          />
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default FormPreview;

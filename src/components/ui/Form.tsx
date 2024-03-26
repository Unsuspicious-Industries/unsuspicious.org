import React from "react";
import type { Form } from "~/types";

export default function FormContainer(FormProps: Form) {

  let isAgreed = false;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {

    if (!isAgreed) {
      alert("You must agree to USI Privacy Policy");
      return;
    }

    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Convert FormData to JSON
    let object: any = {};
    formData.forEach((value, key) => { object[key] = value });
    let json = JSON.stringify(object);

    console.log(json)

    const response = await fetch(FormProps.action!, {
      method: FormProps.method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: json,
    });
    
    const data = await response.json();

    // if response.success is true then do something
    if (data.success) {
      // add an alert with the success message
      alert("Success!");
    } else {
      // add an alert with the error message
      alert(data.error);
    }
  }

  return (
    <form onSubmit={submit}>
      {FormProps.inputs?.map((input) => (
        <div key={input.name} className="mb-6">
          {input.label && (
            <label htmlFor={input.name} className="block text-sm font-medium">
              {input.label}
            </label>
          )}
          <input
            type={input.type || 'text'}
            name={input.name}
            id={input.name}
            autoComplete={input.autocomplete || 'on'}
            placeholder={input.placeholder || ''}
            className="py-3 px-4 block w-full text-md rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900"
          />
        </div>
      ))}
      {FormProps.textarea && (
        <div className="mb-6">
          <label htmlFor="textarea" className="block text-sm font-medium">
            {FormProps.textarea.label}
          </label>
          <textarea
            name="textarea"
            id="textarea"
            placeholder={FormProps.textarea.placeholder || ''}
            className="py-3 px-4 block w-full text-md rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900"
          />
        </div>
      )}
      {FormProps.disclaimer && (
        <div className="mb-6 text-sm">
          <label>
            <input
              type="checkbox"
              onChange={(e) => (isAgreed = e.target.checked)}
            />
            Agree to USI Privacy Policy
          </label>
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}
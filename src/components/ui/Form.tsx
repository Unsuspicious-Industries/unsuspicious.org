import React, { useState } from "react";
import type { Form } from "~/types";
import Button from "./FormButton";


export default function FormContainer(FormProps: Form) {
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null); // Clear the message at the start of submission

    const formData = new FormData(e.currentTarget);

    for (let [key, value] of formData.entries()) {
      if (value === "") {
        const input = document.querySelector(`[name="${key}"]`);
        if (input) {
          input.classList.add("ring", "ring-red-500");
          input.addEventListener("input", () => {
            input.classList.remove("ring", "ring-red-500");
          });
        }
        return;
      }
    }

    // if the disclaimer is present and the user has not agreed to it, prevent the form from submitting
    if (FormProps.disclaimer) {
      const checkbox = document.getElementById("disclaimer-box") as HTMLInputElement;
      if (checkbox && !checkbox.checked) {
        alert("You must agree to USI Privacy Policy to continue.");
        return;
      }
    }

    // Convert FormData to JSON
    const object: Record<string, any> = {};
    formData.forEach((value, key) => { object[key] = value });
    const json = JSON.stringify(object);

    try {
      const response = await fetch(FormProps.action!, {
        method: FormProps.method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: json,
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ text: data.message || "Done!", isError: false });
        FormProps.onSuccess?.(data);
      } else {
        setMessage({ text: data.error, isError: true });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setMessage({ text: "An error occurred during form submission.", isError: true });
    }
  }

  return (
    <form onSubmit={submit}>
      {message && (
        <div className={`flex justify-center items-center border-b border-t font-sans py-2 my-4 ${message.isError ? 'border-red-700 text-red-700' : 'border-gray-700'}`}>
          <h2>{message.text}</h2>
        </div>
      )}
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
            className="py-3 px-4 block w-full text-md rounded-lg border dark:border-gray-700 bg-white dark:bg-zinc-900"
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
            className="py-3 px-4 block w-full text-md rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900"
          />
        </div>
      )}
      {FormProps.disclaimer && (
        <div className="mb-6 text-sm">
          <label>
            <input
              id="disclaimer-box"
              type="checkbox"
            />
            Agree to USI Privacy Policy
          </label>
        </div>
      )}
      {FormProps.button && (
        <div className="mt-10 grid">
          <Button variant="primary" type="submit">
            {FormProps.button}
          </Button>
        </div>
      )}
    </form>
  );
}
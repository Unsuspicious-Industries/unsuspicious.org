import React, { useState } from "react";

interface ApiDemoProps {
  apiUrl: string;
  method: string;
}

export default function ApiDemo({ apiUrl,method }: ApiDemoProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [response, setResponse] = useState<any | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null); // Clear the message at the start of submission

    console.log("submitting form");

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

    // Convert FormData to URL parameters
    let params = new URLSearchParams();
    formData.forEach((value, key) => {
      if (typeof value === 'string') {
        params.append(key, value);
      }
    });

    const response = await fetch(`${apiUrl}?${params.toString()}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
    });

    console.log(`Response: ${response}`)

    const data = await response.json();

    // if response.success is true then do something
    if (data) {
      console.log(`Got ${data}`);
      setMessage("Done!");
      setResponse(data);
    } else {
      console.log(`Error : ${data.error}`);
      setMessage(data.error);
    }
  }

  return (
    <div className="flex">
      <form onSubmit={submit} className="p-4">
        {message && (
          <div className="flex justify-center items-center border-b border-t border-gray-700 font-sans py-2 my-4">
            <h2>{message}</h2>
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="stock" className="block text-sm font-medium">
            Stock
          </label>
          <input
            type="text"
            name="stock"
            id="stock"
            autoComplete="off"
            placeholder="Enter stock"
            className="py-3 px-4 block w-full text-md rounded-lg border dark:border-gray-700 bg-white dark:bg-zinc-900"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="start_date" className="block text-sm font-medium">
            Start Date
          </label>
          <input
            type="date"
            name="start_date"
            id="startDate"
            autoComplete="off"
            placeholder="Enter start date"
            className="py-3 px-4 block w-full text-md rounded-lg border dark:border-gray-700 bg-white dark:bg-zinc-900"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="end_date" className="block text-sm font-medium">
            End Date
          </label>
          <input
            type="date"
            name="end_date"
            id="endDate"
            autoComplete="off"
            placeholder="Enter end date"
            className="py-3 px-4 block w-full text-md rounded-lg border dark:border-gray-700 bg-white dark:bg-zinc-900"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="size" className="block text-sm font-medium">
            Precision
          </label>
          <input
            type="range"
            name="size"
            id="size"
            min="0"
            max="10"
            autoComplete="off"
            placeholder="Enter precision"
            className="py-3 px-4 block w-full text-md rounded-lg border dark:border-gray-700 bg-white dark:bg-zinc-900"
          />
        </div>

        <div className="mt-10 grid">
          <button type="submit" className="py-3 px-4 block w-full text-md rounded-lg border dark:border-gray-700 bg-blue-500 dark:bg-blue-700">
            Submit
          </button>
        </div>

        {response && (
          <div className="flex justify-center items-center border-b border-t border-gray-700 font-sans py-2 my-4">
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </form>

      <div className="w-1/2 flex justify-center items-center border-l border-gray-700">
        {response && (
          <div className="py-2 my-4">
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
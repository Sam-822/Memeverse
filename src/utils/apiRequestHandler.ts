
// Interfaces to provide type safety and autocomplete features for API request options
interface ApiRequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE"; // HTTP methods allowed
  headers?: Record<string, string>; // Optional custom headers
  body?: unknown; // Optional request body (will be serialized to JSON)
}
interface GetRequestOptions {
  headers?: Record<string, string>; // Optional custom headers
}
interface PostRequestOptions {
  headers?: Record<string, string>; // Optional custom headers
  body?: unknown; // Optional request body (will be serialized to JSON)
}

export const apiRequestHandler = async (
  endpoint: string, // API endpoint to call
  options: ApiRequestOptions = {}, // Optional configuration for the API request
  fileName: string = "" // If provided, response will be downloaded as a file with this name
) => {
  // Add default headers (e.g., Content-Type, Customer-ID) and merge with custom headers
  const finalHeaders: Record<string, string> = {
    // "Content-Type": "application/json", // Set default Content-Type as JSON
    ...options?.headers, // Merge any additional headers passed to the function
  };

  try {
    // Serialize the request body to JSON string if provided
    const body = options?.body ? JSON.stringify(options.body) : undefined;

    // Make the API call using the fetch API with the provided endpoint and options
    const res = await fetch(`${endpoint}`, {
      ...options, // Spread other options (e.g., method)
      headers: finalHeaders, // Include headers
      body, // Serialized request body or undefined
    });

    // Throw an error if the response status is not OK
    if (!res.ok) {
      const errorResponse = await res.json().catch(() => null);
      throw new Error(
        errorResponse?.message || errorResponse.error.errors.active.message ||  `Something went wrong ${res.status}`
      );
    }

    // Parse the response as JSON if "fileName" is not provided
    if (!fileName) {
      const data = await res.json();

      // Return the parsed data to the caller
      return data;
    }

    // Handle file download if the "fileName" parameter is provided
    else {
      const blob = await res.blob();
      const urlBlob = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = urlBlob;
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(urlBlob);
      return;
    }
  } catch (error) {
    // Handle errors: differentiate between known and unknown errors
    if (error instanceof Error) {
      // toast.error(error.message);
      console.error(error);
    } else {
      // toast.error("An unknown error occurred");
      console.error("Unknown error:", error);
    }
  }
};

// GET request handler
export const getRequestHandler = async (
  endpoint: string, // API endpoint to call
  options: GetRequestOptions = {}, // Optional configuration for the API request
  fileName: string = "" // If provided, response will be downloaded as a file with this name
) => {
  return await apiRequestHandler(
    endpoint,
    { method: "GET", ...options },
    fileName
  );
};

// POST request handler
export const postRequestHandler = async (
  endpoint: string, // API endpoint to call
  options: PostRequestOptions = {}, // Optional configuration for the API request
  fileName: string = "" // If provided, response will be downloaded as a file with this name
) => {
  return await apiRequestHandler(
    endpoint,
    { method: "POST", ...options },
    fileName
  );
};

// PUT request handler
export const putRequestHandler = async (
  endpoint: string, // API endpoint to call
  options: PostRequestOptions = {}, // Optional configuration for the API request
  fileName: string = "" // If provided, response will be downloaded as a file with this name
) => {
  return await apiRequestHandler(
    endpoint,
    { method: "PUT", ...options },
    fileName
  );
};

// DELETE request handler
export const deleteRequestHandler = async (
  endpoint: string, // API endpoint to call
  options: GetRequestOptions = {} // Optional configuration for the API request
) => {
  return await apiRequestHandler(endpoint, { method: "DELETE", ...options });
};

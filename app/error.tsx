"use client";
export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Error</h1>
        <p className="mt-4 text-lg">
          An error occurred during the authentication process. Please try again.
        </p>
        <a
          href="/login"
          className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded"
        >
          Back to Login
        </a>
      </div>
    </div>
  );
}

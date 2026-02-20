export default function EmailVerified({
  searchParams,
}: {
  searchParams: { success: string };
}) {
  const success = searchParams.success === "true";
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-600 px-4">
       <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
        
        <div className="text-5xl mb-6">
          {success ? "✅" : "❌"}
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 mb-3">
          {success
            ? "Email Successfully Verified!"
            : "Invalid or Expired Link"}
        </h1>

        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          {success
            ? "Your email address has been successfully confirmed. You can now log in to your account."
            : "The verification link is invalid or has expired. Please request a new verification email."}
        </p>

        <a
          href="/login"
          className="inline-block w-full py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors duration-200"
        >
          Go to Login
        </a>

      </div>
    </main>
  );
}

"use client";

export default function Error({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <main className="flex h-full flex-col items-center justify-center">
            <h2 className="text-center">
                Error authenticating, check password or email!
            </h2>
            <button
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                onClick={
                    // Attempt to recover by trying to re-render the expense route
                    () => reset()
                }>
                Try again
            </button>
        </main>
    );
}

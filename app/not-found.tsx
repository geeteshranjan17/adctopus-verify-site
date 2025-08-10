// app/not-found.tsx
export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-white">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-white/70">The page you’re looking for doesn’t exist.</p>
      <a href="/" className="mt-6 inline-block underline">Go home</a>
    </main>
  );
}

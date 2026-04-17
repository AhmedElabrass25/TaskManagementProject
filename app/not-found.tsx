import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] px-4">
      
      <div className="text-center max-w-md">

        {/* 404 */}
        <h1 className="text-6xl font-bold text-[var(--color-primary)]">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold mt-4 text-[var(--color-slate-900)]">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-[var(--color-slate-600)] mt-2">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        {/* Button */}
        <Link href="/">
          <button className="btn-primary mt-6">
            Go Back Home
          </button>
        </Link>

      </div>

    </div>
  );
}
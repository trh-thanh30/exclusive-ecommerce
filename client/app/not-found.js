import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-primary-50">
      <div>
        <h1 className="font-normal text-8xl md:text-9xl text-primary-900">404</h1>
        <h2 className="mt-2 text-2xl font-bold md:mt-4 md:font-extrabold md:text-4xl">Page not found</h2>
        <p className="max-w-md mt-2 text-xs md:text-base text-primary-500">
          Oops! The page you are looking for does not exist. It might have been
          moved or deleted.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2 mt-4 text-xs text-white transition bg-black rounded-md md:mt-6 md:text-sm hover:bg-gray-800"
        >
          Back to home →
        </Link>
      </div>
    </div>
  );
}

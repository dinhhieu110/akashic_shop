import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-site section flex min-h-[60svh] flex-col items-center justify-center text-center">
      <span className="eyebrow">Error 404</span>
      <h1 className="heading-1 mt-3 max-w-xl">This page drifted off into space</h1>
      <p className="lede mt-4 max-w-md">
        We couldn&apos;t find what you were looking for. It may have moved, or it
        isn&apos;t available yet.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary btn-lg">
          Back to home
        </Link>
        <Link href="/#best-sellers-title" className="btn btn-outline btn-lg">
          See best sellers
        </Link>
      </div>
    </section>
  );
}

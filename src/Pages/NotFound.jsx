function NotFound() {
  return (
    <section className="flex items-center justify-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm flex flex-col justify-center items-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary dark:text-blue-500">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Something{"'"}s missing.
          </p>
          <p className="mb-4 text-lg text-black dark:text-white/90">
            Sorry, we can{"'"}t find that page. You{"'"}ll find lots to explore
            on the home page.{" "}
          </p>
        </div>
      </div>
    </section>
  );
}

export default NotFound;

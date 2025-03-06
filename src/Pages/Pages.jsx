import { FacebookPageManager } from "../components/FacebookPageManager";

const Pages = () => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between py-4">
          <h1 className="text-3xl font-bold pl-10">Facebook Page Manager</h1>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4">
        <FacebookPageManager />
      </main>
    </div>
  );
};

export default Pages;

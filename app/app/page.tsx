import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-black text-white flex flex-col justify-between">
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-6xl font-bold mb-4">Task Sparc</h1>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl text-center">
          Task Sparc is your ultimate task management solution. Organize, and
          track your tasks effortlessly with a sleek and intuitive interface.
          Boost your productivity today!
        </p>
        <div className="flex space-x-4">
          <Link href="/auth">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
              Get Started
            </button>
          </Link>
          <a
            href="https://github.com/Pratheep-Srikones/task-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
              GitHub Repo
            </button>
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 bg-black bg-opacity-20">
        <p className="text-gray-400">© 2025 Pratheep. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a
            href="https://github.com/Pratheep-Srikones"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/pratheep-srikones-816110240/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            LinkedIn
          </a>
          <a
            href="https://web.facebook.com/pratheep.sri.161"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            Facebook
          </a>
        </div>
      </footer>
    </div>
  );
}

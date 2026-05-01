export default function Footer() {
  return (
    <footer className="border-t border-gray-900 py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-600 text-sm">
        <p>Berlin Ethereum Day · June 15, 2026</p>
        <a
          href="https://github.com/ethdevberlin/berlin-ethereum-day"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition-colors"
        >
          View source on GitHub
        </a>
      </div>
    </footer>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h2 className="text-xl font-bold text-white">PerfumeStore</h2>
          <p className="mt-2 text-sm">
            Premium fragrances delivered to your doorstep.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>Home</li>
            <li>Cart</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2">Contact</h3>
          <p className="text-sm">Email: support@perfumestore.com</p>
          <p className="text-sm">Phone: +91 98765 43210</p>
        </div>
      </div>

      <div className="text-center text-xs py-3 bg-gray-800">
        © {new Date().getFullYear()} PerfumeStore. All rights reserved.
      </div>
    </footer>
  );
}

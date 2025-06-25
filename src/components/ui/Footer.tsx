export default function Footer() {
  return (
    <footer className="bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] text-white p-6 w-full">
      <div className="container mx-auto text-center">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p>
            &copy; {new Date().getFullYear()} SavorServe. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="/privacypolicy" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/tos" className="hover:underline">
              Terms of Service
            </a>
            <a href="/contact" className="hover:underline">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

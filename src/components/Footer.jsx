export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-[#121212] border-t border-gray-800 text-gray-400 text-center py-3 text-sm select-none">
      © {new Date().getFullYear()} TaskManager. All rights reserved.
    </footer>
  );
}
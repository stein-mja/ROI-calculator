import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="gradient-bg text-white py-6 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-2xl font-bold font-rem mr-2">Identum</div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 font-lato">
          <a href="#" className="hover:text-cherry transition">Solutions</a>
          <a href="#" className="hover:text-cherry transition">Products</a>
          <a href="#" className="hover:text-cherry transition">Resources</a>
          <a href="#" className="hover:text-cherry transition">About Us</a>
          <a href="#" className="bg-cherry px-4 py-2 rounded hover:bg-currant transition">Contact</a>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-blackened py-4 shadow-lg animate-slide-in">
          <nav className="container mx-auto px-4 flex flex-col space-y-4 font-lato">
            <a href="#" className="text-white hover:text-cherry transition py-2">Solutions</a>
            <a href="#" className="text-white hover:text-cherry transition py-2">Products</a>
            <a href="#" className="text-white hover:text-cherry transition py-2">Resources</a>
            <a href="#" className="text-white hover:text-cherry transition py-2">About Us</a>
            <a href="#" className="bg-cherry text-white px-4 py-2 rounded hover:bg-currant transition inline-block text-center">Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
}

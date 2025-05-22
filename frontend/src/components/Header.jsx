import React, { useState, useEffect } from 'react';
import { Video, Users, MessageCircle, Bell, Menu, X, User, Copy, Phone, PhoneOff } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="backdrop-blur-md bg-white/10 border-b border-white/20">
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <Video className="h-8 w-8 text-white" />
                <span style={{fontFamily: "'Fugaz One', cursive"}} className="text-white font-black text-3xl tracking-wider drop-shadow-lg">VIBECALL</span>
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <a href="#" className="text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-300">
                <Video className="h-4 w-4" />
                <span>Meetings</span>
              </a>
              <a href="#" className="text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-300">
                <Users className="h-4 w-4" />
                <span>Contacts</span>
              </a>
              <a href="#" className="text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-300">
                <MessageCircle className="h-4 w-4" />
                <span>Messages</span>
              </a>
            </div>
          </div>
          
          {/* User Section */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-white/90 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all duration-300">
              <Bell className="h-5 w-5" />
            </button>
            <div className="relative">
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm py-1 px-3 rounded-full text-sm text-white border border-white/20 transition-all duration-300">
                <div className="bg-white/20 p-1 rounded-full">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span>My Account</span>
              </button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-white hover:bg-white/10 p-2 rounded-md transition-all duration-300"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-md border-t border-white/20">
          <div className="px-2 space-y-1 py-3">
            <a href="#" className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 transition-all duration-300">
              <Video className="h-5 w-5" />
              <span>Meetings</span>
            </a>
            <a href="#" className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 transition-all duration-300">
              <Users className="h-5 w-5" />
              <span>Contacts</span>
            </a>
            <a href="#" className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 transition-all duration-300">
              <MessageCircle className="h-5 w-5" />
              <span>Messages</span>
            </a>
            <div className="pt-4 pb-3 border-t border-white/20">
              <div className="flex items-center px-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">My Account</div>
                </div>
                <button className="ml-auto text-white hover:bg-white/10 p-2 rounded-full transition-all duration-300">
                  <Bell className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};


export default Header
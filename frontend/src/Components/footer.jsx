import React from 'react';

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
                <p className="text-sm">&copy; 2024 EduVerse. All rights reserved.</p>
                <div className="space-x-4">
                    <a href="/about" className="text-sm hover:text-gray-400">About Us</a>
                    <a href="/contact" className="text-sm hover:text-gray-400">Contact</a>
                    <a href="/privacy" className="text-sm hover:text-gray-400">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

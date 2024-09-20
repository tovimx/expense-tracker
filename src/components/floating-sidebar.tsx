"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function FloatingSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleEscapeKey);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, []);

    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                aria-label="Toggle menu"
                className="fixed top-4 left-4 z-50">
                <Menu className="h-6 w-6" />
            </Button>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}>
                <div className="p-5">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleMenu}
                        aria-label="Close menu"
                        className="absolute top-4 right-4 text-black">
                        <X className="h-6 w-6" />
                    </Button>
                    <nav className="mt-8">
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/"
                                    onClick={() => toggleMenu()}
                                    className="block py-2 px-4 text-lg font-medium text-black hover:bg-gray-100 rounded-md transition-colors duration-200">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard"
                                    onClick={() => toggleMenu()}
                                    className="block py-2 px-4 text-lg font-medium text-black hover:bg-gray-100 rounded-md transition-colors duration-200">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    onClick={() => toggleMenu()}
                                    href="/expense"
                                    className="block py-2 px-4 text-lg font-medium text-black hover:bg-gray-100 rounded-md transition-colors duration-200">
                                    New Expense
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block py-2 px-4 text-lg font-medium text-black hover:bg-gray-100 rounded-md transition-colors duration-200">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block py-2 px-4 text-lg font-medium text-black hover:bg-gray-100 rounded-md transition-colors duration-200">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}

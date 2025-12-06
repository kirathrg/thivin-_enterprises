"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface PWAInstallPromptProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PWAInstallPrompt({ isOpen, onClose }: PWAInstallPromptProps) {
    const [promptInstall, setPromptInstall] = useState<any>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if mobile device
        const checkMobile = () => {
            return window.innerWidth <= 768;
        };
        setIsMobile(checkMobile());

        // Check if already in standalone mode (installed)
        const isStandalone = window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone;
        if (isStandalone) {
            console.log("App already installed");
            return;
        }

        // Standard PWA (Android/Desktop)
        const handler = (e: any) => {
            e.preventDefault();
            console.log("beforeinstallprompt event captured");
            setPromptInstall(e);
        };

        window.addEventListener("beforeinstallprompt", handler);

        return () => {
            window.removeEventListener("beforeinstallprompt", handler);
        };
    }, []);

    const onClick = async () => {
        if (!promptInstall) {
            toast.error("Installation is not available. Please make sure you're using a supported browser.");
            onClose();
            return;
        }

        try {
            // Show the native install prompt
            await promptInstall.prompt();
            
            // Wait for the user to respond to the prompt
            const { outcome } = await promptInstall.userChoice;
            
            console.log(`User response: ${outcome}`);

            if (outcome === 'accepted') {
                toast.success("Thank you for installing our app!");
            } else {
                toast.info("Installation cancelled");
            }
            
            // Clear the prompt
            setPromptInstall(null);
            onClose();
        } catch (error) {
            console.error("Installation error:", error);
            toast.error("Installation failed. Please try again.");
            onClose();
        }
    };

    const handleClose = () => {
        onClose();
    };

    // Only show on mobile when triggered
    if (!isOpen || !isMobile) {
        return null;
    }

    // If no install prompt available, show message
    if (!promptInstall) {
        return (
            <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-300">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-300 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Installation Not Available</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        This app is either already installed or your browser doesn't support PWA installation.
                    </p>
                    <button
                        onClick={handleClose}
                        className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium text-sm rounded-lg transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3 flex items-center justify-between">
                    <h3 className="text-white font-semibold text-base">Install app</h3>
                    <button
                        onClick={handleClose}
                        className="text-white/80 hover:text-white transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                        {/* App Icon */}
                        <div className="relative h-16 w-16 rounded-xl overflow-hidden shadow-md flex-shrink-0 bg-blue-600">
                            <Image
                                src="/logo.png"
                                alt="Thivin Enterprises"
                                fill
                                className="object-cover"
                            />
                        </div>
                        
                        {/* App Info */}
                        <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-lg mb-1">
                                Thivin Enterprises
                            </h4>
                            <p className="text-sm text-gray-600">
                                www.thivinenterprises.com
                            </p>
                        </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 mb-6">
                        <div className="flex items-start gap-3">
                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <p className="text-sm text-gray-700">Fast and reliable performance</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <p className="text-sm text-gray-700">Works offline</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <p className="text-sm text-gray-700">Get instant notifications</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={handleClose}
                            className="flex-1 px-4 py-3 text-gray-700 font-medium text-sm rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onClick}
                            className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors shadow-md"
                        >
                            Install
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

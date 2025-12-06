"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

// Store the install prompt globally so it persists across component re-renders
let deferredPrompt: any = null;

interface PWAInstallPromptProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PWAInstallPrompt({ isOpen, onClose }: PWAInstallPromptProps) {
    const [promptInstall, setPromptInstall] = useState<any>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isInstallable, setIsInstallable] = useState(false);

    useEffect(() => {
        // Check if mobile device
        const checkMobile = () => {
            return window.innerWidth <= 768;
        };
        setIsMobile(checkMobile());

        console.log("PWA Component mounted");
        console.log("User Agent:", navigator.userAgent);
        console.log("Is HTTPS:", window.location.protocol === "https:");

        // Check if already in standalone mode (installed)
        const isStandalone = window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone;
        console.log("Is standalone mode:", isStandalone);
        
        if (isStandalone) {
            console.log("App already installed (standalone mode)");
            return;
        }

        // Check if we already have a deferred prompt from a previous load
        if (deferredPrompt) {
            console.log("Using previously stored install prompt");
            setPromptInstall(deferredPrompt);
            setIsInstallable(true);
        }

        // Standard PWA (Android/Desktop)
        const handler = (e: any) => {
            e.preventDefault();
            console.log("✅ beforeinstallprompt event captured and stored!");
            deferredPrompt = e;
            setPromptInstall(e);
            setIsInstallable(true);
        };

        window.addEventListener("beforeinstallprompt", handler);
        console.log("Event listener added for beforeinstallprompt");

        // Listen for successful installation
        const installHandler = () => {
            console.log("✅ PWA was installed successfully");
            deferredPrompt = null;
            setPromptInstall(null);
            setIsInstallable(false);
        };
        
        window.addEventListener("appinstalled", installHandler);

        // Debug: Check after a delay if event fired
        setTimeout(() => {
            console.log("After 3s - Has prompt?", !!deferredPrompt);
            console.log("After 3s - Is installable?", isInstallable);
        }, 3000);

        return () => {
            window.removeEventListener("beforeinstallprompt", handler);
            window.removeEventListener("appinstalled", installHandler);
        };
    }, []);

    const onClick = async () => {
        const currentPrompt = promptInstall || deferredPrompt;
        
        console.log("Install button clicked");
        console.log("Current prompt exists?", !!currentPrompt);
        
        if (!currentPrompt) {
            console.error("❌ No install prompt available");
            console.log("This usually means:");
            console.log("1. PWA criteria not met");
            console.log("2. App already installed");
            console.log("3. User previously dismissed install");
            
            toast.error("Installation not available right now. Try refreshing the page.");
            onClose();
            return;
        }

        try {
            console.log("📱 Showing native install prompt...");
            // Show the native install prompt
            await currentPrompt.prompt();
            
            // Wait for the user to respond to the prompt
            const { outcome } = await currentPrompt.userChoice;
            
            console.log(`✅ User response: ${outcome}`);

            if (outcome === 'accepted') {
                console.log("🎉 User accepted installation");
                toast.success("Thank you for installing our app!");
                deferredPrompt = null;
                setPromptInstall(null);
                setIsInstallable(false);
            } else {
                console.log("❌ User dismissed installation");
                toast.info("Installation cancelled");
            }
            
            onClose();
        } catch (error) {
            console.error("❌ Installation error:", error);
            toast.error("Installation failed: " + (error as Error).message);
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
                                width={64}
                                height={64}
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

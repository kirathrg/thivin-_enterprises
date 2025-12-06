"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Share, X, PlusSquare } from "lucide-react";
import { toast } from "sonner";

export default function PWAInstallPrompt() {
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState<any>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // Check if already in standalone mode (installed)
        const isStandalone = window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone;
        if (isStandalone) {
            return;
        }

        // Detect iOS
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIosDevice = /iphone|ipad|ipod/.test(userAgent);

        if (isIosDevice) {
            setIsIOS(true);
            // Show immediately or after delay on iOS since we can't detect "installability" via event
            setTimeout(() => setIsVisible(true), 3000);
        } else {
            // Standard PWA (Android/Desktop)
            const handler = (e: any) => {
                e.preventDefault();
                setSupportsPWA(true);
                setPromptInstall(e);
                setTimeout(() => setIsVisible(true), 2000);
            };

            window.addEventListener("beforeinstallprompt", handler);
            return () => window.removeEventListener("beforeinstallprompt", handler);
        }
    }, []);

    const onClick = async () => {
        if (!promptInstall) {
            return;
        }
        promptInstall.prompt();
        const { outcome } = await promptInstall.userChoice;

        if (outcome === 'accepted') {
            setIsVisible(false);
            toast.success("Thank you for installing our app!");
        }
    };

    const onClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    // iOS UI
    if (isIOS) {
        return (
            <div className="fixed bottom-20 left-4 right-4 md:bottom-6 md:left-auto md:right-24 z-[9999] animate-in slide-in-from-bottom-5 fade-in duration-500">
                <div className="bg-white dark:bg-slate-900 border border-border rounded-xl shadow-2xl p-4 max-w-sm ml-auto relative">
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>

                    <div className="flex items-start gap-4 pr-6">
                        <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                            <PlusSquare className="h-5 w-5" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-semibold text-sm">Install App</h3>
                            <p className="text-xs text-muted-foreground">
                                To install this app on your iOS device:
                            </p>
                            <div className="flex flex-col gap-2 text-xs text-foreground mt-2">
                                <div className="flex items-center gap-2">
                                    1. Tap the <Share className="h-4 w-4" /> Share button
                                </div>
                                <div className="flex items-center gap-2">
                                    2. Select <span className="font-medium">Add to Home Screen</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Android/Desktop UI
    if (supportsPWA) {
        return (
            <div className="fixed bottom-20 left-4 right-4 md:bottom-6 md:left-auto md:right-24 z-[9999] animate-in slide-in-from-bottom-5 fade-in duration-500">
                <div className="bg-white dark:bg-slate-900 border border-border rounded-xl shadow-2xl p-4 flex items-center justify-between gap-4 max-w-sm ml-auto">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                            <Download className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm">Install App</h3>
                            <p className="text-xs text-muted-foreground">Get a better experience</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button size="sm" onClick={onClick} className="h-8 text-xs">
                            Install
                        </Button>
                        <button
                            onClick={onClose}
                            className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}

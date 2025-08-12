import { LoginForm } from "@/components/auth/login-form";
import { BarChart3, Shield, Sparkles, Zap } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
            <div className="relative z-10 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-primary p-3 rounded-2xl shadow-lg animate-pulse">
                            <Sparkles className="h-8 w-8 text-primary-foreground" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Join the Future</h1>
                    <p className="text-muted-foreground text-lg">AI-Powered Uptime & Deployment Monitor</p>
                </div>

                <div className="bg-card backdrop-blur-sm rounded-xl p-4 mb-8 border border-border shadow-lg">
                    <h3 className="text-foreground font-semibold mb-3 text-center">Why choose us?</h3>
                    <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                            <Shield className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                            99.9% uptime monitoring
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                            <BarChart3 className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                            Real-time analytics & alerts
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                            <Zap className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                            AI-powered insights
                        </div>
                    </div>
                </div>

                <LoginForm />
            </div>
        </div>
    );
}

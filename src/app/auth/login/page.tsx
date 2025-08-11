import { LoginForm } from "@/components/auth/login-form";
import { BarChart3, Shield, Zap } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">

            <div className="relative z-10 w-full max-w-md">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-primary p-3 rounded-2xl shadow-lg">
                            <Zap className="h-8 w-8 text-primary-foreground" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
                    <p className="text-muted-foreground text-lg">
                        AI-Powered Uptime & Deployment Monitor
                    </p>
                </div>

                {/* Features Preview */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="text-center">
                        <div className="bg-card backdrop-blur-sm rounded-lg p-3 mb-2 border border-border">
                            <Shield className="h-5 w-5 text-primary mx-auto" />
                        </div>
                        <p className="text-xs text-muted-foreground">Secure</p>
                    </div>

                    <div className="text-center">
                        <div className="bg-card backdrop-blur-sm rounded-lg p-3 mb-2 border border-border">
                            <BarChart3 className="h-5 w-5 text-primary mx-auto" />
                        </div>
                        <p className="text-xs text-muted-foreground">Analytics</p>
                    </div>

                    <div className="text-center">
                        <div className="bg-card backdrop-blur-sm rounded-lg p-3 mb-2 border border-border">
                            <Zap className="h-5 w-5 text-accent mx-auto" />
                        </div>
                        <p className="text-xs text-muted-foreground">Real-time</p>
                    </div>
                </div>

                {/* Login Form */}
                <LoginForm />

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-muted-foreground text-sm">
                        Don't have an account?{" "}
                        <a
                            href="/signup"
                            className="text-primary hover:opacity-80 font-medium transition-colors"
                        >
                            Sign up here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

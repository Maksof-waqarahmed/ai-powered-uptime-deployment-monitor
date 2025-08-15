import { LoginForm } from "@/components/auth/login-form"
import { BarChart3, Shield, Sparkles, Zap, ArrowRight } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-br from-primary to-primary/80 p-4 rounded-3xl shadow-xl animate-bounce">
              <Sparkles className="h-10 w-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Join the Future
          </h1>
          <p className="text-muted-foreground text-lg font-medium">AI-Powered Uptime & Deployment Monitor</p>
          <div className="flex items-center justify-center mt-2 text-sm text-primary">
            <span>Get started in seconds</span>
            <ArrowRight className="h-4 w-4 ml-1 animate-pulse" />
          </div>
        </div>

        <div className="bg-card/80 backdrop-blur-md rounded-2xl p-6 mb-8 border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300">
          <h3 className="text-foreground font-bold mb-4 text-center text-lg">Why developers choose us</h3>
          <div className="space-y-4">
            <div className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group">
              <div className="bg-primary/10 p-2 rounded-lg mr-3 group-hover:bg-primary/20 transition-colors">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <span className="font-medium">99.9% uptime monitoring with instant alerts</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group">
              <div className="bg-primary/10 p-2 rounded-lg mr-3 group-hover:bg-primary/20 transition-colors">
                <BarChart3 className="h-4 w-4 text-primary" />
              </div>
              <span className="font-medium">Real-time analytics & performance insights</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group">
              <div className="bg-primary/10 p-2 rounded-lg mr-3 group-hover:bg-primary/20 transition-colors">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <span className="font-medium">AI-powered predictive monitoring</span>
            </div>
          </div>
        </div>

        <LoginForm />

        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">
            Trusted by <span className="font-semibold text-foreground">10,000+</span> developers worldwide
          </p>
        </div>
      </div>
    </div>
  )
}

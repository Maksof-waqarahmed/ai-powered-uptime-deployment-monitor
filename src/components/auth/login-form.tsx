"use client"
import { Button } from "@/components/ui/button"
import type React from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Github, Loader2, Chrome } from "lucide-react"
import { useTransition } from "react"
import { signIn } from "next-auth/react"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (provider: string) => {
    try {
      startTransition(() => {
        signIn(provider, { callbackUrl: "/dashboard" }).then((error) => console.log("Error", error))
      })
    } catch (error) {
      console.error("Error", error)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-0 shadow-2xl bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
          <p className="text-muted-foreground text-sm">Choose your preferred sign-in method</p>
        </CardHeader>
        <CardContent className="pt-6">
          <form>
            <div className="grid gap-4">
              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  className="w-full h-12 text-base font-medium border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 group bg-transparent"
                  onClick={() => handleSubmit("google")}
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                  ) : (
                    <Chrome className="h-5 w-5 mr-3 text-blue-500 group-hover:scale-110 transition-transform duration-200" />
                  )}
                  {isPending ? "Connecting..." : "Continue with Google"}
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-12 text-base font-medium border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 group bg-transparent"
                  onClick={() => handleSubmit("github")}
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                  ) : (
                    <Github className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                  )}
                  {isPending ? "Connecting..." : "Continue with GitHub"}
                </Button>
              </div>
            </div>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/60" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-4 text-muted-foreground font-medium tracking-wider">Secure & Fast</span>
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Protected by enterprise-grade security</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              By continuing, you agree to our{" "}
              <a href="#" className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors">
                Privacy Policy
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

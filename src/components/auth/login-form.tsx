'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Github, Loader2 } from "lucide-react"
import { useTransition } from "react";
import { signIn } from "next-auth/react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (provider: string) => {
    try {
      startTransition(() => {
        signIn(provider, { callbackUrl: '/dashboard' }).then((error) => console.log("Error", error))
      })
    } catch (error) {
      console.error("Error", error);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center" />
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSubmit("google")}
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 mr-2">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                  {isPending ? "Connecting..." : "Login with Google"}
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSubmit("github")}
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  ) : (
                    <Github className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                  )}
                  {isPending ? "Connecting..." : "Login with GitHub"}
                </Button>

              </div>
            </div>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Secure Authentication</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground leading-relaxed">
              By continuing, you agree to our{" "}
              <a href="#" className="text-primary hover:opacity-80 underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:opacity-80 underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

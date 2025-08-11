import React from 'react';
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Github, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const RegisterForm = ({ className, ...props }: React.ComponentProps<'div'>) => {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="bg-card backdrop-blur-md border border-border shadow-xl">
                <CardContent className="space-y-6 p-6">
                    {/* Title */}
                    <div className="text-center space-y-2">
                        <CardTitle className="text-2xl text-foreground flex items-center justify-center gap-2">
                            <Sparkles className="h-6 w-6 text-yellow-400" />
                            Create Account
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Start monitoring your applications today
                        </CardDescription>
                    </div>

                    {/* Auth Buttons */}
                    <div className="space-y-3">
                        <Button
                            variant="outline"
                            className="w-full h-12 bg-background border border-border text-foreground transition-all duration-300 group"
                        >
                            {/* Google Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform">
                                <path
                                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                    fill="currentColor"
                                />
                            </svg>
                            Sign up with Google
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full h-12 bg-background border border-border text-foreground transition-all duration-300 group"
                        >
                            <Github className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                            Sign up with GitHub
                        </Button>
                    </div>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">Free Forever</span>
                        </div>
                    </div>

                    {/* Trial Info */}
                    <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-3 border border-green-400/20">
                        <div className="flex items-center text-sm text-green-300">
                            <Sparkles className="h-4 w-4 mr-2 text-green-400" />
                            <span className="font-medium">Free 14-day trial</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            No credit card required • Cancel anytime
                        </p>
                    </div>

                    {/* Terms */}
                    <div className="text-center">
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            By signing up, you agree to our{" "}
                            <a href="#" className="text-primary underline">
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-primary underline">
                                Privacy Policy
                            </a>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default RegisterForm;

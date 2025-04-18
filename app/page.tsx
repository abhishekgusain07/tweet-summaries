import PageWrapper from "@/components/wrapper/page-wrapper";
import config from "@/config";
import Pricing from "@/components/homepage/pricing";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, CheckCircle, Sparkles, Users, BookText, MessageSquare, Clock } from "lucide-react";

export default function Home() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full "></div>
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-500/20 to-transparent"></div>
        
        <div className="container relative z-10 mx-auto px-4 py-32 md:py-40">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-slate-300 bg-white/5 px-3 py-1 text-sm">
              <span className="mr-1">✨</span> No Twitter login required
            </div>
            
            <h1 className="mb-6 bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl max-w-4xl">
              Get smart summaries from your favorite creators
            </h1>
            
            <p className="mb-10 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Bookmark your favorite X creators without an account. Get AI-generated summaries of their tweets on demand.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600" asChild>
                <Link href="/sign-in">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800" asChild>
                <Link href="#how-it-works">See How It Works</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Demo Section - Interactive Cards */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-sm font-medium">New Experience</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">From Scattered Tweets to Clear Insights</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI transforms the noise of social media into focused, valuable summaries
            </p>
          </div>
          
          <div className="relative h-[400px] md:h-[500px] mt-2 mx-auto max-w-5xl">
            {/* Floating Tweet Cards */}
            <div className="absolute w-full h-full">
              {/* Tweet Cloud - Left Side */}
              <div className="absolute left-[5%] top-[10%] animate-float-slow opacity-40 scale-75 md:scale-100">
                <TweetCard />
              </div>
              <div className="absolute left-[10%] top-[30%] animate-float-slow-reverse opacity-50 scale-75 md:scale-90">
                <TweetCard />
              </div>
              <div className="absolute left-[2%] top-[60%] animate-float opacity-30 scale-75 md:scale-85">
                <TweetCard />
              </div>
              <div className="absolute left-[15%] top-[80%] animate-float-slow opacity-20 scale-75 md:scale-75">
                <TweetCard />
              </div>
              
              {/* Tweet Cloud - Right Side */}
              <div className="absolute right-[5%] top-[15%] animate-float opacity-40 scale-75 md:scale-100">
                <TweetCard />
              </div>
              <div className="absolute right-[10%] top-[40%] animate-float-reverse opacity-50 scale-75 md:scale-90">
                <TweetCard />
              </div>
              <div className="absolute right-[3%] top-[65%] animate-float-slow opacity-30 scale-75 md:scale-85">
                <TweetCard />
              </div>
              <div className="absolute right-[15%] top-[85%] animate-float opacity-20 scale-75 md:scale-75">
                <TweetCard />
              </div>

              {/* Center Summary Card */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 scale-100 md:scale-110 animate-pulse-slow shadow-2xl">
                <SummaryCard />
              </div>

              {/* Connecting Lines (simplified) */}
              <div className="absolute inset-0 z-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M30,30 L50,50 L70,30" stroke="currentColor" strokeWidth="0.5" fill="none" />
                  <path d="M20,50 L50,50 L80,50" stroke="currentColor" strokeWidth="0.5" fill="none" />
                  <path d="M30,70 L50,50 L70,70" stroke="currentColor" strokeWidth="0.5" fill="none" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-sm font-medium">Simple Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to get concise summaries from your favorite creators
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Users className="h-12 w-12 text-sky-500" />,
                title: "Connect Creators",
                description: "Bookmark your favorite X creators without needing your own Twitter account"
              },
              {
                icon: <BookText className="h-12 w-12 text-sky-500" />,
                title: "Generate Summaries",
                description: "Convert streams of tweets into concise, easy-to-read summaries with one click"
              },
              {
                icon: <Zap className="h-12 w-12 text-sky-500" />,
                title: "Stay Updated",
                description: "Get the key insights from your favorite creators without endless scrolling"
              }
            ].map((item, i) => (
              <Card key={i} className="relative group transition-all duration-300 border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-700">
                <div className="absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 bg-gradient-to-r from-sky-500/10 via-transparent to-transparent transition-all duration-300"></div>
                <CardHeader>
                  <div className="mb-4 bg-slate-100 dark:bg-slate-800 rounded-full w-16 h-16 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
                <CardFooter>
                  <Badge variant="outline" className="text-xs">Step {i + 1}</Badge>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-sm font-medium">Key Benefits</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Why Choose Our App</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Designed to give you the best experience keeping up with your favorite creators
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "No Twitter Login Required",
                description: "Follow creators without needing to create or use your own Twitter account"
              },
              {
                title: "Concise AI Summaries",
                description: "Get the essence of what creators are sharing without scrolling through endless tweets"
              },
              {
                title: "On-Demand Updates",
                description: "Generate summaries whenever you want, not on someone else's schedule"
              },
              {
                title: "Unlimited Creators",
                description: "Add as many of your favorite creators as you want to your personal list"
              }
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-5 p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition-all">
                <div className="mt-1 rounded-full bg-sky-500/10 p-2">
                  <CheckCircle className="h-6 w-6 text-sky-500" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 px-3 py-1 text-sm font-medium">
              Get Started Today
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Ready to simplify how you follow creators?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of users who are staying updated without the noise.
            </p>
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600" asChild>
              <Link href="/sign-in">Create Your Account <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
      </div>
      </section>

      {/* Pricing Section */}
      {config.auth.enabled && config.payments.enabled && (
        <div>
          <Pricing />
        </div>
      )}
      </PageWrapper>
  );
}

// Tweet Card Component - Represents individual tweets
const TweetCard = () => (
  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-xl p-3 w-[180px] md:w-[220px]">
    <div className="flex items-center space-x-2 mb-2">
      <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700"></div>
      <div>
        <div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
        <div className="h-2 w-16 bg-slate-200/70 dark:bg-slate-700/70 mt-1 rounded"></div>
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
      <div className="h-2 w-5/6 bg-slate-200 dark:bg-slate-700 rounded"></div>
      <div className="h-2 w-4/5 bg-slate-200 dark:bg-slate-700 rounded"></div>
    </div>
    <div className="flex justify-between mt-3 pt-2 border-t border-slate-200 dark:border-slate-800">
      <div className="flex items-center space-x-1">
        <MessageSquare className="h-3 w-3 text-slate-400" />
        <div className="h-2 w-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
      </div>
      <div className="flex items-center space-x-1">
        <Clock className="h-3 w-3 text-slate-400" />
        <div className="h-2 w-8 bg-slate-200 dark:bg-slate-700 rounded"></div>
      </div>
    </div>
  </div>
);

// Summary Card Component - Represents the AI-generated summary
const SummaryCard = () => (
  <div className="bg-white dark:bg-slate-900 border-2 border-sky-200 dark:border-sky-900 shadow-lg rounded-xl p-4 w-[280px] md:w-[320px]">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center space-x-2">
        <Sparkles className="h-5 w-5 text-sky-500" />
        <div className="font-semibold text-sm">AI Summary</div>
      </div>
      <Badge variant="outline" className="text-xs px-2 py-0 h-5">Today</Badge>
    </div>
    <div className="space-y-2 mb-3">
      <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded"></div>
      <div className="h-3 w-5/6 bg-slate-100 dark:bg-slate-800 rounded"></div>
      <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded"></div>
      <div className="h-3 w-4/5 bg-slate-100 dark:bg-slate-800 rounded"></div>
    </div>
    <div className="flex items-center space-x-2 mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
      <div className="flex -space-x-2">
        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 border border-white dark:border-slate-900"></div>
        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-500 border border-white dark:border-slate-900"></div>
        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 border border-white dark:border-slate-900"></div>
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-400">3 creators summarized</div>
    </div>
  </div>
);

import HeroSection from "@/components/homepage/hero-section";
import Pricing from "@/components/homepage/pricing";
import PageWrapper from "@/components/wrapper/page-wrapper";
import config from "@/config";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Twitter, Zap, Settings, CheckCircle, Sparkles, Users, BookText } from "lucide-react";

export default function Home() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <Badge className="mb-4" variant="outline">✨ No Twitter login required</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Stay updated with <span className="text-primary">curated summaries</span> from your favorite creators
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Bookmark your favorite X creators and get concise summaries of their tweets delivered when you want them - without connecting your Twitter account.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/sign-in">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-20 bg-muted/50">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="relative rounded-xl overflow-hidden shadow-2xl border border-border">
            <div className="aspect-[16/9] w-full bg-background/80 flex items-center justify-center">
              <div className="p-6 text-center">
                <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">App screenshot preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Simple Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to get concise summaries from your favorite creators
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="h-10 w-10 text-primary" />,
                title: "Connect Creators",
                description: "Add your favorite X creators to your bookmarks list without connecting your Twitter account"
              },
              {
                icon: <BookText className="h-10 w-10 text-primary" />,
                title: "Generate Summaries",
                description: "Create summaries of their recent tweets with a single click whenever you want"
              },
              {
                icon: <Zap className="h-10 w-10 text-primary" />,
                title: "Stay Updated",
                description: "Review concise summaries of what your favorite creators are talking about"
              }
            ].map((item, i) => (
              <Card key={i} className="border border-border bg-background hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="mb-4">{item.icon}</div>
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
      <section className="py-20 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Key Benefits</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Why Choose Our App</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Designed to give you the best experience keeping up with your favorite creators
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "No Twitter Login Required",
                description: "Follow creators without needing your own Twitter account or credentials"
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
              <div key={i} className="flex items-start gap-4">
                <div className="mt-1 rounded-full bg-primary/10 p-1">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 md:p-12 text-center">
            <Badge className="mb-4 bg-primary/10 text-primary">Get Started Today</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Ready to simplify how you follow creators?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of users who are staying updated without the noise.
            </p>
            <Button size="lg" asChild>
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

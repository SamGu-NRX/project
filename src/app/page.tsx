import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Code, Rocket } from "lucide-react";
import Navigation from "@/components/navigation";

export default function Home() {
  return (
    <div id="home">
      <Navigation />
      <section className="container mx-auto px-4 py-6">
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12">
        <div className="mx-auto max-w-3xl space-y-6 px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Master AI Development
            <span className="block text-primary">With Expert Guidance</span>
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Join our comprehensive bootcamp and learn to build cutting-edge AI
            applications. From machine learning basics to advanced neural
            networks.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/register">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/courses">View Courses</Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-16 grid w-full max-w-5xl grid-cols-1 gap-6 px-4 md:grid-cols-3">
          <Card className="space-y-2 p-6">
            <Brain className="mb-4 h-12 w-12 text-primary" />
            <h3 className="text-lg font-semibold">AI Fundamentals</h3>
            <p className="text-muted-foreground">
              Master the core concepts of artificial intelligence and machine
              learning.
            </p>
          </Card>
          <Card className="space-y-2 p-6">
            <Code className="mb-4 h-12 w-12 text-primary" />
            <h3 className="text-lg font-semibold">Practical Projects</h3>
            <p className="text-muted-foreground">
              Build real-world AI applications with hands-on coding exercises.
            </p>
          </Card>
          <Card className="space-y-2 p-6">
            <Rocket className="mb-4 h-12 w-12 text-primary" />
            <h3 className="text-lg font-semibold">Career Growth</h3>
            <p className="text-muted-foreground">
              Prepare for AI development roles with industry-relevant skills.
            </p>
          </Card>
        </div>
      </div>
    </section>
  </div>
  );
}

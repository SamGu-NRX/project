import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Brain, Code, Rocket } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12">
      <div className="text-center space-y-6 max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Master AI Development
          <span className="text-primary block">With Expert Guidance</span>
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Join our comprehensive bootcamp and learn to build cutting-edge AI applications. From machine learning basics to advanced neural networks.
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-5xl mx-auto px-4">
        <Card className="p-6 space-y-2">
          <Brain className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold">AI Fundamentals</h3>
          <p className="text-muted-foreground">Master the core concepts of artificial intelligence and machine learning.</p>
        </Card>
        <Card className="p-6 space-y-2">
          <Code className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold">Practical Projects</h3>
          <p className="text-muted-foreground">Build real-world AI applications with hands-on coding exercises.</p>
        </Card>
        <Card className="p-6 space-y-2">
          <Rocket className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold">Career Growth</h3>
          <p className="text-muted-foreground">Prepare for AI development roles with industry-relevant skills.</p>
        </Card>
      </div>
    </div>
  )
}
"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const featuredProjects = [
  {
    id: 1,
    title: "Automated Lead Generation System",
    description:
      "AI-powered system that scrapes, qualifies, and enriches leads automatically, increasing conversion rates by 40%.",
    tags: ["n8n", "OpenAI", "Airtable", "Make.com"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Customer Support AI Agent",
    description:
      "Intelligent chatbot handling 80% of support tickets with natural language processing and sentiment analysis.",
    tags: ["LangChain", "GPT-4", "Zendesk", "Python"],
    image:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Invoice Processing Automation",
    description:
      "OCR and ML pipeline that extracts, validates, and processes invoices with 99% accuracy.",
    tags: ["Computer Vision", "AWS", "Zapier", "Notion"],
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=600&fit=crop",
  },
  {
    id: 4,
    title: "Social Media Content Pipeline",
    description:
      "End-to-end automation for generating, scheduling, and analyzing social media content using AI.",
    tags: ["Claude AI", "Buffer", "Midjourney", "Analytics"],
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=600&fit=crop",
  },
];

export function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section id="work" className="pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <p className="mb-2 text-sm text-muted-foreground">Selected Work</p>
          <h1 className="max-w-2xl text-4xl leading-tight font-medium tracking-tight text-foreground md:text-5xl text-balance">
            Building intelligent automation solutions that transform businesses.
          </h1>
        </div>

        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {featuredProjects.map((project) => (
              <CarouselItem
                key={project.id}
                className="pl-4 md:basis-1/2 lg:basis-1/2"
              >
                <Link href="#projects" className="group block">
                  <div className="overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/50">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-background/20 transition-opacity group-hover:opacity-0" />
                    </div>
                    <div className="p-6">
                      <div className="mb-3 flex items-start justify-between">
                        <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  type="button"
                  key={`indicator-${i}-of-${count}`}
                  onClick={() => api?.scrollTo(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === current
                      ? "w-8 bg-primary"
                      : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <CarouselPrevious className="static translate-y-0 border-border bg-card hover:bg-secondary" />
              <CarouselNext className="static translate-y-0 border-border bg-card hover:bg-secondary" />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}

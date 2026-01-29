"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "CRM Data Sync Pipeline",
    description:
      "Automated bi-directional sync between Salesforce and HubSpot, ensuring data consistency across platforms with real-time updates.",
    tags: ["Salesforce", "HubSpot", "n8n", "Webhooks"],
    videoPlaceholder:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
  },
  {
    id: 2,
    title: "Email Outreach Automation",
    description:
      "AI-driven email campaigns with personalized content, A/B testing, and automated follow-ups based on engagement metrics.",
    tags: ["Clay", "GPT-4", "Instantly", "Smartlead"],
    videoPlaceholder:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=450&fit=crop",
  },
  {
    id: 3,
    title: "Document Intelligence System",
    description:
      "Extract and structure data from PDFs, contracts, and forms using computer vision and large language models.",
    tags: ["LangChain", "Claude", "PDF.js", "Pinecone"],
    videoPlaceholder:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=450&fit=crop",
  },
  {
    id: 4,
    title: "Meeting Assistant Bot",
    description:
      "Automated meeting transcription, summarization, and action item extraction integrated with Slack and Notion.",
    tags: ["Whisper AI", "Slack API", "Notion", "Make.com"],
    videoPlaceholder:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop",
  },
  {
    id: 5,
    title: "Inventory Forecasting AI",
    description:
      "Machine learning model predicting stock levels and automating reorder processes based on historical data and trends.",
    tags: ["Python", "TensorFlow", "Shopify", "PostgreSQL"],
    videoPlaceholder:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=450&fit=crop",
  },
  {
    id: 6,
    title: "Review Monitoring System",
    description:
      "Real-time aggregation and sentiment analysis of customer reviews across multiple platforms with automated responses.",
    tags: ["Web Scraping", "NLP", "OpenAI", "Airtable"],
    videoPlaceholder:
      "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=450&fit=crop",
  },
];

function VideoCard({
  project,
}: {
  project: (typeof projects)[0];
}) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/50">
      <div
        className="relative aspect-video overflow-hidden bg-secondary"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={project.videoPlaceholder || "/placeholder.svg"}
          alt={project.title}
          className="h-full w-full object-cover"
        />
        <div
          className={`absolute inset-0 flex items-center justify-center bg-background/60 transition-opacity ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="icon"
              className="h-12 w-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" />
              )}
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-10 w-10 rounded-full"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {/* Video progress bar placeholder */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: isPlaying ? "35%" : "0%" }}
          />
        </div>
      </div>
      <div className="p-5">
        <h3 className="mb-2 text-base font-medium text-foreground">
          {project.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <p className="mb-2 text-sm text-muted-foreground">All Projects</p>
          <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            Project Demos
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Watch detailed walkthroughs of each automation project, including
            architecture explanations and live demonstrations.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <VideoCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import Link from "next/link";

export function ContactSection() {
  return (
    <section id="contact" className="py-20 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-lg">
            <p className="mb-2 text-sm text-muted-foreground">Contact</p>
            <h2 className="mb-6 text-3xl font-medium tracking-tight text-foreground md:text-4xl text-balance">
              If you would like to discuss a project or just say hi, I&#39;m
              always down to chat.
            </h2>
            <Button asChild size="lg" className="rounded-full">
              <a href="mailto:hello@example.com">
                <Mail className="mr-2 h-4 w-4" />
                Get in Touch
              </a>
            </Button>
          </div>

          <div className="space-y-8">
            <div>
              <p className="mb-3 text-sm text-muted-foreground">Email</p>
              <a
                href="mailto:hello@example.com"
                className="text-foreground hover:text-primary transition-colors"
              >
                hello@example.com
              </a>
            </div>

            <div>
              <p className="mb-3 text-sm text-muted-foreground">Socials</p>
              <div className="flex items-center gap-4">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

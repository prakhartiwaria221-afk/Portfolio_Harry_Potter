import { useState } from "react";
import { Loader2, ArrowRight, Mail, Instagram, Github, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import profileImage from "@/assets/profile-prakhar.jpg";
import hedwigImage from "@/assets/hedwig.png";
import hagridImage from "@/assets/hagrid.png";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const { ref, isVisible } = useScrollAnimation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: "Missing fields", description: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", { body: formData });
      if (error) throw error;
      toast({ title: "Owl sent! 🦉", description: "Your message has been delivered. I'll respond soon!" });
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({ title: "Failed to send", description: error.message || "Something went wrong.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const field = "w-full bg-secondary/40 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary/60 focus:shadow-[0_0_20px_hsl(var(--primary)/0.1)] transition-all placeholder:text-muted-foreground";

  const links = [
    { icon: Mail, label: "prakhartiwari6038@gmail.com", href: "mailto:prakhartiwari6038@gmail.com" },
    { icon: Instagram, label: "@prakhar6038", href: "https://instagram.com/prakhar6038" },
    { icon: Github, label: "github.com/prakhartiwaria221-afk", href: "https://github.com/prakhartiwaria221-afk" },
    { icon: Linkedin, label: "linkedin / Prakhar Tiwari", href: "https://linkedin.com/in/prakhar-tiwari-8b04a7296" },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="glow-orb w-[500px] h-[500px] bottom-0 -right-48" style={{ background: "hsl(var(--primary) / 0.08)" }} />
      <div ref={ref} className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[2rem] overflow-hidden border border-border aspect-[3/4]">
              <img src={profileImage} alt="Prakhar Tiwari" className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            </div>
            <img src={hedwigImage} alt="Hedwig" loading="lazy" className="absolute -top-8 -right-4 w-20 animate-float-gentle" />
            <img src={hagridImage} alt="Hagrid" loading="lazy" className="absolute -bottom-6 -left-4 w-16 sm:w-20 animate-float-gentle" />
          </div>
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="section-tag">Send an Owl 🦉</span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold mt-5">
                Let's build something <span className="neon-text">magical</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {links.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="glass-card p-4 flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon size={16} className="text-primary shrink-0" />
                  <span className="truncate">{label}</span>
                </a>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input id="name" placeholder="Your name" value={formData.name} onChange={handleInputChange} disabled={isSubmitting} className={field} />
              <input id="email" type="email" placeholder="Your email" value={formData.email} onChange={handleInputChange} disabled={isSubmitting} className={field} />
              <textarea id="message" rows={4} placeholder="Describe your project..." value={formData.message} onChange={handleInputChange} disabled={isSubmitting} className={`${field} resize-none`} />
              <button type="submit" disabled={isSubmitting} className="btn-neon disabled:opacity-50">
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                {isSubmitting ? "Sending..." : "Send Owl"}
              </button>
            </form>
            <p className="text-xs text-muted-foreground italic">"Help will always be given at Hogwarts to those who ask for it."</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

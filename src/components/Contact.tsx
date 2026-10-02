import { useState } from "react";
import { Loader2, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SparkleCanvas from "./SparkleCanvas";
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

  const mono = { fontFamily: "'Space Mono', monospace" };
  const field = "w-full bg-transparent border-2 border-foreground px-4 py-3 text-sm outline-none focus:bg-card";
  return (
    <section id="contact" className="py-24 border-t-2 border-foreground relative">
      <div ref={ref} className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 relative">
            <div className="border-2 border-foreground aspect-[3/4] overflow-hidden">
              <img src={profileImage} alt="Prakhar Tiwari" className="w-full h-full object-cover object-top" />
            </div>
            <img src={hedwigImage} alt="Hedwig" loading="lazy" className="absolute -top-8 -right-6 w-20 animate-float-gentle" />
            <img src={hagridImage} alt="Hagrid" loading="lazy" className="absolute -bottom-6 -left-6 w-16 sm:w-20" />
          </div>
          <div className="lg:col-span-7 space-y-8">
            <span className="zine-label -rotate-2 text-3xl sm:text-4xl">SEND AN <span className="font-bold">OWL</span> 🦉</span>
            <div className="space-y-2 text-sm underline" style={mono}>
              <p><a href="mailto:prakhartiwari0204@gmail.com">PRAKHARTIWARI0204@GMAIL.COM</a></p>
              <p><a href="https://instagram.com/prakhar6038" target="_blank" rel="noopener noreferrer">@PRAKHAR6038</a></p>
              <p><a href="https://github.com/prakhartiwaria221-afk" target="_blank" rel="noopener noreferrer">GITHUB.COM/PRAKHARTIWARIA221-AFK</a></p>
              <p><a href="https://linkedin.com/in/prakhar-tiwari-8b04a7296" target="_blank" rel="noopener noreferrer">LINKEDIN / PRAKHAR TIWARI</a></p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input id="name" placeholder="Your name" value={formData.name} onChange={handleInputChange} disabled={isSubmitting} className={field} style={mono} />
              <input id="email" type="email" placeholder="Your email" value={formData.email} onChange={handleInputChange} disabled={isSubmitting} className={field} style={mono} />
              <textarea id="message" rows={4} placeholder="Describe your project..." value={formData.message} onChange={handleInputChange} disabled={isSubmitting} className={`${field} resize-none`} style={mono} />
              <button type="submit" disabled={isSubmitting} className="zine-label flex items-center gap-2 text-sm disabled:opacity-50" style={{ background: "hsl(var(--foreground))", color: "hsl(var(--background))" }}>
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                {isSubmitting ? "SENDING..." : "SEND OWL"}
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

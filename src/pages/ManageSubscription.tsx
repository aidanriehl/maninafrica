import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Search, Settings } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ManageSubscription = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container max-w-xl">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline mb-8">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <h1 className="font-serif text-2xl md:text-3xl font-bold mb-6">Manage Your Subscription</h1>

          <div className="bg-secondary/30 rounded-2xl p-6 mb-6 border border-border">
            <p className="text-muted-foreground mb-6">
              Your donation is managed through <span className="font-bold text-foreground">Givebutter</span>, the platform we use to process donations and send you updates on the impact you're making.
            </p>

            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Search size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Step 1: Check Your Email</h3>
                  <p className="text-sm text-muted-foreground">
                    Search your inbox for emails from <span className="font-medium text-foreground">Givebutter</span>. Look for the confirmation email you received when you first donated.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Settings size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Step 2: Manage Your Donation</h3>
                  <p className="text-sm text-muted-foreground">
                    From there, you can pause, cancel, or change the amount you give each month.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Need More Help?</h3>
                  <p className="text-sm text-muted-foreground">
                    Contact us at{" "}
                    <a href="mailto:hello@1maninafrica.com" className="font-medium text-primary hover:underline">
                      hello@1maninafrica.com
                    </a>{" "}
                    and we'll get it sorted for you.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Thank you for being part of our community of donors.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ManageSubscription;

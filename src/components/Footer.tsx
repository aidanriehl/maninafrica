const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground py-10">
      <div className="container max-w-sm text-center">
        <h2 className="font-serif text-xl font-bold mb-2">Get in Touch</h2>
        <p className="text-primary-foreground/80 text-sm mb-4">
          Have a question, want to partner, or know someone who needs help?
        </p>
        <a
          href="mailto:hello@1manwithcam.com"
          className="inline-block px-6 py-2.5 bg-primary-foreground text-primary rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
        >
          hello@1manwithcam.com
        </a>
        <p className="text-primary-foreground/50 text-xs mt-8">
          © {new Date().getFullYear()} 1ManWithCam. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

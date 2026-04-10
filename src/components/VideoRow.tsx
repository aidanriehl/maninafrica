const videos = [
  { id: 1, title: "Feeding 100 Families", thumbnail: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=300&h=500&fit=crop" },
  { id: 2, title: "Clean Water for a Village", thumbnail: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?w=300&h=500&fit=crop" },
  { id: 3, title: "School Supplies Drive", thumbnail: "https://images.unsplash.com/photo-1497375638960-ca368c7231e4?w=300&h=500&fit=crop" },
  { id: 4, title: "Rent Paid for Single Mom", thumbnail: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=300&h=500&fit=crop" },
  { id: 5, title: "Winter Clothes Giveaway", thumbnail: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=300&h=500&fit=crop" },
  { id: 6, title: "Medical Bills Covered", thumbnail: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=300&h=500&fit=crop" },
];

const VideoRow = () => {
  return (
    <section className="py-12 md:py-16 bg-card overflow-hidden">
      <div className="container mb-6">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-center">
          Watch the Impact
        </h2>
        <p className="text-center text-muted-foreground mt-2">
          Every video is tied to a campaign. Tap to watch.
        </p>
      </div>

      {/* Scrolling row */}
      <div className="flex gap-4 animate-scroll-left hover:[animation-play-state:paused]" style={{ width: "max-content" }}>
        {[...videos, ...videos].map((video, i) => (
          <a
            key={i}
            href="#"
            className="flex-shrink-0 w-40 md:w-48 group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="relative rounded-xl overflow-hidden aspect-[9/16] shadow-md group-hover:shadow-lg transition-shadow">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                width={300}
                height={500}
              />
              {/* Play icon overlay */}
              <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 bg-background/80 rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-foreground ml-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              {/* Instagram-style gradient */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/70 to-transparent p-3">
                <p className="text-primary-foreground text-xs font-bold leading-tight">{video.title}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default VideoRow;

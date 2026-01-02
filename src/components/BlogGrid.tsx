import { useState } from 'react';
import BrandKitModal from './BrandKitModal';

const brandKits = [
  {
    title: "HausOfAura",
    category: "BRAND KIT",
    description: "Premium brand identity kit featuring modern design elements and comprehensive guidelines.",
    image: "/brandkits/hausofaura.PNG"
  },
  {
    title: "Auntie Tini",
    category: "BRAND KIT",
    description: "Unique brand kit with vibrant personality and authentic storytelling elements.",
    image: "/brandkits/auntietini.PNG"
  },
  {
    title: "LOUDPACK",
    category: "BRAND KIT",
    description: "Bold and energetic brand kit designed to make your business stand out.",
    image: "/brandkits/loudpack.PNG"
  }
];

const BlogGrid = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCardClick = () => {
    setModalOpen(true);
  };

  return (
    <section className="container-blog py-16">
      <h2 id="all-posts-heading" className="section-title mb-8">Brand Kits</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {brandKits.map((kit, index) => (
          <article
            key={index}
            className="blog-card group cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-black"
            onClick={handleCardClick}
          >
            <div className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={kit.image}
                  alt={`${kit.title} brand kit preview`}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width="387"
                  height="291"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 387px"
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="blog-meta">{kit.category}</span>
                </div>
                
                <h3 className="font-bold text-foreground leading-tight group-hover:text-black transition-colors text-lg">
                  {kit.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {kit.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
      <BrandKitModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
};

export default BlogGrid;
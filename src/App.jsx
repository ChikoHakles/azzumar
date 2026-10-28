import React, { useState, useEffect } from 'react';
import {
  CheckCircle2, MapPin, Clock, Phone, Menu, X,
  Star, ChevronLeft, ChevronRight, Quote, CalendarDays,
  ChevronDown
} from 'lucide-react';

import oldLabels from './data/labels.json';
import labels from './data/labels copy.json';
import productsData from './data/product-contents.json';
import itinerariesData from './data/itineraries.json';

// WhatsApp Helper
const WhatsAppAction = (message) => {
  const url = `https://wa.me/${oldLabels.contact.whatsappNumber}?text=${encodeURIComponent(message || oldLabels.contact.whatsappMessage)}`;
  window.open(url, '_blank');
};

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const slides = [
    {
      title: labels['carousel-1-title'],
      subtitle: labels['carousel-1-sub-title'],
      image: '/assets/images/header-2.jpg'
    },
    {
      title: labels['carousel-2-title'],
      subtitle: labels['carousel-2-sub-title'],
      image: '/assets/images/header-3.jpeg'
    }
  ];

  const faqs = [
    {
      q: "Apakah harga paket sudah termasuk tiket pesawat dan visa?",
      a: "Ya, seluruh harga paket kami sudah mencakup tiket pesawat PP kelas ekonomi dan pengurusan visa Umrah/Haji."
    },
    {
      q: "Bagaimana cara melakukan pembayaran?",
      a: "Pembayaran dapat dilakukan melalui transfer ke rekening resmi Az-Zumar atau datang langsung ke kantor kami."
    },
    {
      q: "Apakah ada batasan usia untuk mendaftar?",
      a: "Tidak ada batasan usia maksimal, namun untuk jamaah lansia atau yang memiliki riwayat kesehatan khusus, kami sarankan untuk didampingi oleh keluarga."
    },
    {
      q: "Apakah jadwal keberangkatan pasti?",
      a: "Insya Allah, kami berkomitmen pada '5 Pasti Umrah' sesuai arahan Kemenag, yang salah satunya adalah kepastian jadwal keberangkatan dan maskapai."
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const openItinerary = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeItinerary = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300); // Wait for transition
    document.body.style.overflow = 'auto';
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const closeMenu = () => setIsMenuOpen(false);

  const products = Object.values(productsData);

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="container header-container">
          <div className="brand">
            <div className="brand-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21a9 9 0 0 1-8.71-6.45C2.1 11 3.5 7.72 6 6c0 0-1.87 5.09 1.13 8 2.99 2.91 8.09 1 8.09 1s-1.74 2.5 1.5 5.53A8.99 8.99 0 0 1 12 21Z" /></svg>
            </div>
            {oldLabels.brandName}
          </div>
          <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <a href="#hero" className="nav-link" onClick={closeMenu}>{labels['header-home']}</a>
            <a href="#about" className="nav-link" onClick={closeMenu}>{labels['header-about']}</a>
            <a href="#products" className="nav-link" onClick={closeMenu}>{labels['header-products']}</a>
            <a href="#gallery" className="nav-link" onClick={closeMenu}>{labels['header-galery']}</a>
            <a href="#faq" className="nav-link" onClick={closeMenu}>{labels['header-faq'] || "FAQ"}</a>
            <a href="#location" className="nav-link" onClick={closeMenu}>{labels['header-location']}</a>
          </nav>
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Hero Carousel */}
      <section id="hero" className="hero-carousel">
        {slides.map((slide, index) => (
          <div key={index} className={`slide ${index === currentSlide ? 'active' : ''}`}>
            <div className="slide-bg" style={{ backgroundImage: `url('${slide.image}')` }}></div>
            <div className="slide-overlay"></div>
            <div className="slide-content container">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <button className="btn btn-primary" onClick={() => WhatsAppAction(`Halo, saya tertarik dengan info dari website.`)}>
                {slide.button || labels['carousel-1-button']}
              </button>
            </div>
          </div>
        ))}

        <button className="carousel-nav carousel-prev" onClick={() => setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1)}>
          <ChevronLeft />
        </button>
        <button className="carousel-nav carousel-next" onClick={() => setCurrentSlide(prev => prev === slides.length - 1 ? 0 : prev + 1)}>
          <ChevronRight />
        </button>

        <div className="carousel-dots">
          {slides.map((_, idx) => (
            <div key={idx} className={`dot ${idx === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(idx)}></div>
          ))}
        </div>
      </section>

      {/* About / Features Section */}
      <section id="about" className="bg-white">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">{labels['about-title']}</h2>
            <p className="section-subtitle">{labels['about-sub-title']}</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <CheckCircle2 size={40} />
              </div>
              <h3>{labels['about-1-title']}</h3>
              <p>{labels['about-1-sub-title']}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Star size={40} />
              </div>
              <h3>{labels['about-2-title']}</h3>
              <p>{labels['about-2-sub-title']}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <CheckCircle2 size={40} />
              </div>
              <h3>{labels['about-3-title']}</h3>
              <p>{labels['about-3-sub-title']}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quran / Hadith Section */}
      <section className="quran-section">
        <div className="container quran-content">
          <div className="quran-arabic">
            وَلِلَّهِ عَلَى ٱلنَّاسِ حِجُّ ٱلْبَيْتِ مَنِ ٱسْتَطَاعَ إِلَيْهِ سَبِيلًۭا
          </div>
          <p className="quran-translation">
            "Dan (di antara) kewajiban manusia terhadap Allah adalah melaksanakan ibadah haji ke Baitullah, yaitu bagi orang-orang yang mampu mengadakan perjalanan ke sana."
          </p>
          <div className="quran-ref">(QS. Ali 'Imran: 97)</div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">{labels['products-title']}</h2>
            <p className="section-subtitle">{labels['products-sub-title']}</p>
          </div>

          <div className="products-grid">
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                {/* Dynamically fallback if specific image is not found */}
                <div className="product-image" style={{ backgroundImage: `url('/assets/images/header-${(product.id % 5) + 2}.jpeg')` }}>
                  <div className="product-duration">{product.duration}</div>
                </div>
                <div className="product-content">
                  <h3>{product.name}</h3>
                  <div className="product-price">{product.price}</div>
                  <p>{product.description}</p>

                  <ul className="product-highlights">
                    {product.highlights.slice(0, 3).map((hl, idx) => (
                      <li key={idx}><CheckCircle2 size={16} /> {hl}</li>
                    ))}
                  </ul>

                  <div className="product-actions">
                    <button className="btn btn-secondary" onClick={() => openItinerary(product)}>
                      <CalendarDays size={18} /> {labels['itinerary-view-button'] || 'Selengkapnya'}
                    </button>
                    <button className="btn btn-primary" onClick={() => WhatsAppAction(`Halo, saya tertarik dengan paket ${product.name}.`)}>
                      <Phone size={18} /> Chat
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="gallery" className="bg-white">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">{labels['testimony']}</h2>
            <p className="section-subtitle">Dengarkan apa kata jamaah kami tentang pengalaman mereka.</p>
          </div>

          <div className="testimonials-grid">
            {[1, 2, 3].map((num) => (
              <div className="testimonial-card" key={num}>
                <Quote className="quote-icon" />
                <div className="stars">
                  <Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} />
                </div>
                <p className="testimonial-text">"{labels[`testimony-${num}-sub-title`]}"</p>
                <div className="testimonial-author">
                  {/* Using unavatar.io for random reliable placeholder avatars */}
                  <img src={`https://unavatar.io/twitter/user${num}00`} alt="Avatar" className="author-avatar" onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + labels[`testimony-${num}-title`] + '&background=6B9E78&color=fff' }} />
                  <div className="author-info">
                    <h4>{labels[`testimony-${num}-title`]}</h4>
                    <p>Jamaah Az-Zumar</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq-section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Pertanyaan yang Sering Diajukan</h2>
            <p className="section-subtitle">Temukan jawaban atas pertanyaan umum mengenai layanan kami.</p>
          </div>

          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div className={`faq-item ${openFaq === index ? 'active' : ''}`} key={index}>
                <button className="faq-question" onClick={() => toggleFaq(index)}>
                  {faq.q}
                  <ChevronDown className="faq-icon" size={20} />
                </button>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Location / Contact Section */}
      <section id="location" className="location-section-modern">
        <div className="map-container-modern">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.328384595672!2d106.9133617!3d-6.2203567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698d4067cd3255%3A0xde76a33d61848a4a!2sAzzumar%20wisata!5e0!3m2!1sid!2sid!4v1755007679027!5m2!1sid!2sid"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Az-Zumar Location"
          ></iframe>
        </div>
        <div className="container location-overlay-container">
          <div className="location-card glassmorphism">
            <h2>{labels['location-title']}</h2>
            <p>{labels['location-sub-title']}</p>
            <div className="contact-details">
              <div className="contact-item">
                <MapPin size={20} style={{ color: 'var(--primary)' }} />
                <span>Jl. Al-Partiah, RT.7/RW.10, Klender, Duren Sawit, Jakarta Timur 13470</span>
              </div>
              <div className="contact-item">
                <Clock size={20} style={{ color: 'var(--primary)' }} />
                <span>Senin - Jumat: 09:00 - 17:00</span>
              </div>
            </div>
            <button className="btn btn-primary btn-block" onClick={() => WhatsAppAction()}>
              <Phone size={18} /> Hubungi Kami Sekarang
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="brand" style={{ color: 'white', marginBottom: '20px' }}>
                {oldLabels.brandName}
              </div>
              <p>{oldLabels.footer.description}</p>
            </div>
            <div>
              <h3>Kontak</h3>
              <p style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}><Phone size={16} /> +{oldLabels.contact.whatsappNumber}</p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><MapPin size={16} /> Jakarta, Indonesia</p>
            </div>
          </div>
          <div className="footer-bottom">
            {oldLabels.footer.copyright}
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <div className="wa-float" onClick={() => WhatsAppAction()} style={{ cursor: 'pointer' }} title="Chat with us on WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </div>

      {/* Itinerary Modal */}
      <div className={`modal-overlay ${isModalOpen ? 'active' : ''}`} onClick={closeItinerary}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>{labels['itinerary-modal-title-prefix'] || 'Itinerary'} {selectedProduct?.name}</h3>
            <button className="modal-close" onClick={closeItinerary}>
              <X size={24} />
            </button>
          </div>
          <div className="modal-body">
            {selectedProduct && itinerariesData[selectedProduct.itinerary_id] ? (
              <div className="itinerary-list">
                {itinerariesData[selectedProduct.itinerary_id].map((item, idx) => (
                  <div className="itinerary-item" key={idx}>
                    <div className="itinerary-dot"></div>
                    <div className="itinerary-header">
                      <div className="itinerary-day">{labels['itinerary-modal-header-day'] || 'Hari'} {item.day}: {item.activity}</div>
                      <div className="itinerary-time-loc">
                        <span><Clock size={14} /> {item.time}</span>
                        <span><MapPin size={14} /> {item.location}</span>
                      </div>
                    </div>
                    <div className="itinerary-desc">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Itinerary tidak tersedia untuk paket ini.</p>
            )}

            <div style={{ marginTop: '30px', textAlign: 'center' }}>
              <button className="btn btn-primary" onClick={() => {
                closeItinerary();
                WhatsAppAction(`Halo, saya ingin daftar ${selectedProduct?.name}.`);
              }}>
                <CheckCircle2 size={18} /> Daftar Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

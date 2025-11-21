// Gallery JavaScript

let currentImageIndex = 0;
let galleryImages = [];

// Load gallery from JSON
async function loadGallery() {
    try {
        const response = await fetch('data/gallery.json');
        const images = await response.json();
        galleryImages = images;
        displayGallery(images);
    } catch (error) {
        console.error('Error loading gallery:', error);
        // Fallback gallery if JSON fails to load
        const fallbackImages = getFallbackGallery();
        galleryImages = fallbackImages;
        displayGallery(fallbackImages);
    }
}

function displayGallery(images, filter = 'all') {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    // Filter images
    const filteredImages = filter === 'all' 
        ? images 
        : images.filter(img => img.category === filter);
    
    galleryGrid.innerHTML = '';
    
    filteredImages.forEach((image, index) => {
        const galleryItem = createGalleryItem(image, index);
        galleryGrid.appendChild(galleryItem);
    });
}

function createGalleryItem(image, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `
        <div class="gallery-image">${image.icon || '📷'}</div>
        <div class="gallery-overlay">
            <div>${image.caption || 'College Photo'}</div>
        </div>
    `;
    
    item.addEventListener('click', () => {
        openLightbox(index);
    });
    
    return item;
}

// Lightbox functionality
function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    if (lightbox && lightboxImage && lightboxCaption) {
        const image = galleryImages[currentImageIndex];
        lightboxImage.src = image.url || '#';
        lightboxImage.alt = image.caption || 'Gallery Image';
        lightboxCaption.textContent = image.caption || 'College Photo';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxImage();
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    if (lightboxImage && lightboxCaption) {
        const image = galleryImages[currentImageIndex];
        lightboxImage.src = image.url || '#';
        lightboxImage.alt = image.caption || 'Gallery Image';
        lightboxCaption.textContent = image.caption || 'College Photo';
    }
}

// Lightbox event listeners
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxPrev) {
    lightboxPrev.addEventListener('click', showPrevImage);
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', showNextImage);
}

// Close lightbox on outside click
const lightbox = document.getElementById('lightbox');
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
    }
});

// Gallery Filter Buttons
const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');
filterButtons.forEach(button => {
    button.addEventListener('click', async () => {
        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        await loadGallery();
        try {
            const response = await fetch('data/gallery.json');
            const images = await response.json();
            displayGallery(images, filter);
        } catch (error) {
            const fallbackImages = getFallbackGallery();
            displayGallery(fallbackImages, filter);
        }
    });
});

// Fallback gallery data
function getFallbackGallery() {
    return [
        { caption: "College Main Building", category: "campus", icon: "🏛️" },
        { caption: "Library Interior", category: "campus", icon: "📚" },
        { caption: "Science Laboratory", category: "campus", icon: "🔬" },
        { caption: "Computer Lab", category: "campus", icon: "💻" },
        { caption: "Sports Ground", category: "sports", icon: "🏃" },
        { caption: "Basketball Court", category: "sports", icon: "🏀" },
        { caption: "Annual Day Performance", category: "cultural", icon: "🎭" },
        { caption: "Dance Performance", category: "cultural", icon: "💃" },
        { caption: "Science Exhibition", category: "events", icon: "🔬" },
        { caption: "Guest Lecture", category: "events", icon: "🎤" },
        { caption: "College Cafeteria", category: "campus", icon: "🍽️" },
        { caption: "Auditorium", category: "campus", icon: "🎭" }
    ];
}

// Load gallery on page load
if (document.getElementById('galleryGrid')) {
    loadGallery();
}


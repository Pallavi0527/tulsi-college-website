// Courses JavaScript

// Load courses from JSON
async function loadCourses() {
    try {
        const response = await fetch('data/courses.json');
        const courses = await response.json();
        displayCourses(courses);
    } catch (error) {
        console.error('Error loading courses:', error);
        // Fallback courses if JSON fails to load
        const fallbackCourses = getFallbackCourses();
        displayCourses(fallbackCourses);
    }
}

function displayCourses(courses, filter = 'all') {
    const coursesGrid = document.getElementById('coursesGrid');
    const coursesList = document.getElementById('coursesList');
    const container = coursesGrid || coursesList;
    
    if (!container) return;
    
    // Filter courses
    const filteredCourses = filter === 'all' 
        ? courses 
        : courses.filter(course => course.category === filter);
    
    container.innerHTML = '';
    
    filteredCourses.forEach(course => {
        const courseCard = createCourseCard(course);
        container.appendChild(courseCard);
    });
}

function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
        <div class="course-image">${course.icon || '📚'}</div>
        <div class="course-content">
            <h3>${course.name}</h3>
            <p>${course.description}</p>
            <div class="course-meta">
                <span>Duration: ${course.duration}</span>
                <span>${course.category}</span>
            </div>
        </div>
    `;
    
    // Add click event to navigate to course detail
    card.addEventListener('click', () => {
        // In a real implementation, this would navigate to a course detail page
        alert(`Course: ${course.name}\n\n${course.description}`);
    });
    
    return card;
}

// Course Search
const courseSearch = document.getElementById('courseSearch');
if (courseSearch) {
    courseSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterCoursesBySearch(searchTerm);
    });
}

async function filterCoursesBySearch(searchTerm) {
    try {
        const response = await fetch('data/courses.json');
        const courses = await response.json();
        const filtered = courses.filter(course => 
            course.name.toLowerCase().includes(searchTerm) ||
            course.description.toLowerCase().includes(searchTerm)
        );
        displayCourses(filtered);
    } catch (error) {
        console.error('Error filtering courses:', error);
    }
}

// Course Filter Buttons
const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');
filterButtons.forEach(button => {
    button.addEventListener('click', async () => {
        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        await loadCourses();
        displayCourses(await fetch('data/courses.json').then(r => r.json()), filter);
    });
});

// Fallback courses data
function getFallbackCourses() {
    return [
        {
            name: "B.Com (General)",
            description: "Bachelor of Commerce with comprehensive business and accounting knowledge",
            duration: "3 Years",
            category: "commerce",
            icon: "💼"
        },
        {
            name: "B.Com (Hons)",
            description: "Honors program in Commerce with advanced specialization",
            duration: "3 Years",
            category: "commerce",
            icon: "📊"
        },
        {
            name: "B.Sc (PCM)",
            description: "Bachelor of Science in Physics, Chemistry, and Mathematics",
            duration: "3 Years",
            category: "science",
            icon: "🔬"
        },
        {
            name: "B.Sc (PCB)",
            description: "Bachelor of Science in Physics, Chemistry, and Biology",
            duration: "3 Years",
            category: "science",
            icon: "🧬"
        },
        {
            name: "B.A",
            description: "Bachelor of Arts in English, History, and Political Science",
            duration: "3 Years",
            category: "arts",
            icon: "📖"
        },
        {
            name: "BBA",
            description: "Bachelor of Business Administration",
            duration: "3 Years",
            category: "professional",
            icon: "🎯"
        },
        {
            name: "BCA",
            description: "Bachelor of Computer Applications",
            duration: "3 Years",
            category: "professional",
            icon: "💻"
        },
        {
            name: "M.Com",
            description: "Master of Commerce",
            duration: "2 Years",
            category: "commerce",
            icon: "🎓"
        }
    ];
}

// Load courses on page load
if (document.getElementById('coursesGrid') || document.getElementById('coursesList')) {
    loadCourses();
}


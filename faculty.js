// Faculty JavaScript

// Load faculty from JSON
async function loadFaculty() {
    try {
        const response = await fetch('data/faculty.json');
        const faculty = await response.json();
        displayFaculty(faculty);
    } catch (error) {
        console.error('Error loading faculty:', error);
        // Fallback faculty if JSON fails to load
        const fallbackFaculty = getFallbackFaculty();
        displayFaculty(fallbackFaculty);
    }
}

function displayFaculty(faculty, filter = 'all') {
    const facultyGrid = document.getElementById('facultyGrid');
    if (!facultyGrid) return;
    
    // Filter faculty
    const filteredFaculty = filter === 'all' 
        ? faculty 
        : faculty.filter(member => member.department === filter);
    
    facultyGrid.innerHTML = '';
    
    filteredFaculty.forEach(member => {
        const facultyCard = createFacultyCard(member);
        facultyGrid.appendChild(facultyCard);
    });
}

function createFacultyCard(member) {
    const card = document.createElement('div');
    card.className = 'faculty-card';
    card.innerHTML = `
        <div class="faculty-image">${member.photo || '👨‍🏫'}</div>
        <div class="faculty-info">
            <h3>${member.name}</h3>
            <p class="faculty-designation">${member.designation}</p>
            <p class="faculty-qualification">${member.qualification}</p>
            <span class="faculty-department">${member.department}</span>
        </div>
    `;
    return card;
}

// Faculty Filter Buttons
const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');
filterButtons.forEach(button => {
    button.addEventListener('click', async () => {
        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        await loadFaculty();
        try {
            const response = await fetch('data/faculty.json');
            const faculty = await response.json();
            displayFaculty(faculty, filter);
        } catch (error) {
            const fallbackFaculty = getFallbackFaculty();
            displayFaculty(fallbackFaculty, filter);
        }
    });
});

// Fallback faculty data
function getFallbackFaculty() {
    return [
        {
            name: "Dr. Rajesh Kumar",
            designation: "Principal",
            qualification: "Ph.D. in Commerce",
            department: "Management",
            photo: "👨‍🏫"
        },
        {
            name: "Prof. Meera Singh",
            designation: "Vice Principal",
            qualification: "M.Com, M.Phil",
            department: "Commerce",
            photo: "👩‍🏫"
        },
        {
            name: "Dr. Anil Sharma",
            designation: "Professor",
            qualification: "Ph.D. in Physics",
            department: "Science",
            photo: "👨‍🔬"
        },
        {
            name: "Prof. Priya Patel",
            designation: "Associate Professor",
            qualification: "M.Sc, Ph.D.",
            department: "Science",
            photo: "👩‍🔬"
        },
        {
            name: "Dr. Vikram Mehta",
            designation: "Professor",
            qualification: "Ph.D. in English Literature",
            department: "Arts",
            photo: "👨‍🎓"
        },
        {
            name: "Prof. Sunita Reddy",
            designation: "Associate Professor",
            qualification: "M.A, M.Phil",
            department: "Arts",
            photo: "👩‍🎓"
        },
        {
            name: "Prof. Rahul Gupta",
            designation: "Assistant Professor",
            qualification: "M.Com, NET",
            department: "Commerce",
            photo: "👨‍💼"
        },
        {
            name: "Prof. Neha Verma",
            designation: "Assistant Professor",
            qualification: "M.C.A, M.Tech",
            department: "Professional",
            photo: "👩‍💻"
        },
        {
            name: "Prof. Amit Kumar",
            designation: "Assistant Professor",
            qualification: "M.B.A, Ph.D.",
            department: "Professional",
            photo: "👨‍💼"
        }
    ];
}

// Load faculty on page load
if (document.getElementById('facultyGrid')) {
    loadFaculty();
}


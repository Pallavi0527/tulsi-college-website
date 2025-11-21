// Events and Notices JavaScript

// Load events from JSON
async function loadEvents() {
    try {
        const response = await fetch('data/events.json');
        const data = await response.json();
        displayEvents(data.events);
        displayNotices(data.notices);
    } catch (error) {
        console.error('Error loading events:', error);
        // Fallback data if JSON fails to load
        const fallbackData = getFallbackEvents();
        displayEvents(fallbackData.events);
        displayNotices(fallbackData.notices);
    }
}

function displayEvents(events) {
    const eventsGrid = document.getElementById('eventsGrid');
    if (!eventsGrid) return;
    
    eventsGrid.innerHTML = '';
    
    events.forEach(event => {
        const eventCard = createEventCard(event);
        eventsGrid.appendChild(eventCard);
    });
}

function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
        <div class="event-image">${event.icon || '📅'}</div>
        <div class="event-content">
            <div class="event-date">📅 ${event.date}</div>
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <div class="event-location">
                <span>📍</span>
                <span>${event.location}</span>
            </div>
        </div>
    `;
    return card;
}

function displayNotices(notices) {
    const noticesBoard = document.getElementById('noticesBoard');
    if (!noticesBoard) return;
    
    noticesBoard.innerHTML = '';
    
    notices.forEach(notice => {
        const noticeItem = createNoticeItem(notice);
        noticesBoard.appendChild(noticeItem);
    });
}

function createNoticeItem(notice) {
    const item = document.createElement('div');
    item.className = 'notice-item';
    item.innerHTML = `
        <div class="notice-header">
            <div class="notice-title">${notice.title}</div>
            <div class="notice-date">${notice.date}</div>
        </div>
        <div class="notice-content">${notice.content}</div>
        ${notice.download ? `<a href="${notice.download}" class="notice-download" download>📥 Download Notice</a>` : ''}
    `;
    return item;
}

// Fallback events data
function getFallbackEvents() {
    return {
        events: [
            {
                title: "Annual Day Celebration",
                description: "Join us for our annual day celebration with cultural performances, awards ceremony, and guest speakers.",
                date: "March 15, 2024",
                location: "College Auditorium",
                icon: "🎭"
            },
            {
                title: "Science Exhibition",
                description: "Students showcase innovative science projects and experiments. Open to all students and parents.",
                date: "March 20, 2024",
                location: "Science Block",
                icon: "🔬"
            },
            {
                title: "Sports Meet 2024",
                description: "Annual inter-department sports competition featuring athletics, cricket, football, and more.",
                date: "March 25, 2024",
                location: "College Ground",
                icon: "🏃"
            },
            {
                title: "Career Guidance Seminar",
                description: "Expert speakers discuss career opportunities and higher education options for students.",
                date: "April 5, 2024",
                location: "Seminar Hall",
                icon: "💼"
            }
        ],
        notices: [
            {
                title: "Admission Open for Academic Year 2024-25",
                date: "March 1, 2024",
                content: "Admissions are now open for all undergraduate and postgraduate courses. Last date for submission: April 30, 2024.",
                download: "#"
            },
            {
                title: "Holiday Notice - Holi Festival",
                date: "March 8, 2024",
                content: "College will remain closed on March 25, 2024 on account of Holi festival. Classes will resume on March 26, 2024.",
                download: "#"
            },
            {
                title: "Examination Schedule Released",
                date: "February 28, 2024",
                content: "The examination schedule for the current semester has been released. Students are advised to check the notice board or college website.",
                download: "#"
            },
            {
                title: "Library Timings Extended",
                date: "February 25, 2024",
                content: "Library will remain open till 8:00 PM during examination period. All students are welcome to utilize the extended hours.",
                download: "#"
            },
            {
                title: "Scholarship Application Deadline",
                date: "February 20, 2024",
                content: "Last date for submitting scholarship applications is March 15, 2024. Eligible students are requested to submit their applications on time.",
                download: "#"
            }
        ]
    };
}

// Load events on page load
if (document.getElementById('eventsGrid') || document.getElementById('noticesBoard')) {
    loadEvents();
}


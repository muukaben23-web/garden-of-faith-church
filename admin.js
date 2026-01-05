// Admin Panel JavaScript - Dynamic Content Management

class AdminPanel {
    constructor() {
        this.data = this.loadData();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSavedContent();
        this.setupAutoSave();
    }

    setupEventListeners() {
        // Sidebar navigation
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.addEventListener('click', (e) => this.switchSection(e));
        });

        // Toggle sidebar
        document.getElementById('toggleSidebar')?.addEventListener('click', () => {
            this.toggleSidebar();
        });

        // Form inputs auto-save
        document.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('change', () => this.autoSave());
        });
    }

    switchSection(e) {
        const item = e.currentTarget;
        const sectionId = item.dataset.section;

        // Update active states
        document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));

        item.classList.add('active');
        document.getElementById(sectionId)?.classList.add('active');
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const content = document.getElementById('adminContent');
        
        sidebar?.classList.toggle('collapsed');
        content?.classList.toggle('expanded');
    }

    // Data Management
    loadData() {
        const saved = localStorage.getItem('churchAdminData');
        return saved ? JSON.parse(saved) : this.getDefaultData();
    }

    getDefaultData() {
        return {
            services: [
                {
                    id: 1,
                    name: 'Sunday Service',
                    day: 'Sunday',
                    time: '8:00 AM - 11:00 AM',
                    description: 'Main worship service with preaching and fellowship',
                    icon: 'fa-church'
                },
                {
                    id: 2,
                    name: 'Bible Study',
                    day: 'Wednesday',
                    time: '3:00 PM - 5:00 PM',
                    description: 'Deep dive into God\'s Word and spiritual growth',
                    icon: 'fa-bible'
                },
                {
                    id: 3,
                    name: 'Women\'s Fellowship',
                    day: 'Thursday',
                    time: '9:00 AM - 12:00 PM',
                    description: 'Special gathering for women to connect and grow together',
                    icon: 'fa-users'
                },
                {
                    id: 4,
                    name: 'Discipleship Class',
                    day: 'Monday & Friday',
                    time: '6:00 PM - 8:00 PM',
                    description: 'Biblical teaching and practical faith application',
                    icon: 'fa-graduation-cap'
                },
                {
                    id: 5,
                    name: 'Youth Fellowship',
                    day: 'Saturday',
                    time: '3:00 PM - 5:00 PM',
                    description: 'Engaging activities for youth to grow in faith',
                    icon: 'fa-young'
                },
                {
                    id: 6,
                    name: 'Praise Rehearsals',
                    day: 'Saturday',
                    time: '5:00 PM - 6:00 PM',
                    description: 'Practice for worship ministry and praise team',
                    icon: 'fa-music'
                }
            ],
            about: {
                mission: 'To glorify God by making disciples of all nations, baptizing them in the name of the Father, Son, and Holy Spirit, and teaching them to obey everything Jesus commanded.',
                vision: 'We envision a transformed Zambia where hope flourishes through Christ-centered initiatives. Our vision is to build orphanages to care for vulnerable children, establish schools that provide quality education with Christian values, create community centers that help the needy, launch radio stations to spread the gospel nationwide, and develop sustainable programs that empower communities spiritually, socially, and economically.',
                beliefs: [
                    'The Bible is the inspired Word of God',
                    'One God eternally existing in three persons: Father, Son, and Holy Spirit',
                    'Jesus Christ is the Son of God, born of a virgin, died for our sins, and rose again',
                    'Salvation is by grace through faith in Jesus Christ',
                    'The baptism of the Holy Spirit with evidence of speaking in tongues',
                    'Divine healing, miracles, and the return of Jesus Christ'
                ]
            },
            contact: {
                name: 'Garden of Faith Israel Pentecostal Church of Zambia',
                address: '123 Church Road, Lusaka, Zambia',
                phone: '+260 123 456 789',
                email: 'info@gardenoffaith.org.zm',
                officeHours: 'Monday - Friday, 9:00 AM - 5:00 PM'
            },
            prayerRequests: [
                {
                    id: 1,
                    name: 'Anonymous',
                    request: 'Please pray for healing and restoration in our family.',
                    time: '2 hours ago',
                    praying: 12
                },
                {
                    id: 2,
                    name: 'John M.',
                    request: 'Praying for job opportunities and financial provision.',
                    time: '5 hours ago',
                    praying: 8
                }
            ],
            gallery: [
                {
                    id: 1,
                    title: 'Worship Service',
                    category: 'worship',
                    image: 'https://via.placeholder.com/300x200/0056b3/ffffff?text=Worship',
                    description: 'Join us in praise and worship'
                },
                {
                    id: 2,
                    title: 'Community Fellowship',
                    category: 'community',
                    image: 'https://via.placeholder.com/300x200/007bff/ffffff?text=Community',
                    description: 'Building lasting relationships'
                },
                {
                    id: 3,
                    title: 'Youth Ministry',
                    category: 'youth',
                    image: 'https://via.placeholder.com/300x200/0056b3/ffffff?text=Youth',
                    description: 'Empowering the next generation'
                },
                {
                    id: 4,
                    title: 'Community Outreach',
                    category: 'outreach',
                    image: 'https://via.placeholder.com/300x200/007bff/ffffff?text=Outreach',
                    description: 'Serving our local community'
                }
            ],
            settings: {
                primaryColor: '#0056b3',
                secondaryColor: '#007bff',
                backgroundColor: '#f8f9fa',
                enablePrayerWall: true,
                enableGallery: true,
                enableCountdown: true
            }
        };
    }

    saveData() {
        localStorage.setItem('churchAdminData', JSON.stringify(this.data));
        this.updateMainSite();
    }

    loadSavedContent() {
        // Load mission and vision
        const missionTextarea = document.getElementById('missionStatement');
        const visionTextarea = document.getElementById('visionStatement');
        
        if (missionTextarea) missionTextarea.value = this.data.about.mission;
        if (visionTextarea) visionTextarea.value = this.data.about.vision;

        // Load contact info
        document.getElementById('churchName') && (document.getElementById('churchName').value = this.data.contact.name);
        document.getElementById('churchAddress') && (document.getElementById('churchAddress').value = this.data.contact.address);
        document.getElementById('churchPhone') && (document.getElementById('churchPhone').value = this.data.contact.phone);
        document.getElementById('churchEmail') && (document.getElementById('churchEmail').value = this.data.contact.email);

        // Load settings
        this.loadSettings();
    }

    loadSettings() {
        const settings = this.data.settings;
        
        // Color settings
        document.querySelectorAll('input[type="color"]').forEach((input, index) => {
            const colors = [settings.primaryColor, settings.secondaryColor, settings.backgroundColor];
            if (colors[index]) input.value = colors[index];
        });

        // Checkbox settings
        document.getElementById('enablePrayerWall') && (document.getElementById('enablePrayerWall').checked = settings.enablePrayerWall);
        document.getElementById('enableGallery') && (document.getElementById('enableGallery').checked = settings.enableGallery);
        document.getElementById('enableCountdown') && (document.getElementById('enableCountdown').checked = settings.enableCountdown);
    }

    setupAutoSave() {
        let saveTimeout;
        document.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('input', () => {
                clearTimeout(saveTimeout);
                saveTimeout = setTimeout(() => this.autoSave(), 1000);
            });
        });
    }

    autoSave() {
        // Collect current form data
        this.collectFormData();
        this.saveData();
        this.showAutoSaveIndicator();
    }

    collectFormData() {
        // Collect mission and vision
        const missionTextarea = document.getElementById('missionStatement');
        const visionTextarea = document.getElementById('visionStatement');
        
        if (missionTextarea) this.data.about.mission = missionTextarea.value;
        if (visionTextarea) this.data.about.vision = visionTextarea.value;

        // Collect contact info
        if (document.getElementById('churchName')) this.data.contact.name = document.getElementById('churchName').value;
        if (document.getElementById('churchAddress')) this.data.contact.address = document.getElementById('churchAddress').value;
        if (document.getElementById('churchPhone')) this.data.contact.phone = document.getElementById('churchPhone').value;
        if (document.getElementById('churchEmail')) this.data.contact.email = document.getElementById('churchEmail').value;

        // Collect settings
        this.collectSettings();
    }

    collectSettings() {
        const colors = document.querySelectorAll('input[type="color"]');
        if (colors[0]) this.data.settings.primaryColor = colors[0].value;
        if (colors[1]) this.data.settings.secondaryColor = colors[1].value;
        if (colors[2]) this.data.settings.backgroundColor = colors[2].value;

        if (document.getElementById('enablePrayerWall')) this.data.settings.enablePrayerWall = document.getElementById('enablePrayerWall').checked;
        if (document.getElementById('enableGallery')) this.data.settings.enableGallery = document.getElementById('enableGallery').checked;
        if (document.getElementById('enableCountdown')) this.data.settings.enableCountdown = document.getElementById('enableCountdown').checked;
    }

    showAutoSaveIndicator() {
        // Create or update auto-save indicator
        let indicator = document.getElementById('autoSaveIndicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'autoSaveIndicator';
            indicator.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #28a745;
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                z-index: 9999;
                font-size: 14px;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            document.body.appendChild(indicator);
        }

        indicator.textContent = 'Auto-saved';
        indicator.style.opacity = '1';

        setTimeout(() => {
            indicator.style.opacity = '0';
        }, 2000);
    }

    updateMainSite() {
        // This function would update the main site with new data
        // For now, we'll just save the data that can be loaded by the main site
        localStorage.setItem('churchWebsiteData', JSON.stringify(this.data));
        console.log('Main site data updated');
    }

    // Service Management
    addService() {
        const newService = {
            id: Date.now(),
            name: '',
            day: '',
            time: '',
            description: '',
            icon: 'fa-church'
        };
        this.data.services.push(newService);
        this.saveData();
        this.renderServices();
    }

    deleteService(id) {
        this.data.services = this.data.services.filter(service => service.id !== id);
        this.saveData();
        this.renderServices();
    }

    renderServices() {
        const servicesList = document.getElementById('servicesList');
        if (!servicesList) return;

        servicesList.innerHTML = this.data.services.map(service => `
            <div class="service-item" data-id="${service.id}">
                <button class="delete-btn" onclick="adminPanel.deleteService(${service.id})">×</button>
                <div class="row">
                    <div class="col-md-3">
                        <input type="text" class="form-control" placeholder="Service Name" value="${service.name}" onchange="adminPanel.updateService(${service.id}, 'name', this.value)">
                    </div>
                    <div class="col-md-2">
                        <input type="text" class="form-control" placeholder="Day" value="${service.day}" onchange="adminPanel.updateService(${service.id}, 'day', this.value)">
                    </div>
                    <div class="col-md-3">
                        <input type="text" class="form-control" placeholder="Time" value="${service.time}" onchange="adminPanel.updateService(${service.id}, 'time', this.value)">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" placeholder="Description" value="${service.description}" onchange="adminPanel.updateService(${service.id}, 'description', this.value)">
                    </div>
                </div>
            </div>
        `).join('');
    }

    updateService(id, field, value) {
        const service = this.data.services.find(s => s.id === id);
        if (service) {
            service[field] = value;
            this.saveData();
        }
    }

    // Prayer Request Management
    addPrayerRequest(name, request) {
        const newPrayer = {
            id: Date.now(),
            name: name || 'Anonymous',
            request: request,
            time: 'Just now',
            praying: 0
        };
        this.data.prayerRequests.unshift(newPrayer);
        this.saveData();
        this.renderPrayerRequests();
    }

    deletePrayerRequest(id) {
        this.data.prayerRequests = this.data.prayerRequests.filter(prayer => prayer.id !== id);
        this.saveData();
        this.renderPrayerRequests();
    }

    renderPrayerRequests() {
        const prayerList = document.getElementById('prayerRequestsList');
        if (!prayerList) return;

        prayerList.innerHTML = this.data.prayerRequests.map(prayer => `
            <div class="prayer-item-admin">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <strong>${prayer.name}</strong>
                        <p class="mb-1">${prayer.request}</p>
                        <small class="text-muted">${prayer.time}</small>
                    </div>
                    <button class="btn btn-sm btn-danger" onclick="adminPanel.deletePrayerRequest(${prayer.id})">Delete</button>
                </div>
            </div>
        `).join('');
    }

    // Gallery Management
    addGalleryItem() {
        const newItem = {
            id: Date.now(),
            title: '',
            category: 'worship',
            image: '',
            description: ''
        };
        this.data.gallery.push(newItem);
        this.saveData();
        this.renderGallery();
    }

    deleteGalleryItem(id) {
        this.data.gallery = this.data.gallery.filter(item => item.id !== id);
        this.saveData();
        this.renderGallery();
    }

    renderGallery() {
        const galleryList = document.getElementById('galleryItemsList');
        if (!galleryList) return;

        galleryList.innerHTML = this.data.gallery.map(item => `
            <div class="gallery-item-admin" data-id="${item.id}">
                <input type="text" class="form-control mb-2" placeholder="Title" value="${item.title}" onchange="adminPanel.updateGalleryItem(${item.id}, 'title', this.value)">
                <select class="form-control mb-2" onchange="adminPanel.updateGalleryItem(${item.id}, 'category', this.value)">
                    <option value="worship" ${item.category === 'worship' ? 'selected' : ''}>Worship</option>
                    <option value="community" ${item.category === 'community' ? 'selected' : ''}>Community</option>
                    <option value="youth" ${item.category === 'youth' ? 'selected' : ''}>Youth</option>
                    <option value="outreach" ${item.category === 'outreach' ? 'selected' : ''}>Outreach</option>
                </select>
                <input type="text" class="form-control mb-2" placeholder="Image URL" value="${item.image}" onchange="adminPanel.updateGalleryItem(${item.id}, 'image', this.value)">
                <button class="btn btn-sm btn-danger" onclick="adminPanel.deleteGalleryItem(${item.id})">Delete</button>
            </div>
        `).join('');
    }

    updateGalleryItem(id, field, value) {
        const item = this.data.gallery.find(i => i.id === id);
        if (item) {
            item[field] = value;
            this.saveData();
        }
    }

    // Export/Import functionality
    exportData() {
        const dataStr = JSON.stringify(this.data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'church-data.json';
        link.click();
    }

    importData(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                this.data = { ...this.getDefaultData(), ...importedData };
                this.saveData();
                this.loadSavedContent();
                this.renderServices();
                this.renderPrayerRequests();
                this.renderGallery();
                alert('Data imported successfully!');
            } catch (error) {
                alert('Error importing data. Please check the file format.');
            }
        };
        reader.readAsText(file);
    }
}

// Initialize admin panel
const adminPanel = new AdminPanel();

// Global functions for inline event handlers
window.addService = () => adminPanel.addService();
window.deleteService = (btn) => {
    const id = parseInt(btn.closest('.service-item').dataset.id);
    adminPanel.deleteService(id);
};
window.addBelief = () => {
    const beliefsList = document.getElementById('beliefsList');
    const newBelief = document.createElement('div');
    newBelief.className = 'mb-2';
    newBelief.innerHTML = `<input type="text" class="form-control" placeholder="Enter belief statement">`;
    beliefsList.appendChild(newBelief);
};
window.deletePrayer = (btn) => {
    const prayerItem = btn.closest('.prayer-item-admin');
    prayerItem.remove();
};
window.addGalleryItem = () => adminPanel.addGalleryItem();
window.deleteGalleryItem = (btn) => {
    const id = parseInt(btn.closest('.gallery-item-admin').dataset.id);
    adminPanel.deleteGalleryItem(id);
};
window.saveAllChanges = () => adminPanel.saveData();
window.previewSite = () => window.open('index.html', '_blank');

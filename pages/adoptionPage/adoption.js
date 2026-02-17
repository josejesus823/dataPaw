class AdoptionService {
    static STORAGE_KEY = 'adoptedPets';

    static getAdoptedPets() {
        const adopted = localStorage.getItem(this.STORAGE_KEY);
        return adopted ? JSON.parse(adopted) : {};
    }

    static adoptPet(petId, petName, userId, userName) {
        const adoptedPets = this.getAdoptedPets();
        adoptedPets[petId] = {
            petName: petName,
            adopterUserId: userId,
            adopterName: userName,
            adoptionDate: new Date().toISOString()
        };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(adoptedPets));
        return true;
    }

    static unadoptPet(petId) {
        const adoptedPets = this.getAdoptedPets();
        delete adoptedPets[petId];
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(adoptedPets));
        return true;
    }

    static isPetAdopted(petId) {
        const adoptedPets = this.getAdoptedPets();
        return adoptedPets.hasOwnProperty(petId);
    }

    static getAdoptionInfo(petId) {
        const adoptedPets = this.getAdoptedPets();
        return adoptedPets[petId] || null;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (!AuthService.requireAuth()) {
        return;
    }
    
    initializeAdoptionPage();
    setupFilters();
});

function initializeAdoptionPage() {
    const adoptButtons = document.querySelectorAll('.btn-adopt-pet');
    
    adoptButtons.forEach(button => {
        const petCard = button.closest('.pet-card');
        const petId = petCard.getAttribute('data-pet-id');
        
        if (AdoptionService.isPetAdopted(petId)) {
            updateButtonToAdopted(button, petId);
        }
        
        button.addEventListener('click', handleAdoptionClick);
    });
}

function setupFilters() {
    const searchInput = document.querySelector('.search-input');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    searchInput.addEventListener('input', handleSearch);
    
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilterClick);
    });
}

function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const activeFilter = document.querySelector('.filter-btn.active').textContent.toLowerCase();
    const petCards = document.querySelectorAll('.pet-card');
    
    petCards.forEach(card => {
        const petName = card.querySelector('.pet-name').textContent.toLowerCase();
        const petBreed = card.querySelector('.pet-breed').textContent.toLowerCase();
        const petType = card.getAttribute('data-pet-type');
        
        const matchesSearch = petName.includes(searchTerm) || petBreed.includes(searchTerm);
        const matchesFilter = activeFilter === 'all' || 
                            (activeFilter === 'dogs' && petType === 'dog') || 
                            (activeFilter === 'cats' && petType === 'cat');
        
        if (matchesSearch && matchesFilter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function handleFilterClick(event) {
    const clickedButton = event.target;
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => btn.classList.remove('active'));
    clickedButton.classList.add('active');
    
    const filterType = clickedButton.textContent.toLowerCase();
    const searchInput = document.querySelector('.search-input');
    const searchTerm = searchInput.value.toLowerCase();
    const petCards = document.querySelectorAll('.pet-card');
    
    petCards.forEach(card => {
        const petName = card.querySelector('.pet-name').textContent.toLowerCase();
        const petBreed = card.querySelector('.pet-breed').textContent.toLowerCase();
        const petType = card.getAttribute('data-pet-type');
        
        const matchesSearch = searchTerm === '' || petName.includes(searchTerm) || petBreed.includes(searchTerm);
        const matchesFilter = filterType === 'all' || 
                            (filterType === 'dogs' && petType === 'dog') || 
                            (filterType === 'cats' && petType === 'cat');
        
        if (matchesSearch && matchesFilter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function handleAdoptionClick(event) {
    event.preventDefault();
    
    const button = event.target;
    const petCard = button.closest('.pet-card');
    const petId = petCard.getAttribute('data-pet-id');
    const petName = button.getAttribute('data-pet-name');
    
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
        showMessage('Please log in to adopt a pet', 'error');
        return;
    }

    if (AdoptionService.isPetAdopted(petId)) {
        const adoptionInfo = AdoptionService.getAdoptionInfo(petId);
        
        if (AuthService.isAdmin() || (adoptionInfo && adoptionInfo.adopterUserId === currentUser.id)) {
            if (confirm(`Are you sure you want to make ${petName} available for adoption again?`)) {
                const success = AdoptionService.unadoptPet(petId);
                
                if (success) {
                    updateButtonToAvailable(button);
                    showMessage(`${petName} is now available for adoption again!`, 'success');
                }
            }
        } else {
            showMessage('This pet has already been adopted by someone else!', 'info');
        }
    } else {
        if (confirm(`Are you sure you want to adopt ${petName}?`)) {
            const success = AdoptionService.adoptPet(
                petId, 
                petName, 
                currentUser.id, 
                currentUser.name
            );
            
            if (success) {
                updateButtonToAdopted(button, petId);
                showMessage(`Congratulations! You have successfully adopted ${petName}!`, 'success');
            } else {
                showMessage('There was an error processing the adoption. Please try again.', 'error');
            }
        }
    }
}

function updateButtonToAdopted(button, petId) {
    const adoptionInfo = AdoptionService.getAdoptionInfo(petId);
    const currentUser = AuthService.getCurrentUser();
    
    button.textContent = 'Adopted';
    button.classList.add('adopted');
    button.disabled = false;
    
    if (currentUser && AuthService.isAdmin() && adoptionInfo) {
        button.title = `Adopted by: ${adoptionInfo.adopterName} - Click to make available again`;
    } else if (currentUser && adoptionInfo && adoptionInfo.adopterUserId === currentUser.id) {
        button.title = 'You adopted this pet - Click to make available again';
    } else {
        button.title = 'This pet has been adopted';
        button.disabled = true;
    }
}

function updateButtonToAvailable(button) {
    button.textContent = 'Adopt';
    button.classList.remove('adopted');
    button.disabled = false;
    button.title = '';
}

function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}
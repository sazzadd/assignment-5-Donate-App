
document.addEventListener("DOMContentLoaded", () => {
    const balanceElement = document.getElementById("balance");
    const donationSection = document.getElementById("donationSection");
    const historySection = document.getElementById("historySection");
    const donationButton = document.getElementById("donationButton");
    const historyButton = document.getElementById("historyButton");
    const historyList = document.getElementById("historyList");
    let totalBalance = 5000; // Initial balance
    let history = []; // To store donation history
  
    // Toggle between Donation and History sections
    donationButton.addEventListener("click", () => {
        donationSection.classList.remove("hidden");
        historySection.classList.add("hidden");
        toggleActiveButton(donationButton, historyButton);
    });
  
    historyButton.addEventListener("click", () => {
        donationSection.classList.add("hidden");
        historySection.classList.remove("hidden");
        toggleActiveButton(historyButton, donationButton);
    });
  
    // Donation functionality for each card
    const donateButtons = document.querySelectorAll(".donateBtn");
    donateButtons.forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest("div");
            const donationInput = card.querySelector("input[type='number']");
            const currentDonationSpan = card.querySelector("#currentDonation");
            const donationAmount = parseFloat(donationInput.value);
  
            processDonation(donationAmount, currentDonationSpan);
            donationInput.value = ""; // Clear the input field
        });
    });
  
    // Function to process donation
    function processDonation(amount, currentDonationSpan) {
        if (!amount || isNaN(amount) || amount <= 0) {
            alert("Please enter a valid donation amount.");
            return;
        }
  
        if (amount > totalBalance) {
            alert("Insufficient balance for this donation.");
            return;
        }
  
        totalBalance -= amount; // Deduct from balance
        balanceElement.textContent = totalBalance; // Update balance
        const currentDonation = parseFloat(currentDonationSpan.textContent) || 0;
        currentDonationSpan.textContent = currentDonation + amount; // Update current donation
  
        // Add to history
        const now = new Date();
        const historyEntry = `Donated ${amount} BDT on ${now.toLocaleString()}`;
        history.push(historyEntry);
        updateHistoryList();
  
        // Show success modal
        showSuccessModal();
    }
  
    // Function to show the success modal
    function showSuccessModal() {
        const modal = document.getElementById("successModal");
        modal.classList.remove("hidden");
  
        document.getElementById("closeModal").onclick = () => {
            modal.classList.add("hidden");
        };
    }
  
    // Function to update the donation history list
    function updateHistoryList() {
        historyList.innerHTML = ""; // Clear previous history
        history.forEach(entry => {
            const li = document.createElement("li");
            li.textContent = entry;
            historyList.appendChild(li);
        });
    }
  
    // Function to toggle active button styles
    function toggleActiveButton(activeBtn, inactiveBtn) {
        activeBtn.classList.add("active");
        inactiveBtn.classList.remove("active");
    }
  });


//   sticky

const navSection = document.getElementById('fix');
const navHeight = navSection.offsetHeight;

// Function to handle window scrolling
function handleScroll() {
  if (window.scrollY >= navHeight) {
    navSection.classList.add('sticky-top');
  } else {
    navSection.classList.remove('sticky-top');
  }
}

// Add event listener for window scrolling
window.addEventListener('scroll', handleScroll);

// Initial check for scrolling
handleScroll();
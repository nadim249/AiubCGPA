// Function to calculate current semester GPA
function calculateCurrentSemesterGPA() {
    const subjects = document.querySelectorAll('.subject');
    let totalGradePoints = 0;
    let totalCredits = 0;

    subjects.forEach(subject => {
        const credit = parseFloat(subject.querySelector('.subject-credit').value);
        const gradePoint = parseFloat(subject.querySelector('.subject-gpa').value);
        
        if (!isNaN(credit) && !isNaN(gradePoint)) {
            totalGradePoints += credit * gradePoint;
            totalCredits += credit;
        }
    });

    if (totalCredits > 0) {
        let gpa = totalGradePoints / totalCredits;
        gpa = roundToTwoDecimals(gpa);
        document.getElementById('current-gpa').textContent = `Your GPA for this semester: ${gpa}`;
        return gpa; // Return GPA to use in total CGPA calculation
    } else {
        alert("Please enter valid credits and GPAs for all subjects.");
        return 0;
    }
}

// Function to calculate total CGPA
function calculateTotalCGPA() {
    const pastCGPA = parseFloat(document.getElementById('past-cgpa').value);
    const pastCredits = parseFloat(document.getElementById('past-credits').value);
    const currentGPA = calculateCurrentSemesterGPA();
    const currentCredits = getCurrentSemesterCredits();

    if (!isNaN(pastCGPA) && !isNaN(pastCredits) && currentCredits > 0) {
        const totalGradePoints = (pastCGPA * pastCredits) + (currentGPA * currentCredits);
        const totalCredits = pastCredits + currentCredits;
        
        let totalCGPA = totalGradePoints / totalCredits;
        totalCGPA = roundToTwoDecimals(totalCGPA);

        document.getElementById('total-cgpa').textContent = `Your Total CGPA: ${totalCGPA}`;
    } else {
        alert("Please enter valid past CGPA and credits.");
    }
}

// Helper function to round CGPA to 2 decimal places
function roundToTwoDecimals(value) {
    return Math.round(value * 100) / 100;
}

// Function to get total credits of current semester
function getCurrentSemesterCredits() {
    const subjects = document.querySelectorAll('.subject');
    let totalCredits = 0;

    subjects.forEach(subject => {
        const credit = parseFloat(subject.querySelector('.subject-credit').value);
        if (!isNaN(credit)) {
            totalCredits += credit;
        }
    });

    return totalCredits;
}

// Add subject dynamically
function addSubject() {
    const subjectContainer = document.getElementById('subject-container');
    const subjectTemplate = `
        <div class="subject">
            <input type="text" class="subject-name" placeholder="Subject Name">
            <input type="number" step="0.01" class="subject-credit" placeholder="Credits">
            <input type="number" step="0.01" class="subject-gpa" placeholder="GPA (Grade Point)">
            <button type="button" class="delete-subject" onclick="deleteSubject(this)">Delete</button>
        </div>
    `;
    subjectContainer.insertAdjacentHTML('beforeend', subjectTemplate);
}

// Delete subject dynamically
function deleteSubject(element) {
    element.parentElement.remove();
}

// Event listeners for calculating GPA and adding subjects
document.getElementById('calculate-gpa').addEventListener('click', calculateCurrentSemesterGPA);
document.getElementById('calculate-total-cgpa').addEventListener('click', calculateTotalCGPA);
document.getElementById('add-subject').addEventListener('click', addSubject);

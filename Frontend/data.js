const dataset = {
    labels: ['Colaba', 'Bandra', 'Juhu', 'Andheri', 'Powai', 'Dadar', 'Marine Lines', 'Worli', 'Malad', 'Goregaon', 'Vile Parle', 'Chembur', 'Navi Mumbai', 'Fort'], // Extended popular areas in Mumbai
    hotelStars: [5, 4, 3, 5, 4, 3, 5, 4, 3, 4, 5, 3, 4, 5], // Extended random star ratings
    reviewCount: [250, 190, 350, 420, 310, 280, 320, 150, 290, 380, 410, 230, 270, 500], // Extended random review counts
    reviewRating: [2, 4.3, 3.9, 4.8, 4.2, 3.7, 4.9, 4.0, 3.5, 4.1, 4.7, 3.8, 4.4, 4.9] // Extended random review ratings
};

// Bar chart for Hotel Star Ratings
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: dataset.labels, // Your labels (extended)
        datasets: [{
            label: 'Hotel Star Ratings',
            data: dataset.hotelStars, // Your data (extended)
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)', // Red
                'rgba(54, 162, 235, 0.8)', // Blue
                'rgba(255, 206, 86, 0.8)', // Yellow
                'rgba(75, 192, 192, 0.8)', // Green
                'rgba(153, 102, 255, 0.8)', // Purple
                'rgba(255, 159, 64, 0.8)', // Orange
                'rgba(255, 99, 132, 0.8)', // Red
                'rgba(54, 162, 235, 0.8)', // Blue
                'rgba(255, 206, 86, 0.8)', // Yellow
                'rgba(75, 192, 192, 0.8)', // Green
                'rgba(153, 102, 255, 0.8)', // Purple
                'rgba(255, 159, 64, 0.8)', // Orange
                'rgba(255, 99, 132, 0.8)', // Red
                'rgba(54, 162, 235, 0.8)'  // Blue
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)', // Red
                'rgba(54, 162, 235, 1)', // Blue
                'rgba(255, 206, 86, 1)', // Yellow
                'rgba(75, 192, 192, 1)', // Green
                'rgba(153, 102, 255, 1)', // Purple
                'rgba(255, 159, 64, 1)', // Orange
                'rgba(255, 99, 132, 1)', // Red
                'rgba(54, 162, 235, 1)', // Blue
                'rgba(255, 206, 86, 1)', // Yellow
                'rgba(75, 192, 192, 1)', // Green
                'rgba(153, 102, 255, 1)', // Purple
                'rgba(255, 159, 64, 1)', // Orange
                'rgba(255, 99, 132, 1)', // Red
                'rgba(54, 162, 235, 1)'  // Blue
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Pie chart for Review Ratings
const ctx2 = document.getElementById('myChart2').getContext('2d');
const myChart2 = new Chart(ctx2, {
    type: 'pie',
    data: {
        labels: dataset.labels, // Your labels (extended)
        datasets: [{
            label: 'Review Ratings',
            data: dataset.reviewRating, // Your data (extended)
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)', // Red
                'rgba(54, 162, 235, 0.8)', // Blue
                'rgba(255, 206, 86, 0.8)', // Yellow
                'rgba(75, 192, 192, 0.8)', // Green
                'rgba(153, 102, 255, 0.8)', // Purple
                'rgba(255, 159, 64, 0.8)', // Orange
                'rgba(255, 99, 132, 0.8)', // Red
                'rgba(54, 162, 235, 0.8)', // Blue
                'rgba(255, 206, 86, 0.8)', // Yellow
                'rgba(75, 192, 192, 0.8)', // Green
                'rgba(153, 102, 255, 0.8)', // Purple
                'rgba(255, 159, 64, 0.8)', // Orange
                'rgba(255, 99, 132, 0.8)', // Red
                'rgba(54, 162, 235, 0.8)'  // Blue
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)', // Red
                'rgba(54, 162, 235, 1)', // Blue
                'rgba(255, 206, 86, 1)', // Yellow
                'rgba(75, 192, 192, 1)', // Green
                'rgba(153, 102, 255, 1)', // Purple
                'rgba(255, 159, 64, 1)', // Orange
                'rgba(255, 99, 132, 1)', // Red
                'rgba(54, 162, 235, 1)', // Blue
                'rgba(255, 206, 86, 1)', // Yellow
                'rgba(75, 192, 192, 1)', // Green
                'rgba(153, 102, 255, 1)', // Purple
                'rgba(255, 159, 64, 1)', // Orange
                'rgba(255, 99, 132, 1)', // Red
                'rgba(54, 162, 235, 1)'  // Blue
            ],
            borderWidth: 1
        }]
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.getElementById('searchBar');
    const recommendations = document.getElementById('recommendations');

    // Load and parse the CSV file
    Papa.parse('dataset.csv', {
        download: true,
        header: true,
        complete: function(results) {
            const data = results.data;

            searchBar.addEventListener('input', function() {
                const query = searchBar.value.toLowerCase();
                
                // Filter data to include only hotels and match search query
                const filteredData = data.filter(item => {
                    return item.type.toLowerCase() === 'hotel' &&
                           (item.name.toLowerCase().includes(query) ||
                            item.area.toLowerCase().includes(query) ||
                            item.country.toLowerCase().includes(query));
                });

                // Display the recommendations
                recommendations.innerHTML = filteredData.map(item => `
                    <div>
                        <strong>Name:</strong> ${item.name}<br>
                        <strong>Area:</strong> ${item.area}<br>
                        <strong>Country:</strong> ${item.country}
                    </div>
                `).join('');
            });
        }
    });
});

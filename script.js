// 

document.addEventListener("DOMContentLoaded", function () {
    d3.csv("data_2022_2023.csv").then(function (data) {
        window.dataset = data;
        displayData(data);
    });
});

function filterData() {
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    let location = document.getElementById("location").value;
    let category = document.getElementById("category").value;

    let filteredData = window.dataset.filter(d => {
        let dateCheck = (!startDate || new Date(d.date) >= new Date(startDate)) &&
                        (!endDate || new Date(d.date) <= new Date(endDate));
        let locationCheck = (location === "all" || d.location.includes(location));
        let categoryCheck = (category === "all" || d.category.includes(category));
        return dateCheck && locationCheck && categoryCheck;
    });
    
    displayData(filteredData);
}

function displayData(data) {
    let tableBody = d3.select("#data-table");
    tableBody.html("");
    
    data.forEach(d => {
        let row = tableBody.append("tr");
        row.append("td").text(d.date);
        row.append("td").text(d.location);
        row.append("td").text(d.category);
        row.append("td").text(d.data);
        row.append("td").text(d.status);
        row.append("td").text(d.image_URL);
        row.append("td").text(d.target_URL);
        // Create an image link if available
        let imgCell = row.append("td");
        if (d.image) {
            imgCell.append("a")
                .attr("href", d.image)
                .attr("target", "_blank")
                .append("img")
                .attr("src", d.image)
                .attr("alt", "Image Preview")
                .attr("width", 100); // Adjust size as needed
        } else {
            imgCell.text("No Image");
        }
    });
}





// // 

// document.addEventListener("DOMContentLoaded", function () {
//     d3.csv("data_2022_2023.csv").then(function (data) {
//         window.dataset = data;
//         displayData(data);
//     });
// });

// function filterData() {
//     let startDate = document.getElementById("startDate").value;
//     let endDate = document.getElementById("endDate").value;
//     let location = document.getElementById("location").value;
//     let category = document.getElementById("category").value;

//     let filteredData = window.dataset.filter(d => {
//         let dateCheck = (!startDate || new Date(d.date) >= new Date(startDate)) &&
//                         (!endDate || new Date(d.date) <= new Date(endDate));
//         let locationCheck = (location === "all" || d.location.includes(location));
//         let categoryCheck = (category === "all" || d.category.includes(category));
//         return dateCheck && locationCheck && categoryCheck;
//     });
    
//     displayData(filteredData);
// }

// function displayData(data) {
//     let tableBody = d3.select("#data-table");
//     tableBody.html("");
    
//     data.forEach(d => {
//         let row = tableBody.append("tr");
//         row.append("td").text(d.date);
//         row.append("td").text(d.location);
//         row.append("td").text(d.category);
//         row.append("td").text(d.data);
//         row.append("td").text(d.status);
//         row.append("td").text(d.target_URL);
//         // Create an image link if available
//         let imgCell = row.append("td");

//         if (d.image) {
//             let imageUrl = d.image;
        
//         // Check if it's a Google Drive shared link
//         if (imageUrl.includes("drive.google.com")) {
//             let match = imageUrl.match(/\/d\/(.*)\/view/);
//             if (match) {
//                 let fileId = match[1];
//                 imageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
//             }
//         }
        
//         imgCell.append("a")
//             .attr("href", d.image) // Keep the original link for downloading
//             .attr("target", "_blank")
//             .append("img")
//             .attr("src", imageUrl)
//             .attr("alt", "Image Preview")
//             .attr("width", 100); // Adjust size as needed
//         } else {
//             imgCell.text("No Image");
//         }
//     });
// }


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
        
        // Handle Google Drive image URLs
        let imgCell = row.append("td");
        if (d.image_URL) {
            let imageUrl = d.image_URL;
            let match = imageUrl.match(/\/d\/(.*)\/view/);
            if (match) {
                let fileId = match[1];
                imageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
            }
            imgCell.append("a")
                .attr("href", d.image_URL)
                .attr("target", "_blank")
                .append("img")
                .attr("src", imageUrl)
                .attr("alt", "Image Preview")
                .attr("width", 100);
        } else {
            imgCell.text("No Image");
        }
        
        // Add Target URL link
        let targetCell = row.append("td");
        if (d.target_URL) {
            targetCell.append("a")
                .attr("href", d.target_URL)
                .attr("target", "_blank")
                .text("View Folder");
        } else {
            targetCell.text("No Link");
        }
    });
}



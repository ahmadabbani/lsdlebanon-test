// Helper function to truncate description to 35 words
function truncateDescription(description, wordLimit) {
  const words = description.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + " ...";
  }
  return description; // If description is within the limit, return it as is
}

// Function to display all projects
function displayProjects() {
  const container = document.querySelector(".projects-container");

  // Loop through the projects array and create elements for each project
  projects.forEach((project) => {
    // Create the column div
    const colDiv = document.createElement("div");
    colDiv.classList.add("col-lg-4", "col-md-6");

    // Create the article element
    const article = document.createElement("article");
    article.classList.add("article");
    // Create the project image container
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("project-img");

    // Create the anchor element
    const imglink = document.createElement("a");
    imglink.href = `project-details.html?title=${encodeURIComponent(
      project.title
    )}`;

    // Create the image element
    const img = document.createElement("img");
    img.src = project.photos.gallery[0];
    img.alt = project.title;
    img.classList.add("img-fluid");

    // Append the image to the anchor
    imglink.appendChild(img);

    // Append the anchor to the container
    imgDiv.appendChild(imglink);

    // Create the project title with link
    const h2 = document.createElement("h2");
    h2.classList.add("title");

    const link = document.createElement("a");
    link.href = `project-details.html?title=${encodeURIComponent(
      project.title
    )}`;
    link.textContent = project.title;
    h2.appendChild(link);

    // Create the project description (truncate to 35 words)
    const description = document.createElement("p");
    description.textContent = truncateDescription(project.description, 30);

    // Append elements to the article
    article.appendChild(imgDiv);
    article.appendChild(h2);
    article.appendChild(description);

    // Append the article to the column div
    colDiv.appendChild(article);

    // Append the column div to the projects container
    container.appendChild(colDiv);
  });
}

// Call the function on page load
window.onload = displayProjects;

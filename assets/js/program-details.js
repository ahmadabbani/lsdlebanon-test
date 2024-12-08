// Decode the project title from the URL
const urlParams = new URLSearchParams(window.location.search);
const programtitle = decodeURIComponent(urlParams.get("title")); // Decode the title

// Find the related project
const program = programms.find((p) => p.title === programtitle);

if (program) {
  // Select the row where the program details will be appended
  const row = document.querySelector(".row");
  row.classList.add("row-details");
  // Create the main image container
  const colMainImg = document.createElement("div");
  colMainImg.classList.add("col-md-6", "main-img");
  const mainImg = document.createElement("img");
  mainImg.src = program.photos.main;
  mainImg.alt = program.title;
  colMainImg.appendChild(mainImg);
  row.appendChild(colMainImg);

  // Create the title and date container
  const colTitleDate = document.createElement("div");
  colTitleDate.classList.add("col-md-6", "project-title");
  const title = document.createElement("h1");
  title.textContent = program.title;
  const date = document.createElement("span");
  date.textContent = program.date || ""; // Default if date is empty
  colTitleDate.appendChild(title);
  colTitleDate.appendChild(date);
  row.appendChild(colTitleDate);

  // Create the description container
  const colDescription = document.createElement("div");
  colDescription.classList.add("col-12", "description");
  const description = document.createElement("p");
  description.textContent = program.description;
  colDescription.appendChild(description);
  row.appendChild(colDescription);

  // Related projects container
  const colOtherProjects = document.createElement("div");
  colOtherProjects.classList.add("col-12", "other-projects");

  const otherProjectsTitle = document.createElement("h2");
  otherProjectsTitle.textContent = "Other programms";
  colOtherProjects.appendChild(otherProjectsTitle);

  const otherProjectsDiv = document.createElement("div");
  otherProjectsDiv.classList.add("project-list");

  programms
    .filter((p) => p.title !== programtitle) // Exclude the current project
    .forEach((relatedProject) => {
      const projectContainer = document.createElement("div");
      projectContainer.classList.add("related-project");

      // Create a link for the image
      const imgLink = document.createElement("a");
      imgLink.href = `program-details.html?title=${encodeURIComponent(
        relatedProject.title
      )}`;
      const relatedImg = document.createElement("img");
      relatedImg.src = relatedProject.photos.main;
      relatedImg.alt = relatedProject.title;
      imgLink.appendChild(relatedImg);
      projectContainer.appendChild(imgLink);

      // Create a link for the title
      const titleLink = document.createElement("a");
      titleLink.href = `program-details.html?title=${encodeURIComponent(
        relatedProject.title
      )}`;
      const relatedTitle = document.createElement("h3");
      relatedTitle.textContent = relatedProject.title;
      titleLink.appendChild(relatedTitle);
      projectContainer.appendChild(titleLink);

      // Add description (not clickable)
      const descriptionPreview = document.createElement("p");
      const words = relatedProject.description
        .split(" ")
        .slice(0, 15)
        .join(" ");
      descriptionPreview.textContent = `${words}...`;
      projectContainer.appendChild(descriptionPreview);

      otherProjectsDiv.appendChild(projectContainer);
    });

  colOtherProjects.appendChild(otherProjectsDiv);
  row.appendChild(colOtherProjects);
} else {
  // Handle case where project is not found
  document.querySelector(".row").innerHTML = `
  <p style="font-size: 2rem; text-align: center; margin-top: 20px;">
    program not found.
  </p>
`;
}

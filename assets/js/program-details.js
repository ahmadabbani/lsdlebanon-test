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
  colMainImg.classList.add("col-6", "main-img");
  const mainImg = document.createElement("img");
  mainImg.src = program.photos.main;
  mainImg.alt = program.title;
  colMainImg.appendChild(mainImg);
  row.appendChild(colMainImg);

  // Create the title and date container
  const colTitleDate = document.createElement("div");
  colTitleDate.classList.add("col-6", "project-title");
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

  // Create the gallery container
  const colGallery = document.createElement("div");
  colGallery.classList.add("col-12", "gallery-container");

  // Create and add the <h2> element
  const galleryTitle = document.createElement("h2");
  galleryTitle.textContent = "Photos";
  colGallery.appendChild(galleryTitle);

  // Create the gallery div
  const galleryDiv = document.createElement("div");
  galleryDiv.classList.add("gallery");

  // Add images to the gallery
  program.photos.main.forEach((imgSrc) => {
    const link = document.createElement("a");
    link.href = imgSrc; // For GLightbox
    link.classList.add("glightbox");
    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = program.title;
    const span = document.createElement("span");
    span.classList.add("material-symbols-outlined");
    span.textContent = "add_circle";
    link.appendChild(img);
    link.appendChild(span);
    galleryDiv.appendChild(link);
  });

  colGallery.appendChild(galleryDiv);
  row.appendChild(colGallery);

  // Related projects container
  const colOtherProjects = document.createElement("div");
  colOtherProjects.classList.add("col-12", "other-projects");

  const otherProjectsTitle = document.createElement("h2");
  otherProjectsTitle.textContent = "Other Projects";
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

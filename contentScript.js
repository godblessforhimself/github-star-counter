let isEnabled = true;
function fetchStarCount(repoFullName, button, func) {
  const apiUrl = `https://api.github.com/repos/${repoFullName}`;
  button.removeEventListener("click", func);
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const starCount = data.stargazers_count || 0;
      button.textContent = `${starCount} stars`;
    })
    .catch((error) => {
      console.error("Error fetching star count:", error);
      button.textContent = "Error fetching stars";
    });
}

function createToggleButton() {
  const toggleButton = document.createElement("button");
  toggleButton.textContent = "GitHub Star Counter";
  toggleButton.style.position = "fixed";
  toggleButton.style.bottom = "20px";
  toggleButton.style.right = "20px";
  toggleButton.style.border = "none";
  toggleButton.style.cursor = "pointer";
  toggleButton.style.backgroundSize = "cover";

  document.body.appendChild(toggleButton);

  toggleButton.addEventListener("click", function () {
    isEnabled = !isEnabled;
    updateButtonStyle();
    toggleGitHubLinkButtons();
  });

  updateButtonStyle();
}

function updateButtonStyle() {
  const toggleButton = document.querySelector("button");
  if (isEnabled) {
    toggleButton.style.color = "green";
  } else {
    toggleButton.style.color = "red";
  }
}

function toggleGitHubLinkButtons() {
  const buttons = document.querySelectorAll("button[data-github-button]");
  buttons.forEach((button) => {
    button.style.display = isEnabled ? "block" : "none";
  });
}

function addButtonForLink(link) {
  const url = new URL(link.href);
  if (url.search !== "") {
    return;
  }
  if (url.href.includes("https://github.com/contact/report-content")) {
    return;
  }
  if (url.host === "github.com" && url.pathname.split("/").length === 3) {
    const button = document.createElement("button");
    button.textContent = "Get Stars";
    button.dataset.githubButton = "true"; // Mark the button

    button.addEventListener(
      "click",
      (func = () => {
        fetchStarCount(url.pathname.substring(1), button, func);
      })
    );

    link.parentNode.insertBefore(button, link.nextSibling);
    button.style.display = isEnabled ? "block" : "none";
  }
}

function processGitHubLinks() {
  const links = document.querySelectorAll('a[href*="github.com"]');
  links.forEach(addButtonForLink);
}

processGitHubLinks();
createToggleButton();

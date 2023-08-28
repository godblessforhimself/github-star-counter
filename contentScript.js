// contentScript.js
function fetchStarCount(url, button) {
  fetch(`https://api.github.com/repos/${url}`)
    .then((response) => response.json())
    .then((data) => {
      const starCount = data.stargazers_count || 0;
      button.textContent = `${starCount} stars`;
    })
    .catch(() => {
      button.textContent = "Error fetching stars";
    });
}

function addButtonForLink(link) {
  const url = new URL(link.href);

  if (url.host === "github.com" && url.pathname.split("/").length === 3) {
    const button = document.createElement("button");
    button.textContent = "Get Stars";

    button.addEventListener("click", () => {
      fetchStarCount(url.pathname.substring(1), button);
    });

    link.parentNode.insertBefore(button, link.nextSibling);
  }
}

function processGitHubLinks() {
  const links = document.querySelectorAll('a[href*="github.com"]');
  links.forEach(addButtonForLink);
}

processGitHubLinks();

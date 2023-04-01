const owner = "PMMP";
const repo = "PocketMine-MP";

function getLatestRelease() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.github.com/repos/${owner}/${repo}/releases/latest`, true);
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {
            if(xhr.status == 200) {
                var release = JSON.parse(xhr.responseText);
                var latestRelease = document.getElementById("latest-release");
                var releaseDescription = document.getElementById("release-description");
                latestRelease.innerHTML = release.name + " (" + release.published_at.substr(0, 10) + ")";
                
                var converter = new showdown.Converter();
                var htmlDescription = converter.makeHtml(release.body);
                releaseDescription.innerHTML = htmlDescription;
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.send();
}
  
document.addEventListener("DOMContentLoaded", function() {
    getLatestRelease();
  
    var goToReleaseButton = document.getElementById("go-to-release");
    goToReleaseButton.addEventListener("click", function() {
        chrome.tabs.create({ url: `https://github.com/${owner}/${repo}/releases/latest` });
    });
});  
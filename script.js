const landingPageSelect = document.getElementById("landing-pages");

const appendLandingPages = async () => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer d7bc353e9ddc340ca3acbeaf61f89a8344166b25009a065dedf9538459c6656c"
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("http://localhost:3000/getPages", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const pages = JSON.parse(result);
      pages.forEach((page) => {
        const optionElement = document.createElement("option");
        optionElement.textContent = page.name;
        optionElement.value = page.id;
        landingPageSelect.appendChild(optionElement);
      });
    })
    .catch((error) => console.log("error", error));
};

window.addEventListener("load", async (e) => {
  appendLandingPages();
});

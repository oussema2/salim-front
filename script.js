const landingPageSelect = document.getElementById("landing-pages");
const emailtemplatesSelect = document.getElementById("email-template");
const sendingProfileSelect = document.getElementById("sending-profile");
const groupesSelect = document.getElementById("groupes");

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

const appendEmailTemplate = async () => {
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

  fetch("http://localhost:3000/getTemplates", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const pages = JSON.parse(result);
      pages.forEach((page) => {
        const optionElement = document.createElement("option");
        optionElement.textContent = page.name;
        optionElement.value = page.id;
        emailtemplatesSelect.appendChild(optionElement);
      });
    })
    .catch((error) => console.log("error", error));
};

const appendSendingProfiles = async () => {
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

  fetch("http://localhost:3000/getSendingProfiles", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const pages = JSON.parse(result);
      pages.forEach((page) => {
        const optionElement = document.createElement("option");
        optionElement.textContent = page.name;
        optionElement.value = page.id;
        sendingProfileSelect.appendChild(optionElement);
      });
    })
    .catch((error) => console.log("error", error));
};

const appendGroupes = async () => {
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

  fetch("http://localhost:3000/getGroups", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const pages = JSON.parse(result);
      pages.forEach((page) => {
        const optionElement = document.createElement("option");
        optionElement.textContent = page.name;
        optionElement.value = page.id;
        groupesSelect.appendChild(optionElement);
      });
    })
    .catch((error) => console.log("error", error));
};

window.addEventListener("load", async (e) => {
  appendLandingPages();
  appendEmailTemplate();
  appendSendingProfiles();
  appendGroupes();
});

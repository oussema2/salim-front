//if (!localStorage.getItem("userId")) {

 // window.location.href = "./signin.html";
//}

const landingPageSelect = document.getElementById("landing-pages");
const emailtemplatesSelect = document.getElementById("email-template");
const sendingProfileSelect = document.getElementById("sending-profile");
const groupesSelect = document.getElementById("groupes");
const startCampagneEl = document.getElementById("startCampaignButton");
const launchTimeEL = document.getElementById("launchTime");
const campaignNameEl = document.getElementById("campaignName");
const campagneSelectEl = document.getElementById("campagneSelect");
const generateReportButtonEl = document.getElementById("generateReportButton");
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
        optionElement.value = page.name;
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
        optionElement.value = page.name;
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
        optionElement.value = page.name;
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
        optionElement.value = page.name;
        groupesSelect.appendChild(optionElement);
      });
    })
    .catch((error) => console.log("error", error));
};

const appendCampagne = async () => {
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

  fetch("http://localhost:3000/getCampagne", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(JSON.parse(result));
      const pages = JSON.parse(result).campaigns;
      pages.forEach((page) => {
        const optionElement = document.createElement("option");
        optionElement.textContent = page.name;
        optionElement.value = page.id;
        campagneSelectEl.appendChild(optionElement);
      });
    })
    .catch((error) => console.log("error", error));
};

window.addEventListener("load", async (e) => {
  appendLandingPages();
  appendEmailTemplate();
  appendSendingProfiles();
  appendGroupes();
  appendCampagne();
});

startCampagneEl.addEventListener("click", (e) => {
  if (
    emailtemplatesSelect.value === "#" ||
    landingPageSelect.value === "#" ||
    sendingProfileSelect.value === "#" ||
    groupesSelect.value === "#" ||
    campaignNameEl.value === "" ||
    launchTimeEL.value === ""
  ) {
    alert("Complete filling the form");
  }
  const data = JSON.stringify({
    name: campaignNameEl.value,
    template: {
      name: emailtemplatesSelect.value,
    },
    page: {
      name: landingPageSelect.value,
    },
    smtp: {
      name: sendingProfileSelect.value,
    },
    groups: [
      {
        name: groupesSelect.value,
      },
    ],
    launch_date: formatDateTime(launchTimeEL.value),
    send_by_date: null,
    url: "",
  });

  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer d7bc353e9ddc340ca3acbeaf61f89a8344166b25009a065dedf9538459c6656c"
  );
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: data,
    redirect: "follow",
  };

  fetch("http://localhost:3000/addCampagne", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(JSON.parse(result));
      if (JSON.parse(result).code) {
        alert("Campagne added");
      }
    })
    .catch((error) => console.log("error", error));
});

function formatDateTime(inputValue) {
  if (inputValue) {
    var date = new Date(inputValue);
    var formattedDateTime = date.toISOString();
    return formatDateTime;
  } else {
    alert("Please select a date and time.");
  }
}

generateReportButtonEl.addEventListener("click", (e) => {
  if (campagneSelectEl.value === "#") {
    alert("Choose Campagne");
  } else {
    console.log(campagneSelectEl.value);
  }

  var requestOptions = {
    method: "GET",
  };
  // http://127.0.0.1:8000/generateReport/${campagneSelectEl.value}
  fetch(
    `http://127.0.0.1:8000/generateReport/${campagneSelectEl.value}`,
    requestOptions
  )
    .then((response) => response.blob())
    .then((blob) => {
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create an anchor element
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "file.docx"; // Set the desired file name

      // Add the anchor element to the document
      document.body.appendChild(a);

      // Trigger the download
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
    });
});

logoutButton.addEventListener("click", (e) => {
  localStorage.clear("userId");
  window.location.reload();
});

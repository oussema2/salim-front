signInButton.addEventListener("click", (e) => {
  const emailValue = email.value;
  const passwordValue = password.value;
  if (!emailValue || !passwordValue) {
    alert("Fill The Form Please");
  }
  var myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `http://localhost:3000/login?email=${emailValue}&password=${passwordValue}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      const response = JSON.parse(result);
      console.log(response);
      if (response.message === "User not found") {
        alert("Email Or Password Incorrect");
      }
      if (response._id) {
        localStorage.setItem("userId", JSON.parse(result)._id);
        localStorage.setItem("type", JSON.parse(result).trialType);

        window.location.href = "./main.html";
      }
    })
    .catch((error) => console.log("error", error));
});

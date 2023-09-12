registerBtn.addEventListener("click", (e) => {
  const nameValue = userName.value;
  const emailValue = email.value;
  const passwordValue = password.value;
  const confirmPasswordValue = confirmPassword.value;
  const trialPlanValue = trialPlan.value;

  if (
    !nameValue ||
    !emailValue ||
    !passwordValue ||
    !confirmPasswordValue ||
    !trialPlanValue
  ) {
    alert("Fill All the input in the form");
  }

  //   if (passwordValue !== confirmPasswordValue) {
  //     alert("Confirm Password should have same value as Password");
  //   }
  var myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name: nameValue,
    email: emailValue,
    password: passwordValue,
    trialType: trialPlanValue,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:3000/register", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(JSON.parse(result));
      if (JSON.parse(result)._id) {
        localStorage.setItem("userId", JSON.parse(result)._id);
        localStorage.setItem("type", JSON.parse(result).trialType);

        window.location.href = "./main.html";
      }
    })
    .catch((error) => console.log("error", error));
});

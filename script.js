let UserProme = document.location.href?.split("?");
let Promocode = UserProme[1]?.split("=");

var phoneData;
axios
  .get("https://api.astropoints.in/auth/getNumber?id=1")
  .then((result) => {
    phoneData = result?.data?.phone;
    let anchors = document.querySelectorAll("a");
    anchors.forEach(function (anchor) {
      if (Promocode != undefined) {
        console.log(Promocode[1]);
        anchor.href = `https://api.whatsapp.com/send?phone=${result?.data?.phone}&text=Hi%2C%20I%20Need%20ID%20,CODE%20-${Promocode[1]}`;
        document.getElementById("PromoCode").value = Promocode[1];
        document.getElementById("PromoCode").disabled = true;
      } else {
        anchor.href = `https://api.whatsapp.com/send?phone=${result?.data?.phone}&text=Hi%2C%20I%20Need%20ID%20,CODE%20-FREE50`;
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });

const submitForm = (event) => {
  event.preventDefault();
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let PromoCode = document.getElementById("PromoCode").value;
  let Date = new Date();

  let url = `https://api.whatsapp.com/send?phone=${phoneData}&text=Name-%20${name}%0APhone-${phone}%2C%0APromocode-${PromoCode}`;

  axios
    .post("https://api-firm777-com.onrender.com/createUser", {
      name,
      phone,
      promocode: PromoCode,
    })
    .then((result) => {
      axios
        .post(
          "https://script.google.com/macros/library/d/1uoW_RsNFfUnSvqauiAdif5zK55TwESkioPRNlnb9MCUEVCB_sDGwOnGA/2",
          {
            Name: name,
            Phone: phone,
            Promocode: PromoCode,
            Date: Date,
          }
        )
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(result);
      document.getElementById("SubmitIndex").innerHTML = "Loding...";
      return window.location.replace(url);
    })
    .catch((err) => {
      console.log(err);
    });
};

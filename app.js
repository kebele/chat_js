function init() {
  //   console.log("firebase deyiz");

  var firebaseConfig = {
    apiKey: "AIzaSyDvhX9I96v1wl2Aj66Hdf_lag-rdklHxWI",
    authDomain: "simple-chat-de8c7.firebaseapp.com",
    databaseURL: "https://simple-chat-de8c7-default-rtdb.firebaseio.com",
    projectId: "simple-chat-de8c7",
    storageBucket: "simple-chat-de8c7.appspot.com",
    messagingSenderId: "965539765283",
    appId: "1:965539765283:web:5a7916be14ef13843fa596",
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // db'ye veri yollamak
  //   firebase.database().ref("messages").push().set({
  //     sender: "bale",
  //     message: "deneme",
  //   time : firebase.database.ServerValue.TIMESTAMP
  //   });

  //mesajı yollayalım
  ref = firebase.database().ref("messages");

  firebase
    .database()
    .ref("messages")
    .on("child_added", (snapshot) => {
      //   console.log(snapshot.val().sender);
      var html = "";
      if (snapshot.val().sender == myName) {
        html += '<li class="message mine">';
        html += '<p class="text">' + snapshot.val().message + "</p>";
        html +=
          '<span class="date">' + tarihCevir(snapshot.val().time) + "</span>";
        html += "</li>";
      } else {
        html += '<li class="message">';
        html += '<p class="text">' + snapshot.val().message + "</p>";
        html +=
          '<span class="date">' + tarihCevir(snapshot.val().time) + "</span>";
        html += '<span class="sender">' + snapshot.val().sender + "</span>";
        html += "</li>";
      }
      messages.innerHTML += html;
      // her yeni mesajı aşağıya kaydırsın
      messages.scroll({ behavior: "smooth", top: 999999999 });
    });
}

function sohbeteBasla() {
  myName = nameInput.value;
  if (myName.length > 0) {
    console.log(myName);
    login.classList.add("hidden");
    init();
  }
}

function tarihCevir(stamp) {
  var d = new Date(stamp);
  var s = "0" + d.getHours();
  var d = "0" + d.getMinutes();
  var format = s.substr(-2) + ":" + d.substr(-2);
  return format;
}

function mesajGonder() {
  var msg = document.getElementById("myInput").value;
  if (msg.length > 0) {
    ref.push().set({
      sender: myName,
      message: msg,
      time: firebase.database.ServerValue.TIMESTAMP,
    });
  }
  document.getElementById("myInput").value = "";
}

var login = document.querySelector(".login");
var nameInput = document.getElementById("myName");
var messages = document.querySelector(".messages");
messages.innerHTML = "";
var myName = "";
var ref;

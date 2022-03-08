let timeTrackCon = document.querySelector(".time-track-con");
let timeTrackControl = document.querySelectorAll(".time-track-control li");

async function fetchData() {
  let respon = await fetch("data.json");
  let data = await respon.json();
  data.forEach((track) => {
    let trackBox = document.createElement("div");
    trackBox.classList.add("track-box");
    trackBox.id = track.title === "Self Care" ? "Self-Care" : track.title;
    track.title === "Work"
      ? (trackBox.style.cssText =
          "background-image: url(images/icon-work.svg);background-color: hsl(15, 100%, 70%);")
      : track.title === "Play"
      ? (trackBox.style.cssText =
          "background-image: url(images/icon-play.svg);background-color: hsl(195, 74%, 62%)")
      : track.title === "Study"
      ? (trackBox.style.cssText =
          "background-image: url(images/icon-Study.svg);background-color: hsl(348, 100%, 68%)")
      : track.title === "Exercise"
      ? (trackBox.style.cssText =
          "background-image: url(images/icon-Exercise.svg);background-color: hsl(145, 58%, 55%)")
      : track.title === "Social"
      ? (trackBox.style.cssText =
          "background-image: url(images/icon-Social.svg);background-color:hsl(264, 64%, 52%)")
      : track.title === "Self Care"
      ? (trackBox.style.cssText =
          "background-image: url(images/icon-self-care.svg);background-color:hsl(43, 84%, 65%)")
      : (trackBox.style.cssText = "background-color:#009688");

    let trackBoxCon = document.createElement("div");
    trackBoxCon.classList.add("track-box-con");
    let head = document.createElement("div");
    head.classList.add("head");
    let title = document.createElement("h2");
    title.classList.add("title");
    title.appendChild(document.createTextNode(track.title));
    let toggle = document.createElement("span");
    toggle.classList.add("toggle");
    toggle.innerHTML = `<span></span><span></span><span></span>`;
    head.appendChild(title);
    head.appendChild(toggle);
    let timeTrackInfo = document.createElement("div");
    timeTrackInfo.classList.add("time-track-info");
    let current = document.createElement("span");
    current.classList.add("current");
    let previous = document.createElement("span");
    previous.classList.add("previous");
    timeTrackInfo.appendChild(current);
    timeTrackInfo.appendChild(previous);
    trackBoxCon.appendChild(head);
    trackBoxCon.appendChild(timeTrackInfo);
    trackBox.append(trackBoxCon);
    timeTrackCon.append(trackBox);
  });
  addTimeTrack("weekly");
  function addTimeTrack(t) {
    data.forEach((track) => {
      let current = document.querySelector(
        `#${track.title === "Self Care" ? "Self-Care" : track.title} .current`
      );
      let previous = document.querySelector(
        `#${track.title === "Self Care" ? "Self-Care" : track.title} .previous`
      );
      current.innerHTML = `${track.timeframes[t].current}hrs`;
      let pervText = t === "daily" ? "Day" : t === "weekly" ? "Week" : "Month";
      previous.innerHTML = `Last ${pervText} - ${track.timeframes[t].previous}hrs`;
    });
  }
  timeTrackControl.forEach((el) => {
    el.addEventListener("click", (e) => {
      timeTrackControl.forEach((el) => {
        el.classList.remove("active");
      });
      e.target.classList.add("active");
      addTimeTrack(e.target.dataset.type);
    });
  });
}
fetchData();

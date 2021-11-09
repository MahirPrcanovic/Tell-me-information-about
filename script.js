"use strict";

const searchBtn = document.querySelector(".button");
const meanings = document.querySelector(".meanings");
const meaning1 = document.querySelector(".meaning--1");
const meaning2 = document.querySelector(".meaning--2");
const meaning3 = document.querySelector(".meaning--3");
const meaning4 = document.querySelector(".meaning--4");
const contentBox = document.querySelector(".content-box");
const main = document.querySelector("main");
const error = document.querySelector(".error");
const input = document.querySelector(".input");
const inputTxt = document.querySelector(".input");
const aside = document.querySelector("aside");
const wordTitle = document.querySelector(".content-title");
const text1 = document.querySelector(".text-1");
const text2 = document.querySelector(".text-2");
const partofSpeech1 = document.querySelector(".part-of-speech-1");
const definition1 = document.querySelector(".definition-1");
const example1 = document.querySelector(".example-1");
const synonyms1 = document.querySelector(".synonyms-1");
const partofSpeech2 = document.querySelector(".part-of-speech-2");
const definition2 = document.querySelector(".definition-2");
const example2 = document.querySelector(".example-2");
const synonyms2 = document.querySelector(".synonyms-2");
const partofSpeech3 = document.querySelector(".part-of-speech-3");
const definition3 = document.querySelector(".definition-3");
const example3 = document.querySelector(".example-3");
const synonyms3 = document.querySelector(".synonyms-3");
const partofSpeech4 = document.querySelector(".part-of-speech-4");
const definition4 = document.querySelector(".definition-4");
const example4 = document.querySelector(".example-4");
const synonyms4 = document.querySelector(".synonyms-4");
const tryAgainbtn = document.querySelector(".try-another");
const audio = document.querySelector(".audio");

async function getData(word) {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  if (response.status === 404) {
    error.classList.toggle("hidden");
    setTimeout(() => {
      error.classList.toggle("hidden");
    }, 2000);
    return "error";
  } else {
    const data = await response.json();
    return data;
  }
}
function hideMissing(number) {
  const meaning = document.querySelector(`.meaning--${number}`);
  meaning.classList.add("hidden");
}
function fillingData1(arr) {
  partofSpeech1.textContent = arr.partOfSpeech;
  definition1.textContent = arr.definitions[0].definition;
  example1.textContent = arr.definitions[0].example;
  let synonymsArr = [];
  if (arr.definitions[0].synonyms.length > 0) {
    arr.definitions[0].synonyms.forEach((syn) => {
      if (synonymsArr.length < 10) {
        synonymsArr.push(syn);
      }
    });
    synonyms1.textContent = synonymsArr.join(", ");
  }
}
function fillingData2(arr) {
  partofSpeech2.textContent = arr.partOfSpeech;
  definition2.textContent = arr.definitions[0].definition;
  example2.textContent = arr.definitions[0].example;
  let synonymsArr = [];
  if (
    typeof arr.definitions[0].synonyms != "undefined" &&
    arr.definitions[0].synonyms.length > 0
  ) {
    arr.definitions[0].synonyms.forEach((syn) => {
      if (synonymsArr.length < 10) {
        synonymsArr.push(syn);
      }
    });
    synonyms1.textContent = synonymsArr.join(", ");
  }
}
function fillingData3(arr) {
  partofSpeech3.textContent = arr.partOfSpeech;
  definition3.textContent = arr.definitions[0].definition;
  example3.textContent = arr.definitions[0].example;
  let synonymsArr = [];
  if (
    typeof arr.definitions[0].synonyms != "undefined" &&
    arr.definitions[0].synonyms.length > 0
  ) {
    arr.definitions[0].synonyms.forEach((syn) => {
      if (synonymsArr.length < 10) {
        synonymsArr.push(syn);
      }
    });
    synonyms1.textContent = synonymsArr.join(", ");
  }
}
function fillingData4(arr) {
  partofSpeech4.textContent = arr.partOfSpeech;
  definition4.textContent = arr.definitions[0].definition;
  example4.textContent = arr.definitions[0].example;
  if (typeof arr.definitions[0].synonyms != "undefined") {
    synonyms4.textContent = arr.definitions[0].synonyms[0];
  }
}
function funkcija2() {
  meaning1.classList.add("hidden");
  meaning2.classList.add("hidden");
  meaning3.classList.add("hidden");
  meaning4.classList.add("hidden");
  getData(inputTxt.value).then((data) => {
    if (data === "error") {
      aside.classList.toggle("hidden");
    } else {
      let realData = data[0];
      aside.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        main.classList.toggle("hidden");
      }, 1000);
      wordTitle.textContent = realData.word;
      text1.textContent = `/${realData.phonetics[0].text}/`;
      audio.setAttribute("href", realData.phonetics[0].audio);
      if (realData.phonetics.length > 1) {
        text2.textContent = `, /${realData.phonetics[1].text}/`;
      }
      console.log(realData.meanings.length);
      if (realData.meanings.length == 1) {
        fillingData1(realData.meanings[0]);
        meaning1.classList.remove("hidden");
      } else if (realData.meanings.length == 2) {
        fillingData1(realData.meanings[0]);
        fillingData2(realData.meanings[1]);
        meaning1.classList.remove("hidden");
        meaning2.classList.remove("hidden");
      } else if (realData.meanings.length == 3) {
        fillingData1(realData.meanings[0]);
        fillingData2(realData.meanings[1]);
        fillingData3(realData.meanings[2]);
        meaning1.classList.remove("hidden");
        meaning2.classList.remove("hidden");
        meaning3.classList.remove("hidden");
      } else if (realData.meanings.length == 4) {
        fillingData1(realData.meanings[0]);
        fillingData2(realData.meanings[1]);
        fillingData3(realData.meanings[2]);
        fillingData4(realData.meanings[3]);
        meaning1.classList.remove("hidden");
        meaning2.classList.remove("hidden");
        meaning3.classList.remove("hidden");
        meaning4.classList.remove("hidden");
      }
    }
  });
}
function eventListener() {
  if (aside.classList.contains("hidden")) {
    aside.classList.toggle("hidden");
    funkcija2();
    input.value = "";
  } else {
    funkcija2();
    input.value = "";
  }
}
searchBtn.addEventListener("click", eventListener);
input.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    eventListener();
  }
});
tryAgainbtn.addEventListener("click", function (e) {
  main.classList.toggle("hidden");
  setTimeout(() => {
    aside.classList.toggle("hidden");
  }, 500);
});

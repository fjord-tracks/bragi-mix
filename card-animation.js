const [subtitle, subtitle1, subtitle2] =
  document.getElementsByClassName("card-subtitle");
const createWord = (text, index) => {
  const word = document.createElement("span");

  word.innerHTML = `${text} `;

  word.classList.add("card-subtitle-word");

  word.style.transitionDelay = `${index * 40}ms`;

  return word;
};

const addWord = (text, element, index) =>
  element.appendChild(createWord(text, index));

const createSubtitle = (text, element) =>
  text.split(" ").map((word, index) => addWord(word, element, index));

createSubtitle(
  "With this tool, you can easily search for songs by year and genre and get a random selection to add to your playlist. It's the perfect way to discover new music that you might have never found on your own. This is a perfect tool for everyone and specially music producer to find samples.",
  subtitle
);

createSubtitle(
  "Well, I hope you enjoyed hovering over nothing, because that function is still in its cocoon stage!.But hey, if you ever need to practice your hovering technique, feel free to hover over our other features in the meantime. We won't judge.",
  subtitle1
);

createSubtitle(
  "Don't worry, your hovering skills are still top-notch. Unfortunately, that function isn't quite ready to spread its wings yet.",
  subtitle2
);

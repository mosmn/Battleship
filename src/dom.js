import "./style.css";

const helloWorld = () => {
  const content = document.createElement("div");
  content.classList.add("hello-world");
  content.innerHTML = "Hello World";
  return content;
};

document.body.appendChild(helloWorld());

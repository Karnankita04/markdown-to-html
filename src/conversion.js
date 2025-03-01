const extractTag = (symbol) => {
  const tags = {
    "#": "h1",
    "##": "h2",
    "###": "h3",
    "####": "h4",
    "#####": "h5",
    "######": "h6", 
  };

  return tags[symbol];
};

const convertToElem = (tag, content, bodyContent) => {
  bodyContent.push(`<${tag}>${content}</${tag}>`);
  const htmlDoc = `<!DOCTYPE html>
<html>
<head>
  <title>Readme to html</title>
</head>
<body>
  ${bodyContent.join("\n")}
</body>
</html>`;

  return htmlDoc;
};

const writeFile = (content) => {
  Deno.writeTextFileSync("src/index.html", content);
};

const convert = (rawData) => {
  const bodyContent = [];
  const data = rawData.split("\n\n");
  data.push(data.pop().slice(0, -1));
  let htmlDoc = "";

  data.forEach((element) => {
    const [symbol, ...content] = element.split(" ");
    htmlDoc = convertToElem(extractTag(symbol), content.join(" "), bodyContent);
  });

  return htmlDoc;
};

const main = () => {
  const readmeData = Deno.readTextFileSync("src/sample.md");
  writeFile(convert(readmeData));
};

main();

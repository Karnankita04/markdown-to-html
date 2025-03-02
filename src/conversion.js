const extractTag = (symbol) => {
  const tags = {
    "#": "h1",
    "##": "h2",
    "###": "h3",
    "####": "h4",
    "#####": "h5",
    "######": "h6", 
  };

  return tags[symbol] || "p";
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
    let content = element.split(" ");
    const symbol = element.split(" ")[0];
    const tag = extractTag(symbol);

    if (tag !== "p") {
      content = element.split(" ").slice(1);
    }

    htmlDoc = convertToElem(tag, content.join(" "), bodyContent);
  });

  return htmlDoc;
};

const main = () => {
  const readmeData = Deno.readTextFileSync("src/sample.md");
  // convert(readmeData);
  writeFile(convert(readmeData));
};

main();

import getFileContent from "../../helpers/getFileContent";

const runner = async () => {
  // batter up
  const fileContent = getFileContent(5);

  const [stacks, instructions] = fileContent.split("\n\n");

  const columns = stacks.split("\n");

  let found: string[] = new Array();

  // get stacks into the found data structure
  columns.forEach((row) => {
    for (let i = 0; i < row.length / 4; i++) {
      // const current = found[i] ? found[i] : (found[i] = []);
      let current = found[i] ? found[i] : "";
      // every 1 + 4x character is the one we're after
      if (row.charAt(i * 4 + 1).search(new RegExp("^[a-zA-Z]+$")) !== -1) {
        current = current.concat(row.charAt(i * 4 + 1));
        found[i] = current;
      }
    }
  });

  // decode the input instructions
  const parsed = instructions.split("\n").map((item) => {
    const parts = item.split(" ");
    return [parseInt(parts[1]), parseInt(parts[3]), parseInt(parts[5])];
  });

  // compute the instructions and save them to found array
  parsed.forEach((instruction) => {
    const amount = instruction[0];
    const source = instruction[1];
    const dest = instruction[2];

    let destArray = found[dest - 1];
    let sourceArray = found[source - 1];

    let newSource = sourceArray.substring(amount, sourceArray.length);
    // if the stack is 2 or more - maintain the order, else it's same as previous
    let newDest =
      amount >= 2
        ? sourceArray.substring(0, amount).concat(destArray)
        : sourceArray
            .substring(0, amount)
            .split("")
            .reverse()
            .join("")
            .concat(destArray);

    found[dest - 1] = newDest;
    found[source - 1] = newSource;
  });

  let output = "";
  found.forEach((item) => (output = output.concat(item[0])));

  console.log(output);
};

runner();

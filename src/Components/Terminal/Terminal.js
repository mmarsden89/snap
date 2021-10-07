import "./Terminal.scss";
import React, { useState, useEffect } from "react";
import {
  directoryItems,
  directoryPaths,
  snapHelp,
  textFiles,
} from "./Snap/index";
import KeepAtBottom from "./KeepAtBottom";
import TerminalHome from "./TerminalHome";

const Terminal = () => {
  const [inputText, setInputText] = useState("");
  const [workingDirectory, setWorkingDirectory] = useState(
    "/users/mattmarsden/home/"
  );
  const [terminalReturn, setTerminalReturn] = useState([]);
  const [clear, setClear] = useState(false);
  const [previousCommands, setPreviousCommands] = useState([]);
  const [commandIndex, setCommandIndex] = useState(0);
  const [clickedLink, setClickedLink] = useState(false);

  const defaultDirectory = "/users/mattmarsden/home/";

  const handleSubmit = (e) => {
    e.preventDefault();
    let updated = [...terminalReturn, `$ ${inputText}`];
    let updatedDir = workingDirectory;
    setCommandIndex(previousCommands.length);
    setPreviousCommands([...previousCommands, inputText, ""]);
    if (inputText === "pwd") {
      updated.push(updatedDir);
    } else if (inputText === "clear") {
      setClear(true);
      setClickedLink(false);
      updated = ["Type home or snap --help"];
    } else if (inputText.includes("cd")) {
      const directPath =
        directoryPaths[updatedDir][inputText.split(" ")[1]] ||
        directoryPaths[
          directoryPaths["aliases"][`${updatedDir}/${inputText.split(" ")[1]}`]
        ];
      if (directPath) {
        updatedDir = directPath.directory;
        setWorkingDirectory(updatedDir);
      } else {
        updated.push(`-snap ${inputText}: No such file or directory`);
      }
    } else if (inputText === "ls") {
      updated = listFilesCommand(workingDirectory, updated);
    } else if (inputText.includes("snap")) {
      if (inputText.includes("--help")) {
        for (const [key, value] of Object.entries(snapHelp)) {
          updated.push(`${key}: ${value}`);
        }
      } else {
        updated.push(
          "Currently only the --help flag is supported but there are more features planned! Stay tuned!"
        );
      }
    } else if (inputText === "home") {
      updated = [];
      setClear(false);
      setWorkingDirectory("/users/mattmarsden/home/");
    } else if (inputText.includes("whim")) {
      if (inputText.includes("txt")) {
        handleTerminalClick(inputText.split(" ")[1], updated);
      } else {
        const splitText = inputText.split(" ")[1];
        if (splitText) {
          updated.push(`whim does not recognize ${splitText} as a txt file`);
        } else {
          updated.push("please specify a txt file for whim to read");
        }
      }
    } else if (inputText.includes("open")) {
      // window.open(inputText.split(" ")[1]);
    } else {
      updated.push(`-snap: ${inputText}: command not found`);
    }
    if (updatedDir !== workingDirectory) {
      updated.push(updatedDir);
    }
    setInputText("");
    setTerminalReturn(updated);
  };

  const handleKeyDown = (e) => {
    const { keyCode } = e;
    if (keyCode === 38 && commandIndex > 0) {
      setCommandIndex(commandIndex - 1);
      setInputText(previousCommands[commandIndex]);
    } else if (keyCode === 40 && commandIndex < previousCommands.length) {
      setCommandIndex(commandIndex + 1);
      setInputText(previousCommands[commandIndex]);
    } else if (keyCode === 39) {
      const directoryItemsKey =
        directoryItems[workingDirectory] ||
        directoryItems[directoryItems["aliases"][workingDirectory]];

      const textToSearch = inputText.includes(" ")
        ? inputText.split(" ")[1]
        : inputText;

      const updatedText = inputText.includes(" ")
        ? inputText.split(" ")[0]
        : "";

      const possibilities = directoryItemsKey.filter((item) => {
        return item.includes(textToSearch);
      });
      if (possibilities.length === 1) {
        setInputText(`${updatedText} ${possibilities[0]}`);
      }
    }
  };

  const listFilesCommand = (directory, updatedTerminalReturn) => {
    const directoryItemsMap =
      directoryItems[directory] ||
      directoryItems[directoryItems["aliases"][directory]];

    directoryItemsMap.map((item) => {
      return updatedTerminalReturn.push(item);
    });
    return updatedTerminalReturn;
  };

  const handleHomeLink = (e) => {
    setClickedLink(true);
    const updatedDirectory = `/users/mattmarsden/home/${e.target.id}/`;
    setWorkingDirectory(updatedDirectory);
    let updatedTerminal = [...terminalReturn];
    const updated = listFilesCommand(updatedDirectory, updatedTerminal);
    setTerminalReturn(updated);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputText(value);
  };

  const handleTerminalClick = (file, updated) => {
    if (file.includes("txt")) {
      updated.push(textFiles[file]);
      setTerminalReturn(updated);
    } else if (file.includes(".com")) {
      window.open(
        "mailto:mattmarsdendev@gmail.com?subject=Wow, this terminal is really neat!"
      );
    } else if (file.includes(".io")) {
      window.open("/#/portfolio");
    } else if (file.includes("$")) {
      const newDirectory = file.includes("home" || "Home")
        ? defaultDirectory
        : `${defaultDirectory}${file.split("$")[1]}`;
      setWorkingDirectory(newDirectory);
      updated.push(`$ cd ${newDirectory}`);
      updated.push(`$ ls`);

      const listed = listFilesCommand(newDirectory, updated);
      updated.push(listed);
    }
    setTerminalReturn(updated);
  };

  useEffect(() => {}, [terminalReturn, clear]);

  const handleFileLink = (item) => {
    const file = item.target.id;
    if (file.includes("#") && !file.includes("whim") && !file.includes(".io")) {
      const updated = [...terminalReturn, `$ whim ${file}`];
      setTerminalReturn(updated);
      handleTerminalClick(file, updated);
    } else if (file.includes("$") && !file.includes(" ")) {
      setClickedLink(false);
      const newDirectory = file.includes("home")
        ? defaultDirectory
        : `/users/mattmarsden/home/${file.split("$")[1]}/`;
      setWorkingDirectory(newDirectory);
      let updated = [...terminalReturn];
      updated.push(`$ cd ${newDirectory}`);
      if (file.includes("home")) {
        updated = [];
      } else {
        updated = listFilesCommand(newDirectory, updated);
      }
      setTerminalReturn(updated);
    } else {
      if (file.includes(".io") || file.includes(".com")) {
        handleTerminalClick(file, terminalReturn);
      }
    }
  };

  const terminalStyleCheck = (item) => {
    let style = "terminal-return ";
    try {
      if (item.includes("txt") && !item.includes("whim")) {
        style += "txt-link";
      } else if (
        (item.includes(".io") ||
          item.includes(".com") ||
          item.includes("www")) &&
        !item.includes("whim") &&
        !item.includes("open")
      ) {
        style += "web-link";
      } else if (item.includes("$") && !item.includes("$ ")) {
        style += "tools-link";
      }
      return style;
    } catch (err) {
      return err;
    }
  };

  const terminalReturnHTML = terminalReturn.map((item) => (
    <div
      className={terminalStyleCheck(item)}
      onClick={(item) => handleFileLink(item)}
      id={item}
      key={`${Math.random() * 100}${item}`}
    >
      {item}
    </div>
  ));

  return (
    <div className="outer-term">
      <div className="terminal-container">
        <div className="loading-snap-container">
          <div className="loading-snap">Loading...</div>
        </div>
        {!clear && (
          <TerminalHome
            handleHomeLink={handleHomeLink}
            show={previousCommands.length}
          />
        )}
        {clickedLink && <div>Click a purple link to read file</div>}
        <div className="terminal-return-container">
          {terminalReturnHTML}
          <KeepAtBottom />
        </div>
        <form onSubmit={handleSubmit} className="input-container">
          <label>
            $
            <input
              autoFocus
              type="text"
              name="command"
              className="terminal-input"
              onChange={handleChange}
              value={inputText || ""}
              tabIndex="-1"
              spellCheck="false"
              onKeyDown={handleKeyDown}
            />
          </label>
        </form>
      </div>
    </div>
  );
};

export default Terminal;

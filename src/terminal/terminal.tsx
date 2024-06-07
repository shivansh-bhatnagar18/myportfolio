'use client'
import React, {useEffect, useState, useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {faGithub, faLinkedin, faInstagram} from "@fortawesome/free-brands-svg-icons";

interface Command {
    type: string;
    content: JSX.Element;
}

const delay = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));

const Terminal = (): JSX.Element => {
    const [commands, setCommands] = useState<Command[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState<string>("");

    const addText = (text: string): void => {
        setCommands((prev) => [
            ...prev,
            {
                type: 'text',
                content: <p dangerouslySetInnerHTML={{__html: text}}/>,
            },
        ]);
    };

    useEffect(() => {
        openTerminal();
    }, []); // Add setInputValue to the dependency array


    const addCode = (code: string, text: string): void => {
        setCommands((prev) => [
            ...prev,
            {
                type: 'code',
                content: (
                    <p className="ml-[8px] text-[#66C2CD]">
                        {code} <br/>
                        <span className = "ml-[16px] text-white"> {text} </span>
                    </p>
                ),
            },
        ]);
    }

    useEffect(() => {
        openTerminal();
    }, []);

    const openTerminal = async (): Promise<void> => {
        addText("Welcome to my terminal based portfolio where you can have a look at my journey and projects.");
        await delay(700);
        addText("Starting the server...");
        await delay(1500);
        addText("You can now run several commands to navigate through the portfolio.");

        addCode("about me", "Get to know more about me.");
        addCode("all commands", "List all the available commands.");
        addCode("social -a", "List all my social media links.");

        await delay(500);
        newLine();
    };

    const newLine = (): void => {
        setCommands((prev) => [
            ...prev,
            {
                type: 'line',
                content: (
                    <>
                        <p className="text-[#F7FCA0]">
                            # user
                            <span className="text-[#6A77D2]"> in </span>
                            <span className="text-[#9CEAF3]">~/shivansh-bhatnagar18</span>
                        </p>
                        <div className="flex items-center px-[8px]">
                            <FontAwesomeIcon icon={faAngleRight} className="text-[#F7FCA0]" />
                            <input
                                className="w-full font-[16px] bg-transparent text-white outline-none border-none pl-[8px]"
                                type="text"
                                ref={inputRef}
                                value={inputValue}
                                onChange={(e) => {
                                    console.log(inputValue);
                                    setInputValue(e.target.value);
                                }}
                                onKeyDown={handleKeyPress}
                            />
                        </div>
                    </>
                ),
            },
        ]);
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
        if (event.key === "Enter") {
            await delay(150);
            getInputValue();
            removeInputValue();
            await delay(150);
            newLine();
        }
    };

    const removeInputValue = (): void => {
        setCommands((prev) => prev.slice(0, -1));
    };

    const getInputValue = async (): Promise<void> => {
        console.log(inputValue);
        const value = inputValue.toLowerCase();
        setInputValue("");
        switch (value) {
            case "all" :
                trueValue(value);
                addCode("projects", "My Github projects. Don't forget to star them!");
                addCode("about me", "Get to know more about me.");
                addCode("social -a", "List all my social media links.");
                addCode("clear", "Clear the terminal.");
                break;
            case "projects":
                trueValue(value);
                addText('<a href="https://github.com/shivansh-bhatnagar18" target="_blank"><FontAwesomeIcon icon={faGithub} />github.com/shivansh-bhatnagar18</a>');  
                break;
            case "about me":
                trueValue(value);
                addText("Tu es el hihos de puta");
                addText("I am a full stack developer who loves to work on projects that solve real-world problems. I am proficient in React, Node, and MongoDB.");
                break;  
            case "social -a":
                trueValue(value);
                addText('<a href="https://github.com/shivansh-bhatnagar18" target="_blank"><FontAwesomeIcon icon={faGithub} />github.com/shivansh-bhatnagar18</a>');
                addText('<a href="https://www.linkedin.com/in/shivansh-bhatnagar-18" target="_blank"><FontAwesomeIcon icon={faLinkedin} />linkedin.com/in/shivansh-bhatnagar-18</a>');
                addText('<a href="https://instagram.com" target="_blank"><FontAwesomeIcon icon={faInstagram} />instagram.com/shivansh_18</a>');
                break;
            case "social":
                addText("Please specify -a to list all social media links.");
                break;
            case "clear":
                setCommands([]);
                break;
            default:
                addText(`Command not found: ${value}`);
                falseValue(value);
        }
    };

    const trueValue = (value: string): void => {
        setCommands((prev) => [
            ...prev,
            {
                type: 'command',
                content: (
                <section className="flex items-center px-[8px]">
                    <FontAwesomeIcon icon={faAngleRight} className="text-[#5AD786] pr-[8px]" />
                    <h2 className="text-[#5AD786]">{value}</h2>
                    </section>
                ),
            },
        ]);
    };

    const falseValue = (value: string): void => {
        setCommands((prev) => [
            ...prev,
            {
                type: 'command',
                content: (
                <section className="flex items-center px-[8px]">
                    <FontAwesomeIcon icon={faAngleRight} className="text-[#F78F85]" />
                    <h2 className="text-[#F78F85]">{value}</h2>
                </section>
                ),
            },
        ]);
    };

    return (
        <div>
            {commands.map((command, index) => <div key={index}>{command.content}</div>)}
        </div>
    );
};

export default Terminal;

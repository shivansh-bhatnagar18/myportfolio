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
    const inputValueRef = useRef<string>('');

    const addText = (text: string): void => {
        setCommands((prev) => [
            ...prev,
            {
                type: 'text',
                content: <p dangerouslySetInnerHTML={{__html: text}}/>,
            },
        ]);
    };

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

    const addLink = (link: string, icon: string, text: string): void => {
        setCommands((prev) => [
            ...prev,
            {
                type: 'link',
                content: (
                    <a href={link} target="_blank" className="text-[#ffffff]">
                        {icon === 'github' ? <FontAwesomeIcon icon={faGithub}/> : icon === 'linkedin' ? <FontAwesomeIcon icon={faLinkedin}/> : <FontAwesomeIcon icon={faInstagram}/>}
                        {' '}
                        {text}
                    </a>
                ),
            },
        ]);
    }

    const openTerminal = async (): Promise<void> => {
        addText("Welcome to my terminal based portfolio where you can have a look at my journey and projects.");
        await delay(700);
        addText("Starting the server...");
        await delay(1500);
        addText("You can now run several commands to navigate through the portfolio.");

        addCode("about me", "Get to know more about me.");
        addCode("commands -a", "List all the available commands.");
        addCode("social -a", "List all my social media links.");

        await delay(500);
        newLine();
    };

    const newLine = async (): Promise<void> => {
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
                                onChange={(e) => {
                                    inputValueRef.current = e.target.value;
                                }}
                                onKeyDown={handleKeyPress}
                                autoFocus
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
            // removeInputValue();
            await delay(150);
            newLine();
        }
    };

    const removeInputValue = (): void => {
        setCommands((prev) => prev.slice(0, -1));
    };

    const getInputValue = async (): Promise<void> => {
        const value = inputValueRef.current.toLowerCase();
        if (value === "commands -a") {
            trueValue(value);
            addCode("projects", "My Github projects. Don't forget to star them!");
            addCode("about me", "Get to know more about me.");
            addCode("social -a", "List all my social media links.");
            addCode("clear", "Clear the terminal.");
            await delay(500);
        } else if (value === "projects") {
            trueValue(value);
            addText("Dive into My Code Wonderland on GitHub")
            addLink("https://github.com/shivansh-bhatnagar18", "github", "github.com/shivansh-bhatnagar18");
        } else if (value === "about me") {
            trueValue(value);
            addText("Hello there! I am Shivansh Bhatnagar.");
            addText("I am a Full Stack Developer with a passion for building scalable and efficient applications.");
            addText("I'm a sophomore at IIT BHU, diving deep into the world of Mathematics and Computing. When I'm not crunching numbers, you'll find me sculpting the digital landscape as a full stack developer.")
            addText("By day, I craft sleek, responsive interfaces and robust back-end architectures. By night, I morph into a systems developer, tweaking and optimizing to make sure everything runs smoother than a fresh install.")
            addText("The open source world is my playground, where I contribute, collaborate, and sometimes just marvel at the sheer awesomeness of community-driven innovation. Whether it is debugging a tricky issue or exploring the latest tech trends, I am always on the lookout for the next big thing to learn and master.")  
            addText("If code could speak, mine would probably say, Let's build something amazing! 🚀")
        } else if (value === "social -a") {
            trueValue(value);
            addLink("https://github.com/shivansh-bhatnagar18", "github", "github.com/shivansh-bhatnagar18");
            addLink("https://www.linkedin.com/in/shivansh-bhatnagar-2a02b2185/", "linkedin", "linkedin.com/in/shivansh-bhatnagar");
            addLink("https://www.instagram.com/s_b_phantom/", "instagram", "instagram.com/s_b_phantom")
        } else if (value === "social") {
            addText("Please specify -a to list all social media links.");
        } else if (value === "commands") {
            addText("Please specify -a to list all available commands.");
        } else if (value === "clear") {
            setCommands([]);
        } else {
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
                    <FontAwesomeIcon icon={faAngleRight} className="text-[#F78F85] pr-[8px]" />
                    <h2 className="text-[#F78F85]">{value}</h2>
                </section>
                ),
            },
        ]);
    };

    useEffect(() => {
        openTerminal();
    }, []);

    return (
        <div>
            {commands.map((command, index) => <div key={index}>{command.content}</div>)}
        </div>
    );
};

export default Terminal;

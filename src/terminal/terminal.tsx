'use client'
import React, {useEffect, useState, useRef} from "react";

interface Command {
    type: string;
    content: JSX.Element;
}

const delay = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));

const Terminal = (): JSX.Element => {
    const [commands, setCommands] = useState<Command[]>([]);

    const addText = (text: string): void => {
        setCommands((prev) => [
            ...prev,
            {
                type: 'text',
                content: <p dangerouslySetInnerHTML={{__html: text}} />,
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

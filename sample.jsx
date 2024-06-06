import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const Terminal = () => {
  const [commands, setCommands] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const openTerminal = async () => {
    addText('Welcome');
    await delay(700);
    addText('Starting the server...');
    await delay(1500);
    addText('You can run several commands:');

    addCode('about me', 'Who am I and what do I do.');
    addCode('all', 'See all commands.');
    addCode('social -a', 'All my social networks.');

    await delay(500);
    newLine();
  };

  const newLine = () => {
    setCommands((prev) => [
      ...prev,
      {
        type: 'line',
        content: (
          <>
            <p className="path"># user <span> in</span><span> ~/heber-leonard</span></p>
            <div className="type">
              <FontAwesomeIcon icon={faAngleRight} className="icone" />
              <input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
          </>
        ),
      },
    ]);
    setTimeout(() => inputRef.current.focus(), 0);
  };

  const removeInput = () => {
    setCommands((prev) => prev.slice(0, -1));
  };

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      await delay(150);
      getInputValue();
      removeInput();
      await delay(150);
      newLine();
    }
  };

  const getInputValue = async () => {
    const value = inputValue;
    setInputValue('');
    if (value === 'all') {
      trueValue(value);
      addCode('projects', 'My GitHub page with my projects. Follow me there ;)');
      addCode('about me', 'Who am I and what do I do.');
      addCode('social -a', 'All my social networks.');
      addCode('clear', 'Clean the terminal.');
    } else if (value === 'projects') {
      trueValue(value);
      addText('<a href="https://github.com/heberleonard2" target="_blank"><FontAwesomeIcon icon={faGithub} /> github.com/heberleonard2</a>');
    } else if (value === 'about me') {
      trueValue(value);
      addText('Oi, meu nome é Héber ;)');
      addText('Desenvolvedor atualmente focado em todo o ecossistema Javascript. Utilizando principalmente a stack <span className="blue">Node, React e React Native </span>por permitir criar aplicações de forma descomplicada e produtiva.');
    } else if (value === 'social -a') {
      trueValue(value);
      addText('<a href="https://github.com/heberleonard2" target="_blank"><FontAwesomeIcon icon={faGithub} /> github.com/heberleonard2</a>');
      addText('<a href="https://www.linkedin.com/in/heber-leonard/" target="_blank"><FontAwesomeIcon icon={faLinkedinIn} /> linkedin.com/in/heber-leonard</a>');
      addText('<a href="https://www.instagram.com/heber_leonard/" target="_blank"><FontAwesomeIcon icon={faInstagram} /> instagram.com/heber_leonard</a>');
    } else if (value === 'social') {
      trueValue(value);
      addText("Didn't you mean: social -a?");
    } else if (value === 'clear') {
      setCommands([]);
    } else {
      falseValue(value);
      addText(`command not found: ${value}`);
    }
  };

  const trueValue = (value) => {
    setCommands((prev) => [
      ...prev,
      {
        type: 'command',
        content: (
          <section className="type2">
            <FontAwesomeIcon icon={faAngleRight} className="icone" />
            <h2 className="success">{value}</h2>
          </section>
        ),
      },
    ]);
  };

  const falseValue = (value) => {
    setCommands((prev) => [
      ...prev,
      {
        type: 'command',
        content: (
          <section className="type2">
            <FontAwesomeIcon icon={faAngleRight} className="icone error" />
            <h2 className="error">{value}</h2>
          </section>
        ),
      },
    ]);
  };

  const addText = (text) => {
    setCommands((prev) => [
      ...prev,
      {
        type: 'text',
        content: <p dangerouslySetInnerHTML={{ __html: text }} />,
      },
    ]);
  };

  const addCode = (code, text) => {
    setCommands((prev) => [
      ...prev,
      {
        type: 'code',
        content: (
          <p className="code">
            {code} <br />
            <span className="text"> {text} </span>
          </p>
        ),
      },
    ]);
  };

  useEffect(() => {
    openTerminal();
  }, []);

  return <div id="app">{commands.map((cmd, index) => <div key={index}>{cmd.content}</div>)}</div>;
};

export default Terminal;

const TerminalHome = (props) => {
  const { show, handleHomeLink } = props;
  return (
    <div
      className={
        show > 1
          ? "terminal-hello-container"
          : "terminal-hello-container-animated"
      }
    >
      <div className="hello-text">
        Hi! I'm Matt. I build things for the web!
      </div>
      <div className="specialize-text">
        I specialize in front end development but have experience as a full
        stack developer working on enterprise software. I love to build clean UI
        and have a passion for improving user experiences.
      </div>
      <div className="click-instructions">
        <br />
        Feel free to click an <p className="orange">$orange&nbsp;</p>
        link below or try out the terminal! <br />
        Type snap --help for more info
      </div>
      <div className="tool-text-container">
        <div className="tools-link" onClick={handleHomeLink} id="aboutme">
          $aboutme
        </div>
        <div className="tools-link" onClick={handleHomeLink} id="contact">
          $contact
        </div>
        <div className="tools-link" onClick={handleHomeLink} id="portfolio">
          $portfolio
        </div>
        <div
          className="tools-link"
          onClick={handleHomeLink}
          id="languages&tools"
        >
          $languages&tools
        </div>
      </div>
    </div>
  );
};

export default TerminalHome;

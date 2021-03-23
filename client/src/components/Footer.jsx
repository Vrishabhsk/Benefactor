import React from "react";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";

export default function Footer() {
  const date = new Date();

  return (
    <div>
      <div className="footer">
        COPYRIGHT &copy; VRISHABH JASANI {date.getFullYear}
      </div>
      <div className="social">
        <a
          className="type"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/vrishabh-jasani-066538190/"
        >
          <LinkedInIcon />
        </a>
        <a
          className="type"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/Vrishabhsk"
        >
          <GitHubIcon />
        </a>
        <a
          className="type"
          target="_blank"
          rel="noopener noreferrer"
          href="mailto: vrishabhsk@gmail.com"
        >
          <AlternateEmailIcon />
        </a>
      </div>
    </div>
  );
}

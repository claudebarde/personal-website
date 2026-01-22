import { css } from "lit";

export const buttonFollow = css`
  a.follow {
    color: white;
    border: none;
    border-radius: var(--std-radius);
    margin-right: 12px;
    padding: 5px 10px;
    font-size: 0.9rem;
    cursor: pointer;
    box-shadow: var(--std-box-shadow);
    text-decoration: none;
  }
  a.follow.github {
    background-color: #24292e;
  }
  a.follow.twitter {
    background-color: #1da1f2;
  }
  a.follow.linkedin {
    background-color: #0077b5;
  }
  a.follow.telegram {
    background-color: #0088cc;
  }
  a.follow.youtube {
    background-color: #ff0000;
  }
  a.follow.location {
    background-color: #6c757d;
  }
  a.follow.blog {
    background-color: #28a745;
  }
`;

export const linkToButton = css`
  a.link-button {
    color: var(--link-color);
    text-decoration: none;
    font-weight: 500;
    cursor: pointer;
    padding-top: 5px;
    margin-top: 15px;
    text-align: center;
  }
  a.link-button:hover {
    border: solid 1px var(--telegram-color);
    border-radius: 15px;
    padding: 5px 15px;
    background-color: var(--telegram-color);
    color: white;
  }
`;

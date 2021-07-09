import React from "react";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
} from "react-share";

const ShareModal = ({ url }) => {
  return (
    <div
      className="share-modal"
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: "4px 0",
      }}
    >
      <FacebookShareButton url={url}>
        <FacebookIcon round={true} size={32} />
      </FacebookShareButton>

      <TwitterShareButton url={url}>
        <TwitterIcon round={true} size={32} />
      </TwitterShareButton>

      <TelegramShareButton url={url}>
        <TelegramIcon round={true} size={32} />
      </TelegramShareButton>

      <EmailShareButton url={url}>
        <EmailIcon round={true} size={32} />
      </EmailShareButton>

      <WhatsappShareButton url={url}>
        <WhatsappIcon round={true} size={32} />
      </WhatsappShareButton>

      <RedditShareButton url={url}>
        <RedditIcon round={true} size={32} />
      </RedditShareButton>
    </div>
  );
};

export default ShareModal;

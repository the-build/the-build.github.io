import React from "react"

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    React.createElement("script", {
      key: "google-adsense",
      async: true,
      src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9813975852186273",
      crossOrigin: "anonymous"
    })
  ])
}
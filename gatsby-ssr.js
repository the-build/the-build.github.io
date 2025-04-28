// gatsby-ssr.js
import React from "react";

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    // <script
    //   key="adsense-script"
    //   data-ad-client="ca-pub-9813975852186273"  // 여기에 본인 코드 넣기
    //   async
    //   src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    // ></script>,
    <script async  key="adsense-script" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9813975852186273"
     crossOrigin="anonymous" />
  ]);
};

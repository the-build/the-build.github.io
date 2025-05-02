module.exports = {
  plugins: [
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-YL29J4YKJ7"],
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-adsense`,
      options: {
        publisherId: `ca-pub-9813975852186273`
      },
    },
    {
      resolve: "gatsby-theme-portfolio-minimal",
      options: {
        siteUrl: "https://the-build.github.io", // Used for sitemap generation
        manifestSettings: {
          favicon: "./content/images/favicon.png", // Path is relative to the root
          siteName: "The Build's Blog", // Used in manifest.json
          shortName: "The Build", // Used in manifest.json
          startUrl: "/", // Used in manifest.json
          backgroundColor: "#FFFFFF", // Used in manifest.json
          themeColor: "#000000", // Used in manifest.json
          display: "minimal-ui", // Used in manifest.json
        },
        contentDirectory: "./content",
        blogSettings: {
          path: "/blog", // Defines the slug for the blog listing page
          usePathPrefixForArticles: false, // Default true (i.e. path will be /blog/first-article)
        },
        // googleAnalytics: {
        //     trackingId: "G-YL29J4YKJ7",
        //     anonymize: true, // Default true
        //     environments: ["production", "development"] // Default ["production"]
        // }
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './content/images/', // 이미지가 위치한 경로
      },
    },
    'gatsby-transformer-sharp', // 이미지 변환을 위한 플러그인
    'gatsby-plugin-sharp', // 이미지 최적화를 위한 플러그인
    // 'gatsby-plugin-image', // 이미지 처리를 위한 플러그인
    
  ],
};

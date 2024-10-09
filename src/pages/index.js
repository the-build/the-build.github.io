import React from "react";
import {
  AboutSection,
  ArticlesSection,
  ContactSection,
  HeroSection,
  InterestsSection,
  Page,
  ProjectsSection,
  Seo,
  Section,
  Animation
} from "gatsby-theme-portfolio-minimal";

import { GatsbyImage, getImage } from "gatsby-plugin-image"

import * as languagesCSS from "../../content/sections/languages/style.module.css"


import { graphql, useStaticQuery } from 'gatsby';

export default function IndexPage() {

  const data = useStaticQuery(graphql`
  query {
    allLanguagesJson {
      nodes {
        label
        image {
          src {
          	childImageSharp {
              original {
                width
                height
                src
              }
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
          alt
        }
      }
    }
  }
  `);
  

  const languages = data.allLanguagesJson.nodes;

  return (
    <>
      <Seo title="The Build's Blog" />
      <Page useSplashScreenAnimation>
        <HeroSection sectionId="hero" />
        {/* <LanguageSection sectionId="languages" heading="Programing languages" /> */}
        <Section sectionId="languages" heading="Programing languages">
          <div>
            <div className={languagesCSS.Track}>
            {languages.map((language, index) => {
              console.log(language)
              const image = getImage(language.image.src);
              console.log(image)
              return (
                <div key={index} className={languagesCSS.Item}>
                  
                  <GatsbyImage image={image} alt={language.image.alt || language.label} />
                  {/* <GatsbyImage image={language.image.src.childImageSharp.gatsbyImageData.images.fallback.src} alt={language.image.alt || language.label} /> */}
                </div>
              );
            })}
            </div>
          </div>
        </Section>
        
        <ArticlesSection sectionId="articles" heading="Latest Articles" sources={['Blog']} />
        {/* <AboutSection sectionId="about" heading="About Portfolio Minimal" /> */}
        {/* <InterestsSection sectionId="details" heading="Details" />
        <ProjectsSection sectionId="features" heading="Built-in Features" /> */}
        {/* <ContactSection sectionId="github" heading="Issues?" /> */}
      </Page>
    </>
  );
}

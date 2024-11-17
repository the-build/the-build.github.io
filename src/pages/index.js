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
              gatsbyImageData(layout: CONSTRAINED)
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
        <Section anchor="languages" additionalClasses={[languagesCSS.LanguagesContainer]} heading="Programing languages">
          <div className={languagesCSS.LanguagesContainer}>
          <div className={languagesCSS.Track}>
          {[...languages,...languages].map((language, index) => {
            const image = getImage(language.image.src.childImageSharp.gatsbyImageData);

            return (
              <div key={index} className={languagesCSS.Item}>
                {image ? (
                  <GatsbyImage image={image} alt={language.image.alt || language.label} />
                ) : (
                  <p>이미지를 불러올 수 없습니다.</p>
                )}
              </div>
            );
          })}
          </div>
          </div>
        </Section>
        
        <ArticlesSection sectionId="articles" heading="Latest Articles" sources={['Blog']} />
        <AboutSection sectionId="about" heading="About [The build]" />
        {/* <InterestsSection sectionId="details" heading="Details" />
        <ProjectsSection sectionId="features" heading="Built-in Features" /> */}
        {/* <ContactSection sectionId="github" heading="Issues?" /> */}
      </Page>
    </>
  );
}

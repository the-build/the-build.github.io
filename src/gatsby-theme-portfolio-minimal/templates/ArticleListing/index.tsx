import React from 'react';
import { Page } from 'gatsby-theme-portfolio-minimal/src/components/Page';
import { Section } from 'gatsby-theme-portfolio-minimal/src/components/Section';
import { Seo } from 'gatsby-theme-portfolio-minimal/src/components/Seo';
import { Slider } from 'gatsby-theme-portfolio-minimal/src/components/Slider';
import { Button, ButtonType } from 'gatsby-theme-portfolio-minimal/src/components/Button';
import { ArticleTemplateData } from 'gatsby-theme-portfolio-minimal/src/templates/Article/data';
import { pluralize } from 'gatsby-theme-portfolio-minimal/src/utils/pluralize';
import { ArticleCard } from '../../components/ArticleCard';
import * as classes from './style.module.css';

interface ArticleListingTemplateProps {
    pageContext: {
        articles: ArticleTemplateData[];
        entityName?: string;
    };
}

interface FilterOption {
    label: string;
    selected: boolean;
    relatedArticleIds: string[];
}

export default function ArticleListingTemplate(props: ArticleListingTemplateProps): React.ReactElement {
    const ARTICLES_PER_PAGE = 9;
    const articles = props.pageContext.articles;
    const [filterOptions, setFilterOptions] = React.useState<FilterOption[]>(extractFilterOptions(articles));
    const [shownArticlesNumber, setShownArticlesNumber] = React.useState<number>(ARTICLES_PER_PAGE);

    function handleFilterOptionClick(optionLabel: string): void {
        const updatedFilterOptions = [...filterOptions];
        const selectedOptionIndex = updatedFilterOptions.map((o) => o.label).indexOf(optionLabel);
        updatedFilterOptions[selectedOptionIndex].selected = !updatedFilterOptions[selectedOptionIndex].selected;
        setFilterOptions(updatedFilterOptions);
    }

    let selectedArticleIds: string[] = [];
    const filterSelected = filterOptions.map((o) => o.selected).indexOf(true) !== -1;
    if (filterSelected) {
        selectedArticleIds = filterOptions
            .filter((option) => option.selected)
            .map((option) => option.relatedArticleIds)
            .flat(1)
            .filter((id, index, arr) => arr.indexOf(id) === index);
    }

    const entities = pluralize(props.pageContext.entityName) ?? 'Articles';

    return (
        <>
            <Seo title={`All ${entities}`} useTitleTemplate={true} />
            <Page>
                <Section anchor="articleListing" heading={entities}>
                    <div className={classes.Filter}>
                        Select categories to filter {entities.toLocaleLowerCase()}
                        <Slider additionalClasses={[classes.Options]}>
                            {filterOptions.map((option, key) => {
                                return (
                                    <div
                                        key={key}
                                        role="button"
                                        onClick={() => handleFilterOptionClick(option.label)}
                                        className={[
                                            classes.Option,
                                            option.selected === true ? classes.Selected : null,
                                        ].join(' ')}
                                    >
                                        {option.label} ({option.relatedArticleIds.length})
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                    <div className={classes.Listing}>
                        {articles
                            .filter((article) => !filterSelected || selectedArticleIds.includes(article.id))
                            .slice(0, shownArticlesNumber)
                            .map((article, key) => {
                                return (
                                    <ArticleCard
                                        key={key}
                                        showBanner={true}
                                        data={{
                                            image: article.banner,
                                            title: article.title,
                                            category: article.categories.join(' / '),
                                            publishedAt: new Date(article.date.replace(/-/g, '/')),
                                            link: article.slug,
                                            readingTime: article.readingTime.text,
                                        }}
                                    />
                                );
                            })}
                    </div>
                    {(filterSelected && selectedArticleIds.length > shownArticlesNumber) ||
                    (!filterSelected && articles.length > shownArticlesNumber) ? (
                        <div className={classes.LoadMore}>
                            <Button
                                type={ButtonType.BUTTON}
                                label="Load More"
                                onClickHandler={() => setShownArticlesNumber((prev) => prev + 6)}
                            />
                        </div>
                    ) : null}
                </Section>
            </Page>
        </>
    );
}

function extractFilterOptions(articles: ArticleTemplateData[]): FilterOption[] {
    const filterOptions: FilterOption[] = [];
    const categoryList: string[] = [];
    articles.forEach((article) => {
        article.categories.forEach((category) => {
            if (!categoryList.includes(category)) {
                filterOptions.push({ label: category, selected: false, relatedArticleIds: [article.id] });
                categoryList.push(category);
            } else {
                const optionIndex = filterOptions.map((o) => o.label).indexOf(category);
                filterOptions[optionIndex].relatedArticleIds.push(article.id);
            }
        });
    });
    return filterOptions.sort((a, b) => (a.relatedArticleIds.length > b.relatedArticleIds.length ? -1 : 1));
}

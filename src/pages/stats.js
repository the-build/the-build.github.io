import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { Page, Seo, Section } from 'gatsby-theme-portfolio-minimal';
import { useAllViews } from '../hooks/useAllViews';
import * as classes from './stats.module.css';

export default function StatsPage() {
    const data = useStaticQuery(graphql`
        query StatsArticleQuery {
            allArticle {
                articles: nodes {
                    slug
                    title
                    categories
                    date(formatString: "YYYY-MM-DD")
                }
            }
        }
    `);

    const views = useAllViews();
    const articles = data.allArticle.articles;

    // Map slug -> article metadata for nice labels.
    const metaBySlug = React.useMemo(() => {
        const map = {};
        articles.forEach((a) => {
            map[a.slug] = a;
        });
        return map;
    }, [articles]);

    const loading = views === null;

    // Build a sorted list of { slug, title, category, date, count }.
    const rows = React.useMemo(() => {
        if (!views) return [];
        return Object.entries(views)
            .map(([slug, count]) => {
                const meta = metaBySlug[slug];
                return {
                    slug,
                    count: typeof count === 'number' ? count : 0,
                    title: meta?.title || slug,
                    category: meta?.categories?.join(' / ') || '—',
                    date: meta?.date || '',
                    linkable: Boolean(meta),
                };
            })
            .sort((a, b) => b.count - a.count);
    }, [views, metaBySlug]);

    const total = rows.reduce((sum, r) => sum + r.count, 0);
    const trackedPages = rows.length;
    const topPage = rows[0];
    const average = trackedPages ? Math.round(total / trackedPages) : 0;
    const maxCount = topPage?.count || 1;

    return (
        <>
            <Seo title="View Statistics" />
            <Page>
                <Section anchor="stats" heading="View Statistics">
                    {loading ? (
                        <p className={classes.Muted}>Loading view data…</p>
                    ) : trackedPages === 0 ? (
                        <p className={classes.Muted}>No views recorded yet.</p>
                    ) : (
                        <>
                            <div className={classes.Cards}>
                                <Card label="Total Views" value={total.toLocaleString()} />
                                <Card label="Tracked Pages" value={trackedPages.toLocaleString()} />
                                <Card label="Avg / Page" value={average.toLocaleString()} />
                                <Card
                                    label="Top Page"
                                    value={topPage.count.toLocaleString()}
                                    sub={topPage.title}
                                />
                            </div>

                            <h3 className={classes.SubHeading}>Views per Page</h3>
                            <div className={classes.Chart}>
                                {rows.map((r) => {
                                    const pct = Math.max(2, (r.count / maxCount) * 100);
                                    return (
                                        <div key={r.slug} className={classes.BarRow}>
                                            <div className={classes.BarLabel} title={r.title}>
                                                {r.linkable ? (
                                                    <Link to={r.slug}>{r.title}</Link>
                                                ) : (
                                                    r.title
                                                )}
                                            </div>
                                            <div className={classes.BarTrack}>
                                                <div
                                                    className={classes.BarFill}
                                                    style={{ width: `${pct}%` }}
                                                />
                                            </div>
                                            <div className={classes.BarValue}>
                                                {r.count.toLocaleString()}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <h3 className={classes.SubHeading}>All Pages</h3>
                            <div className={classes.TableWrapper}>
                                <table className={classes.Table}>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>Category</th>
                                            <th>Date</th>
                                            <th className={classes.Right}>Views</th>
                                            <th className={classes.Right}>Share</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows.map((r, i) => (
                                            <tr key={r.slug}>
                                                <td>{i + 1}</td>
                                                <td>
                                                    {r.linkable ? (
                                                        <Link to={r.slug}>{r.title}</Link>
                                                    ) : (
                                                        r.title
                                                    )}
                                                </td>
                                                <td>{r.category}</td>
                                                <td>{r.date}</td>
                                                <td className={classes.Right}>
                                                    {r.count.toLocaleString()}
                                                </td>
                                                <td className={classes.Right}>
                                                    {total ? ((r.count / total) * 100).toFixed(1) : '0.0'}%
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </Section>
            </Page>
        </>
    );
}

function Card({ label, value, sub }) {
    return (
        <div className={classes.Card}>
            <span className={classes.CardLabel}>{label}</span>
            <span className={classes.CardValue}>{value}</span>
            {sub && (
                <span className={classes.CardSub} title={sub}>
                    {sub}
                </span>
            )}
        </div>
    );
}

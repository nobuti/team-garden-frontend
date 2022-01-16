/* eslint-disable camelcase */
import React from 'react';
import cx from 'classnames';

import * as Dates from '~/services/dates';
import * as Urls from '~/services/urls';

import styles from './styles.module.css';

const Resource = ({ title, url, description, created_at, category }) => (
  <article className={styles.container}>
    <section className={styles.resource}>
      <div className={styles.details}>
        <span className={cx(styles.category, styles.truncate)}>
          {category} / {Urls.host(url)}
        </span>
        <span className={styles.date}>{Dates.format(created_at)}</span>

        <button type="button" className={styles.button}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            height={12}
            className={styles.icon}
          >
            <path
              fill="currentColor"
              d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"
            />
          </svg>
        </button>
      </div>
      <a
        className={styles.link}
        title={title}
        href={url}
        target="_blank"
        rel="noreferrer"
      >
        <h2 className={cx(styles.title, styles.clamp)}>{title}</h2>
      </a>
      {description && (
        <div className={cx(styles.truncate, styles.description)}>
          {description}
        </div>
      )}
    </section>
  </article>
);

export default Resource;

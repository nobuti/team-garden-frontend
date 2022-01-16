/* eslint-disable camelcase */
import React from 'react';
import cx from 'classnames';

import * as Dates from '~/services/dates';
import * as Urls from '~/services/urls';
import { ACTION } from '~/config';

import styles from './styles.module.css';

const SaveButton = () => (
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
);

const RemoveButton = () => (
  <button type="button" className={styles.button}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      height={12}
      className={styles.icon}
    >
      <path
        fill="currentColor"
        d="m207.6 256 107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"
      />
    </svg>
  </button>
);

const Resource = ({
  title,
  url,
  description,
  created_at,
  category,
  action,
}) => (
  <article className={styles.container}>
    <section className={styles.resource}>
      <div className={styles.details}>
        <span className={cx(styles.category, styles.truncate)}>
          {category} / {Urls.host(url)}
        </span>
        <span className={styles.date}>{Dates.format(created_at)}</span>

        {action === ACTION.save ? <SaveButton /> : <RemoveButton />}
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

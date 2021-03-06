import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames';

import { filterBy } from '~/store/slices/filter/actions';
import { CATEGORY } from '~/config';

import styles from './styles.module.css';

const Component = () => {
  const currentFilter = useSelector((state) => state.filter.current);
  const dispatch = useDispatch();

  const onFilter = (category) => {
    dispatch(
      filterBy({ filter: currentFilter === category ? null : category })
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Discover</div>
      <ul className={styles.menu}>
        <li>
          <button
            className={cx(styles.button, {
              [styles.isActive]: currentFilter === CATEGORY.tutorial,
            })}
            type="button"
            onClick={() => onFilter(CATEGORY.tutorial)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              width={16}
              className={styles.icon}
            >
              <path
                fill="currentColor"
                d="M226.79 342.02C199 342.02 192.02 352 160 352c-31.97 0-38.95-9.98-66.79-9.98C21.12 342.02 0 403 0 434.67V472c0 22.09 17.91 40 40 40h240c22.09 0 40-17.91 40-40v-37.33c0-42.72-30.58-92.65-93.21-92.65zM272 464H48v-29.33c0-14.01 8.15-44.65 45.21-44.65 17.24 0 29.56 9.98 66.79 9.98 37.37 0 49.49-9.98 66.79-9.98 37.02 0 45.21 30.58 45.21 44.65V464zM160 320c53.02 0 96-42.98 96-96s-42.98-96-96-96-96 42.98-96 96 42.98 96 96 96zm0-144c26.47 0 48 21.53 48 48s-21.53 48-48 48-48-21.53-48-48 21.53-48 48-48zM592 0H208c-26.47 0-48 22.25-48 49.59V96c9.69 0 32.27 3.13 48 9.52V48h384v320h-48v-48c0-17.67-14.33-32-32-32H384c-17.67 0-32 14.33-32 32v96h240c26.47 0 48-22.25 48-49.59V49.59C640 22.25 618.47 0 592 0zm-96 368h-96v-32h96v32z"
              />
            </svg>
            Tutorial
          </button>
        </li>
        <li>
          <button
            className={cx(styles.button, {
              [styles.isActive]: currentFilter === CATEGORY.package,
            })}
            type="button"
            onClick={() => onFilter(CATEGORY.package)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              width={16}
              className={styles.icon}
            >
              <path
                fill="currentColor"
                d="M638.3 143.8L586.8 41c-4-8-12.1-9.5-16.7-8.9L320 64 69.8 32.1c-4.6-.6-12.6.9-16.6 8.9L1.7 143.8c-4.6 9.2.3 20.2 10.1 23L64 181.7V393c0 14.7 10 27.5 24.2 31l216.2 54.1c6 1.5 17.4 3.4 31 0L551.8 424c14.2-3.6 24.2-16.4 24.2-31V181.7l52.1-14.9c9.9-2.8 14.7-13.8 10.2-23zM86 82.6l154.8 19.7-41.2 68.3-138-39.4L86 82.6zm26 112.8l97.8 27.9c8 2.3 15.2-1.8 18.5-7.3L296 103.8v322.7l-184-46V195.4zm416 185.1l-184 46V103.8l67.7 112.3c3.3 5.5 10.6 9.6 18.5 7.3l97.8-27.9v185zm-87.7-209.9l-41.2-68.3L554 82.6l24.3 48.6-138 39.4z"
              />
            </svg>
            Packages
          </button>
        </li>
        <li>
          <button
            className={cx(styles.button, {
              [styles.isActive]: currentFilter === CATEGORY.example,
            })}
            type="button"
            onClick={() => onFilter(CATEGORY.example)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              width={16}
              className={styles.icon}
            >
              <path
                fill="currentColor"
                d="M441.37 192c8.49 0 16.62-4.21 22.63-11.72l43.31-54.14c6.25-7.81 6.25-20.47 0-28.29L464 43.71C458 36.21 449.86 32 441.37 32H280V16c0-8.84-7.16-16-16-16h-16c-8.84 0-16 7.16-16 16v16H56c-13.25 0-24 13.43-24 30v100c0 16.57 10.75 30 24 30h176v32H70.63C62.14 224 54 228.21 48 235.71L4.69 289.86c-6.25 7.81-6.25 20.47 0 28.29L48 372.28c6 7.5 14.14 11.72 22.63 11.72H232v112c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16V384h176c13.25 0 24-13.43 24-30V254c0-16.57-10.75-30-24-30H280v-32h161.37zM432 336H80.44l-25.6-32 25.6-32H432v64zM80 80h351.56l25.6 32-25.6 32H80V80z"
              />
            </svg>
            Examples
          </button>
        </li>
        <li>
          <button
            className={cx(styles.button, {
              [styles.isActive]: currentFilter === CATEGORY.other,
            })}
            type="button"
            onClick={() => onFilter(CATEGORY.other)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              width={16}
              className={styles.icon}
            >
              <path
                fill="currentColor"
                d="M112 48h288v48h48V48c0-26.51-21.49-48-48-48H112C85.49 0 64 21.49 64 48v144h48V48zm224 176H48c-26.51 0-48 21.49-48 48v192c0 26.51 21.49 48 48 48h288c26.51 0 48-21.49 48-48V272c0-26.51-21.49-48-48-48zm0 240H48V343.96c14.49 11.01 80 58.12 80 58.12 14.44 11.2 38.62 29.92 64 29.92s49.56-18.72 64-29.92c0 0 65.5-47.1 80-58.12V464zm0-178.61c-2.37 1.85-111.81 81.94-117.09 85.55-8.5 5.83-19.1 13.06-26.91 13.06-9.41 0-22.69-10.55-31.5-17.53-3.41-2.72-110.13-82.43-112.5-84.28V272h288v13.39zM528 128H240c-26.51 0-48 21.49-48 48v16h48v-16h288v192H416v48h112c26.51 0 48-21.49 48-48V176c0-26.51-21.49-48-48-48zm-96 80v64h64v-64h-64z"
              />
            </svg>
            Other
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Component;

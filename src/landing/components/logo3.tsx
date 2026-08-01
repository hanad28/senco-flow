import type { Logo3Styles } from "../_styles";
export type Logo3Data = {
  ariahidden: string;
  ariaposinset?: string;
  ariasetsize?: string;
  kind?: string;
};
/** A logo. */
export default function Logo3({ d, styles }: { d: Logo3Data; styles: Logo3Styles }) {
  return (
    <li className={styles.className} aria-hidden={d.ariahidden} aria-posinset={d.ariaposinset} aria-setsize={d.ariasetsize}>
      <div className={styles.className2}>
        <img className={styles.className3} data-component={d.kind} alt="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />
      </div>
    </li>
  );
}

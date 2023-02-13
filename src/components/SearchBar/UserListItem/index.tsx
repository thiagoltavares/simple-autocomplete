import { HTMLAttributes } from "react";
import styles from "./userListItem.module.css";

interface UserListItemProps extends HTMLAttributes<HTMLLIElement> {
  login: string;
  searchTerm: string;
}

export function UserListItem({
  login,
  searchTerm,
  ...rest
}: UserListItemProps) {
  const htmlString = login
    .toLowerCase()
    .replaceAll(searchTerm, `<mark>${searchTerm}</mark>`);

  return (
    <li
      className={styles.container}
      role="listitem"
      tabIndex={0}
      dangerouslySetInnerHTML={{ __html: htmlString }}
      {...rest}
    />
  );
}

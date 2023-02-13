import { HTMLAttributes } from "react";
import styles from "./usersList.module.css";
interface UsersListProps extends HTMLAttributes<HTMLUListElement> {
  children: JSX.Element[];
}
export default function UsersList({
  children,
  ...rest
}: UsersListProps): JSX.Element {
  return (
    <ul role="list" className={styles.container} {...rest}>
      {children}
    </ul>
  );
}

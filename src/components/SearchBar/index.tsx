import {
  ChangeEvent,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { fetcher } from "../../api/fetcher";
import { useDebounce } from "../../hooks/useDebouce";
import { UserList } from "../../model";
import UsersList from "./UsersList";
import { UserListItem } from "./UserListItem";
import styles from "./searchBar.module.css";
import { EmptyList } from "./EmptyList";

export function SearchBar() {
  const [userList, setUserList] = useState<UserList | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const mainElementRef = useRef<HTMLDivElement>(null);

  const deboucedSearch = useDebounce((value) => {
    loadUserList(value);
  }, 1000);

  async function loadUserList(userName: string) {
    try {
      setIsLoading(true);

      const result = await fetcher<UserList>(userName);

      if (result?.data) {
        setUserList(result.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleChange() {
    const { current } = inputRef;
    const hasValueInRef = !!current?.value;

    deboucedSearch(current?.value);

    if (!hasValueInRef) {
      resetSearch();
    }
  }

  function handleClick(repoName?: string) {
    if (!!inputRef.current && repoName) {
      inputRef.current.value = repoName;
      setUserList(null);
      inputRef.current.focus();
    }
  }

  function handleItemKeyDown(
    e: KeyboardEvent<HTMLLIElement>,
    userLogin: string
  ) {
    if (e.key === "Enter" && !!inputRef.current) {
      inputRef.current.value = userLogin;
      resetSearch();
    }

    if (e.key == "Escape" && !!inputRef.current) {
      resetSearch();
    }
  }

  function resetSearch() {
    setUserList(null);
    inputRef.current?.focus();
  }

  useEffect(() => {
    function inputRefListener(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape" && inputRef.current) {
        resetSearch();
        inputRef.current.value = "";
      }
    }

    const documentListener = (e: MouseEvent) => {
      if (!mainElementRef.current?.contains(e.target as Node)) {
        resetSearch();
      }
    };

    inputRef.current?.addEventListener("keydown", inputRefListener);
    document.addEventListener("click", documentListener);

    return () => {
      inputRef.current?.removeEventListener("keydown", inputRefListener);
      document.removeEventListener("click", documentListener);
    };
  }, []);

  return (
    <main className={styles.mainContainer} ref={mainElementRef}>
      <header className={styles.header}>
        <div className={styles.inputContainer}>
          <input
            className={styles.inputSearch}
            aria-label="search"
            placeholder="Seach for github user"
            type="text"
            ref={inputRef}
            onChange={handleChange}
          />
          {isLoading && <span className={styles.loader}></span>}
        </div>
      </header>
      {userList && (
        <section>
          {userList && userList.total_count > 0 ? (
            <UsersList>
              {userList.items
                .filter((item) =>
                  item.login.toLowerCase().includes(inputRef.current!.value)
                )
                .map(({ login, id }, idx) => (
                  <UserListItem
                    key={id}
                    login={login}
                    onClick={() => {
                      handleClick(login);
                    }}
                    onKeyDown={(e) => handleItemKeyDown(e, login)}
                    tabIndex={0}
                    searchTerm={inputRef?.current?.value!}
                  />
                ))}
            </UsersList>
          ) : (
            <EmptyList />
          )}
        </section>
      )}
    </main>
  );
}

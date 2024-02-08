import { useEffect } from "react";
import type { Dispatch } from "@reduxjs/toolkit";
import { Outlet } from "react-router-dom";
import { getUserSelector } from "./store/selectors";
import { useAppDispatch, useAppSelector } from "./hooks/redux-hook";
import type { StoreActions } from "./store/store.types";
import { fetchFirestoreAction } from "./store/actions";
import styles from "./App.module.css";
import CardList from "./components/card-list";

const App = () => {
  const dispatch = useAppDispatch<Dispatch<StoreActions>>();
  const user = useAppSelector(getUserSelector);

  useEffect(() => {
    if (user) dispatch(fetchFirestoreAction({cardsId: user.cardsId}));
  }, [dispatch]);

  return (
    <>
      <header className={styles.header}></header>
      <main className={styles.main}>
        <aside className={styles.aside}>
          <CardList />
        </aside>
        <Outlet />
      </main>
      <footer className={styles.footer}></footer>
    </>
  );
};

export default App;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { Outlet } from "react-router-dom";
import { StoreActions } from "./store/store.types";
import { fetchFirestoreAction } from "./store/actions";
import { getUserSelector } from "./store/selectors";
import styles from "./App.module.css";
import CardList from "./components/card-list";

const App = () => {
  const dispatch = useDispatch<Dispatch<StoreActions>>();
  const user = useSelector(getUserSelector);

  useEffect(() => {
    if (user) dispatch(fetchFirestoreAction({cardsId: user.cardsId}));
  }, []);

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

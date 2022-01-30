import Head from "next/head";
import React, { useEffect, useState } from "react";
import DarkModeSwitch from "../components/DarkModeSwitch";
import styles from "../styles/layout.module.css";

export default function Layout({ children }) {
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState("fadeOut");
  useEffect(() => {
    setTransitionStage("fadeIn");
  }, []);
  useEffect(() => {
    if (children !== displayChildren) setTransitionStage("fadeOut");
  }, [children, setDisplayChildren, displayChildren]);
  return (
    <div
      onTransitionEnd={() => {
        if (transitionStage === "fadeOut") {
          console.log("fading out");
          setDisplayChildren(children);
          setTransitionStage("fadeIn");
        }
      }}
      className={`${styles.content} ${styles[transitionStage]}`}
    >
      <Head>
        <title>Bands In Town</title>
        <meta name="description" content="Bands in Town App" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;700&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <DarkModeSwitch />
      <div className="custom-scroll">{displayChildren}</div>
    </div>
  );
}

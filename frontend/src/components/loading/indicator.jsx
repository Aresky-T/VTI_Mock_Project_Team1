import React, { useEffect, useState } from "react";

const LoadingIndicator = ({ active, text }) => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((dots) => {
        if (dots === "...") {
          return ".";
        }

        return dots.concat(".");
      });
    }, [500]);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`lds-indicator ${active ? "active" : ""}`}>
      <div className="lds-indicator-text">
        {`${text ? text : "Loading"}`}
        <span className="dots">{dots}</span>
      </div>
    </div>
  );
};

export default function useLoadingIndicator(text, { duration, defaultActive }) {
  const [active, setActive] = useState(defaultActive ?? false);
  const [customTimeout, setCustomTimeout] = useState(0);

  const actions = {
    onActive: (duration) => {
      duration && setCustomTimeout(duration);
      setActive(true);
    },
    onClose: () => setActive(false),
  };

  const WrappedLoadingIndicator = () => (
    <LoadingIndicator active={active} text={text} />
  );

  useEffect(() => {
    if (customTimeout) {
      const timer = setTimeout(() => {
        setActive(false);
      }, customTimeout);

      return () => clearTimeout(timer);
    }
  }, [customTimeout]);

  useEffect(() => {
    if (duration) {
      setCustomTimeout(duration);
      const timeOut = setTimeout(() => {
        setActive(false);
      }, duration);

      return () => clearTimeout(timeOut);
    }
  }, [duration]);

  return {
    active,
    ...actions,
    LoadingIndicator: WrappedLoadingIndicator,
  };
}

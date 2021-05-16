import React, { memo, useState, useEffect } from "react";

import "./index.scss";

export default memo((props) => {
  let { callback, hasErr } = props;
  const [nodes, setNodes] = useState([]);
  const [code, setCode] = useState("");

  useEffect(() => {
    const ipts = document.querySelectorAll(".code-ipt");
    setNodes(ipts);

  }, [])

  const onNext = (e, idx) => {
    let keyCode = e.keyCode;
    if (keyCode == 8 && !e.target.value) {
      if (idx > 1) {
        nodes[idx - 2].focus();
        return null;
      }
    }
    if (keyCode < 48 || keyCode > 57) return null;
    if (idx === 4) {
      nodes[3].blur();
      let _code = code + e.target.value;
      callback && callback(_code);
      return null;
    }
    nodes[idx].focus();
    setCode((code) => `${code}${e.target.value}`);
  };

  return (
    <div className="code-container">
      <input
        type="number"
        className={`code-ipt ${hasErr ? "has-err" : ""}`}
        maxLength={1}
        onKeyUp={(e) => onNext(e, 1)}
      />
      <input
        type="number"
        className={`code-ipt ${hasErr ? "has-err" : ""}`}
        maxLength={1}
        onKeyUp={(e) => onNext(e, 2)}
      />
      <input
        type="number"
        className={`code-ipt ${hasErr ? "has-err" : ""}`}
        maxLength={1}
        onKeyUp={(e) => onNext(e, 3)}
      />
      <input
        type="number"
        className={`code-ipt ${hasErr ? "has-err" : ""}`}
        maxLength={1}
        onKeyUp={(e) => onNext(e, 4)}
      />
    </div>
  );
});

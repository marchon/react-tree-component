import "./figma-tree/style.css";
import "./styles.css";
import Tree from "./figma-tree/index.es-0.0.10";
import { useEffect, useState } from "react";
const api = "https://mock.apifox.cn/m1/3170270-0-default/data";
export default function App() {
  const [data, setData] = useState([]);

  const config = {
    theme: "default",
    draggable: true,
    checkable: true,
    // icon: <div>this is icon area</div>,
    // indentSize: 30,
    foldIconDisplay: "always",
    fieldNames: {
      name: "name",
      key: "id",
      children: "children",
      slot: "slot"
    }
    // onDragStart: ({ event, node }) => {
    //   console.log(event, node)
    // },
    // onDragEnd: ({ event, node }) => {
    //   console.log(event, node)
    // },
    // onDragOver: ({ event, node }) => {
    //   console.log(event, node);
    // },
    // onDragLeave: ({ event, node }) => {
    //   console.log(event, node);
    // },
    // onDragEnter: ({ event, node }) => {
    //   console.log(event, node);
    // },
    // onDrop: ({ event, node, dragNodes, dragNodesKeys }) => {
    //   console.log("drops----");
    //   console.log(event, node, dragNodes, dragNodesKeys);
    // }
    // selectable: false
    // defaultSelectMulti: false,
    // expandParent: true,
    // expandAll: true,
    // reverse: true,
    // contextMenu: true,
    // parentBgColor: 'red',
    // parentColor: '#fff',
    // childrenBgColor: 'blue',
    // childrenColor: '#fff',
  };

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      const res = await fetch(api);
      if (ignore) return;
      ignore = true;
      const { data } = await res.json();

      // extend data whatever you need
      // const extendedList = extendProperty(data, {
      //   slot: true,
      // })
      setData(data);
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, []);
  return (
    <div className="App">
      <div className="repo">
        <a
          className="link"
          rel="noreferrer"
          href="https://github.com/noxxxxxxxx/react-tree"
          target="_blank"
        >
          See Repositories
        </a>
      </div>
      <Tree {...config} data={data} />
    </div>
  );
}

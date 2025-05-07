import { useMemo } from "react";
import { useShapes } from "../ShapeContext";
import { getPanelConfig } from "./utils/getPanelConfig";

const Panels = () => {
  const shapes = useShapes();

  const panelConfigs = useMemo(() => {
    return getPanelConfig(shapes);
  }, [shapes]);

  return (
    <div>
      {panelConfigs.style &&
        Object.keys(panelConfigs.style).map((key) => {
          return <div key={key}>{panelConfigs.style![key]}</div>;
        })}

      {panelConfigs.common &&
        Object.keys(panelConfigs.common).map((key) => {
          return <div key={key}>{panelConfigs.common![key]}</div>;
        })}
    </div>
  );
};

export { Panels };

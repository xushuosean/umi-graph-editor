import { useProjectService } from "@/hooks/useProjectService";
import { useBlockShapes } from "@/pages/index/ShapeContext";
import { Button } from "antd";
import { useMemo } from "react";

const Visible = () => {
  const shapes = useBlockShapes();

  const shape = useMemo(() => {
    return shapes?.[0];
  }, [shapes]);

  const projectService = useProjectService();

  const handleVisible = () => {
    if (!shape) return;

    projectService.updateBlocks([
      {
        ...shape,
        styles: {
          ...shape.styles!,
          visible: !shape.styles?.visible,
        },
      },
    ]);
  };

  return (
    <div>
      <Button onClick={handleVisible}>toggle visible</Button>
    </div>
  );
};

export default Visible;

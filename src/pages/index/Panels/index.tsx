import { useBlockShapes, useShapes } from "../ShapeContext";

const Panels = () => {
  const shapes = useShapes();

  console.log(shapes)

  const blockShape = useBlockShapes();

  return <div>
    {
      shapes.map(shape => shape.id)
    }

    blockShapes: 
    <div>
      {
        blockShape.map(shape => {
          return <div key={shape.id}>
            <div>{shape.styles?.x}</div>
            <div>{shape.styles?.y}</div>
            <div>{shape.styles?.width}</div>
            <div>{shape.styles?.height}</div>
          </div>
        })
      }
    </div>
  </div>
}

export {
  Panels
};


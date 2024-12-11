function Legend({ classColors }) {

  const legendItems = Object.entries(classColors).map(([key, color]) => {
    <div className="legend-item" key={key}>
      <span
        className="legend-color-box"
        style={{ backgroundColor: color }}
      ></span>
      <span className="legend-label">{key}</span>
    </div>
  });
  return (
    <div className="legend absolute bg-[white] border rounded text-sm shadow-[0px_4px_6px_rgba(0,0,0,0.1)] z-[999] p-2.5 border-solid border-[black] left-2.5 bottom-2.5">
      <div className="legend-title font-[bold] mb-[5px]">Legend</div>
      {Object.entries(classColors).map(([key, color]) => (
        <div className="legend-item flex items-center mb-[5px]" key={key}>
          <span
            className="legend-color-box w-[15px] h-[15px] inline-block border mr-2.5 border-solid border-[black]"
            style={{ backgroundColor: color }}
          ></span>
          <span className="legend-label inline-block">{key}</span>
        </div>
      ))}

    </div>
  )
}
export default Legend;
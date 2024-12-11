function ToolTip({ style, content, classColors }) {
    const key = content.class;
    return (
      <div
        className="info absolute inline-block h-auto w-auto z-[100] bg-[#000] text-white text-center rounded p-[5px]"
        style={style}
      >
        <div className="flex items-center mb-[5px]" key={key}>
          <span
            className="w-[15px] h-[15px] inline-block border mr-2.5 border-solid border-[black]"
            style={{ backgroundColor: classColors[key] }}
          ></span>
          {content.scientificName}</div>
        
      </div>
    );
  }
  
  export default ToolTip;
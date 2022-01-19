function DemoStatus() {
  return (
    <div className="demo-bar">
      DEMO MODE{" "}
      <button
        onClick={() => {
          window.location.href = "/";
        }}
      >
        exit
      </button>
    </div>
  );
}

export default DemoStatus;

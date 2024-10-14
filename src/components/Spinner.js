function Spinner() {
    return (
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="border-t-4 border-logo-primary border-solid w-16 h-16 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  export default Spinner;
  
import "./pageTitle.css";
const PageTitle = ({ title }) => {
  return (
    <div>
      <div className="bg-img"></div>
      <div className="text-center custom-heading">
        
        <h1>{title}</h1>
    
      </div>
    </div>
  );
};

export default PageTitle;

const InfoBox = props => (
  <div className="p-4 my-8 rounded-2xl shadow-lg bg-gradient-to-br from-yellow-100 to-yellow-200">
    {props.children}
  </div>
);

export default InfoBox;

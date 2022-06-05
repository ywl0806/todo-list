const Footer = () => {
  return (
    <div className="container mt-5 mb-5">
      <hr />
      <div className="row text-center">
        <div className="col">
          <span id="footer__text">
            ToDo List {new Date().getFullYear()} &copy;
          </span>
        </div>
      </div>
    </div>
  );
};
export default Footer;
